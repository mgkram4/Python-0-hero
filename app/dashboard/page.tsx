'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'

interface CourseProgress {
  id: string
  coursePath: string
  courseLevel: string
  completed: boolean
  createdAt: string
}

const pathNames = {
  fundamentals: 'Python Fundamentals',
  webdev: 'Web Development',
  datascience: 'Data Science',
  automation: 'Automation',
  aiml: 'AI & Machine Learning'
}

const levelNames = {
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3'
}

export default function Dashboard() {
  const [courses, setCourses] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('user_courses')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setCourses(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserCourses()
  }, [supabase])

  const handleContinueCourse = (coursePath: string, courseLevel: string) => {
    router.push(`/learn/${coursePath}/${courseLevel}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Learning Dashboard</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {pathNames[course.coursePath as keyof typeof pathNames]}
                    </h3>
                    <p className="text-gray-600">
                      {levelNames[course.courseLevel as keyof typeof levelNames]}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    course.completed 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {course.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContinueCourse(course.coursePath, course.courseLevel)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {course.completed ? 'Review Course' : 'Continue Learning'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {courses.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No courses yet</h3>
            <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
} 