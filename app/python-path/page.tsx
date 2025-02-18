"use client"

import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { FiAward, FiBook, FiClock } from 'react-icons/fi';

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
  careers: string;
}
    
const PythonPath = () => {
  const courses: Record<string, Course[]> = {
    fundamentals: [
      {
        id: 'python-basics',
        title: 'Python Foundations',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Master Python programming fundamentals',
        duration: '4 weeks',
        level: 'Beginner',
        includes: [
          'Python syntax and data types',
          'Control structures',
          'Functions and modules',
          'Basic algorithms',
          'Error handling'
        ],
        careers: 'Junior Python Developer, Software Engineer Trainee, QA Engineer'
      },
      {
        id: 'data-structures',
        title: 'Data Structures',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Learn essential data structures in Python',
        duration: '6 weeks',
        level: 'Intermediate',
        includes: [
          'Arrays and linked lists',
          'Stacks and queues',
          'Trees and graphs',
          'Hash tables',
          'Algorithm complexity'
        ],
        careers: 'Data Analyst, Business Intelligence Analyst, Data Scientist'
      },
      {
        id: 'advanced-algorithms',
        title: 'Advanced Algorithms',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Master complex algorithms and optimization',
        duration: '8 weeks',
        level: 'Advanced',
        includes: [
          'Dynamic programming',
          'Graph algorithms',
          'Sorting and searching',
          'Optimization techniques',
          'Problem-solving strategies'
        ],
        careers: 'Machine Learning Engineer, AI Researcher, ML Operations Engineer'
      }
    ],
    systems: [
      {
        id: 'system-programming',
        title: 'System Programming',
        path: 'systems',
        price: 0,
        stripePriceId: '',
        description: 'Learn low-level system programming',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Process management',
          'Memory management',
          'File systems',
          'System calls',
          'IPC mechanisms'
        ],
        careers: 'Systems Engineer, DevOps Engineer, Platform Engineer'
      },
      {
        id: 'concurrent-programming',
        title: 'Concurrent Programming',
        path: 'systems',
        price: 0,
        stripePriceId: '',
        description: 'Master parallel and concurrent programming',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Threading and processes',
          'Synchronization',
          'Async programming',
          'Multiprocessing',
          'Performance optimization'
        ],
        careers: 'Systems Engineer, DevOps Engineer, Platform Engineer'
      },
      {
        id: 'distributed-systems',
        title: 'Distributed Systems',
        path: 'systems',
        price: 0,
        stripePriceId: '',
        description: 'Build scalable distributed systems',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Distributed architectures',
          'Network programming',
          'Fault tolerance',
          'Consensus algorithms',
          'System design'
        ],
        careers: 'Systems Engineer, DevOps Engineer, Platform Engineer'
      }
    ],
    architecture: [
      {
        id: 'clean-code',
        title: 'Clean Code Principles',
        path: 'architecture',
        price: 0,
        stripePriceId: '',
        description: 'Write maintainable and efficient code',
        duration: '4 weeks',
        level: 'Beginner',
        includes: [
          'Code organization',
          'Design patterns',
          'SOLID principles',
          'Code refactoring',
          'Testing strategies'
        ],
        careers: 'Software Architect, Senior Software Engineer, DevOps Engineer'
      },
      {
        id: 'software-architecture',
        title: 'Software Architecture',
        path: 'architecture',
        price: 0,
        stripePriceId: '',
        description: 'Design robust software systems',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Architectural patterns',
          'System design',
          'Scalability',
          'Security principles',
          'Performance optimization'
        ],
        careers: 'Software Architect, Senior Software Engineer, DevOps Engineer'
      },
      {
        id: 'enterprise-architecture',
        title: 'Enterprise Architecture',
        path: 'architecture',
        price: 0,
        stripePriceId: '',
        description: 'Build enterprise-grade applications',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Microservices',
          'Event-driven architecture',
          'Cloud patterns',
          'System integration',
          'DevOps practices'
        ],
        careers: 'Systems Engineer, DevOps Engineer, Platform Engineer'
      }
    ],
    data_science: [
      {
        id: 'data-foundations',
        title: 'Data Science Foundations',
        path: 'data_science',
        price: 0,
        stripePriceId: '',
        description: 'Master data analysis fundamentals',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'NumPy & Pandas',
          'Data cleaning & preprocessing',
          'Statistical analysis',
          'Data visualization',
          'Exploratory data analysis'
        ],
        careers: 'Data Analyst, Business Intelligence Analyst, Data Scientist'
      },
      {
        id: 'advanced-analytics',
        title: 'Advanced Analytics',
        path: 'data_science',
        price: 0,
        stripePriceId: '',
        description: 'Advanced data science techniques',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Feature engineering',
          'Time series analysis',
          'Advanced visualization',
          'Big data processing',
          'Data pipelines'
        ],
        careers: 'Data Scientist, Machine Learning Engineer, AI Researcher'
      },
      {
        id: 'data-engineering',
        title: 'Data Engineering',
        path: 'data_science',
        price: 0,
        stripePriceId: '',
        description: 'Build scalable data infrastructure',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'ETL pipelines',
          'Data warehousing',
          'Distributed computing',
          'Data modeling',
          'Data governance'
        ],
        careers: 'Data Engineer, Data Architect, Big Data Engineer'
      }
    ],
    machine_learning: [
      {
        id: 'ml-foundations',
        title: 'ML Foundations',
        path: 'machine_learning',
        price: 0,
        stripePriceId: '',
        description: 'Core machine learning concepts',
        duration: '8 weeks',
        level: 'Beginner',
        includes: [
          'Supervised learning',
          'Unsupervised learning',
          'Model evaluation',
          'Feature selection',
          'ML pipelines'
        ],
        careers: 'Machine Learning Engineer, AI Researcher, ML Operations Engineer'
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning',
        path: 'machine_learning',
        price: 0,
        stripePriceId: '',
        description: 'Neural networks and deep learning',
        duration: '10 weeks',
        level: 'Intermediate',
        includes: [
          'Neural networks',
          'CNNs & RNNs',
          'Transfer learning',
          'Model optimization',
          'Deep learning frameworks'
        ],
        careers: 'Machine Learning Engineer, AI Researcher, ML Operations Engineer'
      },
      {
        id: 'generative-ai',
        title: 'Generative AI',
        path: 'machine_learning',
        price: 0,
        stripePriceId: '',
        description: 'Build generative AI applications',
        duration: '12 weeks',
        level: 'Advanced',
        includes: [
          'Large language models',
          'Diffusion models',
          'Prompt engineering',
          'Model fine-tuning',
          'AI application deployment'
        ],
        careers: 'AI Researcher, Machine Learning Engineer, AI Operations Engineer'
      }
    ],
    web_development: [
      {
        id: 'web-foundations',
        title: 'Web Development Foundations',
        path: 'web_development',
        price: 0,
        stripePriceId: '',
        description: 'Build web applications with Python',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Flask fundamentals',
          'RESTful APIs',
          'Database integration',
          'Authentication',
          'Basic deployment'
        ],
        careers: 'Backend Developer, API Engineer, Full Stack Python Developer'
      },
      {
        id: 'django-advanced',
        title: 'Advanced Django',
        path: 'web_development',
        price: 0,
        stripePriceId: '',
        description: 'Master Django framework',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Django ORM',
          'Advanced views',
          'Django REST framework',
          'Celery & async tasks',
          'Testing & security'
        ],
        careers: 'Backend Developer, API Engineer, Full Stack Python Developer'
      },
      {
        id: 'fullstack-advanced',
        title: 'Full Stack Development',
        path: 'web_development',
        price: 0,
        stripePriceId: '',
        description: 'Build modern full-stack applications',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'FastAPI development',
          'Frontend integration',
          'Microservices',
          'Real-time applications',
          'Cloud deployment'
        ],
        careers: 'Full Stack Developer, API Engineer, DevOps Engineer'
      }
    ]
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-colors"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{course.title}</h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
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
            {course.includes.map((item: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700">Career Paths:</p>
          <p className="text-sm text-gray-600 mt-1">{course.careers}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
          >
            Master Python Programming
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-blue-100"
          >
            From Data Science to Web Development: Build Your Python Career
          </motion.p>
        </div>
      </motion.div>

      {/* Learning Path Section */}
      <motion.div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Available Courses</h2>
        
        {Object.entries(courses).map(([path, pathCourses]) => (
          <div key={path} className="mb-16">
            <h3 className="text-2xl font-bold capitalize mb-8">
              {path.replace('_', ' ')} Path
            </h3>
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

export default PythonPath; 