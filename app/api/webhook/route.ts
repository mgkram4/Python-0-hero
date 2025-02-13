import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: unknown) {
    const error = err as Error
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${error.message}` },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, coursePath, courseLevel } = session.metadata!

    const supabase = createRouteHandlerClient({ cookies })

    try {
      const { error } = await supabase
        .from('user_courses')
        .insert({
          user_id: userId,
          course_path: coursePath,
          course_level: courseLevel,
          completed: false
        })

      if (error) throw error

      return NextResponse.json({ received: true })
    } catch (error) {
      console.error('Error inserting course:', error)
      return NextResponse.json(
        { error: 'Error processing payment' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
} 