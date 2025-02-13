'use client'

import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { FiAward, FiBook, FiCheckCircle, FiClock, FiCloud, FiCode, FiLayout, FiServer, FiSmartphone } from 'react-icons/fi';

interface Course {
  id: string;
  title: string;
  path: string;
  price: number;
  stripePriceId: string;
  description: string;
  duration: string;
  level: string;
  includes: string[];
}

const JavaScriptPath = () => {
  const courses: Record<string, Course[]> = {
    fundamentals: [
      {
        id: 'html-fundamentals',
        title: 'HTML Fundamentals',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Learn modern HTML5 and semantic markup',
        duration: '2 weeks',
        level: 'Beginner',
        includes: [
          'HTML5 elements',
          'Semantic markup',
          'Forms and validation',
          'Accessibility best practices',
          'SEO fundamentals',
          'Responsive design basics',
          'Final project'
        ]
      },
      {
        id: 'css-fundamentals',
        title: 'CSS Fundamentals',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Master modern CSS and responsive design',
        duration: '3 weeks',
        level: 'Beginner',
        includes: [
          'CSS3 features',
          'Flexbox and Grid',
          'Responsive design',
          'CSS animations',
          'CSS variables',
          'Modern layouts',
          'Final project'
        ]
      },
      {
        id: 'js-fundamentals',
        title: 'JavaScript Fundamentals',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Master modern JavaScript from the ground up',
        duration: '4 weeks',
        level: 'Beginner',
        includes: [
          'ES6+ syntax and features',
          'Async programming',
          'DOM manipulation',
          'Error handling',
          'Modern JavaScript tools',
          'Best practices',
          'Final project'
        ]
      }
    ],
    frontend: [
      {
        id: 'frontend-beginner',
        title: 'Frontend Essentials',
        path: 'frontend',
        price: 0,
        stripePriceId: '',
        description: 'Build modern user interfaces with React',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'React fundamentals',
          'Component architecture',
          'State management',
          'Hooks in depth',
          'Routing and navigation'
        ]
      },
      {
        id: 'frontend-intermediate',
        title: 'Advanced React Development',
        path: 'frontend',
        price: 0,
        stripePriceId: '',
        description: 'Master advanced React patterns and practices',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Advanced state management',
          'Performance optimization',
          'Custom hooks',
          'Testing strategies',
          'Advanced patterns'
        ]
      },
      {
        id: 'frontend-advanced',
        title: 'Enterprise Frontend Architecture',
        path: 'frontend',
        price: 0,
        stripePriceId: '',
        description: 'Build scalable frontend applications',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Micro-frontends',
          'Next.js advanced patterns',
          'Tailwind CSS mastery',
          'Design systems with Tailwind',
          'State machines',
          'Advanced TypeScript',
          'Performance monitoring'
        ]
      }
    ],
    backend: [
      {
        id: 'backend-beginner',
        title: 'Node.js Fundamentals',
        path: 'backend',
        price: 0,
        stripePriceId: '',
        description: 'Build server-side applications with Node.js',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Node.js basics',
          'Express framework',
          'RESTful APIs',
          'Database integration',
          'Authentication basics'
        ]
      },
      {
        id: 'backend-intermediate',
        title: 'Advanced Backend Development',
        path: 'backend',
        price: 0,
        stripePriceId: '',
        description: 'Create robust backend services',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Microservices with Node.js',
          'GraphQL APIs',
          'Message queues',
          'Caching strategies',
          'Security practices'
        ]
      },
      {
        id: 'backend-advanced',
        title: 'Enterprise Backend Architecture',
        path: 'backend',
        price: 0,
        stripePriceId: '',
        description: 'Design scalable backend systems',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Distributed systems',
          'Event-driven architecture',
          'Serverless computing',
          'System design',
          'Cloud deployment'
        ]
      }
    ],
    testing: [
      {
        id: 'testing-beginner',
        title: 'Testing Fundamentals',
        path: 'testing',
        price: 0,
        stripePriceId: '',
        description: 'Learn modern testing practices',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Unit testing',
          'Jest framework',
          'React Testing Library',
          'Test driven development',
          'Integration testing'
        ]
      },
      {
        id: 'testing-intermediate',
        title: 'Advanced Testing',
        path: 'testing',
        price: 0,
        stripePriceId: '',
        description: 'Master comprehensive testing strategies',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'E2E testing',
          'Performance testing',
          'Visual regression',
          'API testing',
          'CI/CD integration'
        ]
      }
    ],
    mobile: [
      {
        id: 'mobile-beginner',
        title: 'React Native Basics',
        path: 'mobile',
        price: 0,
        stripePriceId: '',
        description: 'Build mobile apps with React Native',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'React Native fundamentals',
          'Mobile UI development',
          'Native modules',
          'Navigation',
          'Device features'
        ]
      },
      {
        id: 'mobile-advanced',
        title: 'Advanced Mobile Development',
        path: 'mobile',
        price: 0,
        stripePriceId: '',
        description: 'Create professional mobile applications',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Performance optimization',
          'Native modules',
          'Animation systems',
          'State management',
          'App deployment'
        ]
      }
    ],
    devops: [
      {
        id: 'devops-beginner',
        title: 'JavaScript DevOps',
        path: 'devops',
        price: 0,
        stripePriceId: '',
        description: 'Learn modern JavaScript deployment',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'CI/CD pipelines',
          'Docker containerization',
          'Cloud deployment',
          'Monitoring and logging',
          'Infrastructure as code'
        ]
      }
    ]
  };

  const pathIcons = {
    fundamentals: <FiCode className="w-6 h-6" />,
    frontend: <FiLayout className="w-6 h-6" />,
    backend: <FiServer className="w-6 h-6" />,
    testing: <FiCheckCircle className="w-6 h-6" />,
    mobile: <FiSmartphone className="w-6 h-6" />,
    devops: <FiCloud className="w-6 h-6" />
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-yellow-200 transition-colors"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{course.title}</h3>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <FiAward className="w-4 h-4 mr-1" />
            {course.level}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center mb-4 text-gray-500">
          <FiClock className="w-4 h-4 mr-2" />
          <span className="text-sm">{course.duration}</span>
        </div>
        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-500 flex items-center">
            <FiBook className="w-4 h-4 mr-2" />
            Course includes:
          </p>
          <ul className="space-y-2">
            {course.includes.map((item, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-100"
          >
            Master Modern JavaScript
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-yellow-100"
          >
            From React to Node.js: Build Your Full-Stack Career
          </motion.p>
          {/* ... rest of the hero section ... */}
        </div>
      </motion.div>

      {/* Learning Path Section */}
      <motion.div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Available Courses</h2>
        
        {Object.entries(courses).map(([path, pathCourses]) => (
          <div key={path} className="mb-16">
            <div className="flex items-center mb-8">
              <span className="p-2 bg-yellow-100 rounded-lg mr-3">
                {pathIcons[path as keyof typeof pathIcons]}
              </span>
              <h3 className="text-2xl font-bold capitalize">
                {path.replace('_', ' ')} Path
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pathCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default JavaScriptPath; 