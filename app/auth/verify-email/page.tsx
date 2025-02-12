'use client'

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Check your email</h2>
        <p className="mt-4 text-center text-gray-600">
          We&apos;ve sent you an email with a link to verify your account.
          Please check your inbox and follow the instructions.
        </p>
      </div>
    </div>
  )
} 