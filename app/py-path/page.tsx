'use client'

import NavBar from '@/components/NavBar';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { FiAward, FiBarChart2, FiBook, FiClock, FiCode, FiCpu, FiDatabase, FiPlayCircle, FiTerminal } from 'react-icons/fi';


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

const LearningPath = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const courses: Record<string, Course[]> = {
    fundamentals: [
      {
        id: 'python-fundamentals',
        title: 'Python Fundamentals',
        path: 'fundamentals',
        price: 0,
        stripePriceId: '',
        description: 'Master the basics of Python programming',
        duration: '4 weeks',
        level: 'Beginner',
        includes: [
          'Basic syntax and data types',
          'Control flow and functions',
          'Data structures',
          'Object-oriented programming basics',
          '10 hands-on exercises',
          '5 mini-projects',
          'Final assessment'
        ]
      }
    ],
    fullstack: [
      {
        id: 'fullstack-beginner',
        title: 'Web Development Basics',
        path: 'fullstack',
        price: 0,
        stripePriceId: '',
        description: 'Learn the fundamentals of web development with Python',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'HTML, CSS basics',
          'Flask fundamentals',
          'Basic database concepts',
          'Simple web applications',
          'Development environment setup'
        ]
      },
      {
        id: 'fullstack-intermediate',
        title: 'Full Stack Development',
        path: 'fullstack',
        price: 0,
        stripePriceId: '',
        description: 'Build complete web applications with FastAPI',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Django framework',
          'Database design',
          'API development',
          'Frontend integration',
          'Authentication & Authorization'
        ]
      },
      {
        id: 'fullstack-advanced',
        title: 'Advanced Web Architecture',
        path: 'fullstack',
        price: 0,
        stripePriceId: '',
        description: 'Master advanced web development concepts',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Microservices architecture',
          'Docker & containerization',
          'CI/CD pipelines',
          'Performance optimization',
          'Security best practices'
        ]
      }
    ],
    mlai: [
      {
        id: 'mlai-beginner',
        title: 'Introduction to AI & ML',
        path: 'mlai',
        price: 0,
        stripePriceId: '',
        description: 'Start your journey in AI and Machine Learning',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Basic statistics and probability',
          'NumPy and Pandas',
          'Data preprocessing',
          'Basic ML algorithms',
          'Introduction to Neural Networks'
        ]
      },
      {
        id: 'mlai-intermediate',
        title: 'Applied Machine Learning',
        path: 'mlai',
        price: 0,
        stripePriceId: '',
        description: 'Implement advanced ML algorithms',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Supervised learning',
          'Unsupervised learning',
          'Model evaluation',
          'Feature engineering',
          'ML project pipeline'
        ]
      },
      {
        id: 'mlai-advanced',
        title: 'Deep Learning & AI Systems',
        path: 'mlai',
        price: 0,
        stripePriceId: '',
        description: 'Master deep learning and AI applications',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Deep neural networks',
          'Computer vision',
          'Natural language processing',
          'Reinforcement learning',
          'AI system deployment'
        ]
      }
    ],
    data: [
      {
        id: 'data-beginner',
        title: 'Data Analysis Fundamentals',
        path: 'data',
        price: 0,
        stripePriceId: '',
        description: 'Learn the basics of data analysis',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Data manipulation with Pandas',
          'Data visualization',
          'Basic statistical analysis',
          'Excel automation',
          'Data cleaning techniques'
        ]
      },
      {
        id: 'data-intermediate',
        title: 'Data Engineering',
        path: 'data',
        price: 0,
        stripePriceId: '',
        description: 'Build data pipelines and systems',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Database management',
          'ETL processes',
          'Data warehousing',
          'Big data tools',
          'Data quality & validation'
        ]
      },
      {
        id: 'data-advanced',
        title: 'Advanced Data Science',
        path: 'data',
        price: 0,
        stripePriceId: '',
        description: 'Master advanced data science concepts',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'Advanced analytics',
          'Time series analysis',
          'Big data processing',
          'Data science systems',
          'Production deployment'
        ]
      }
    ],
    automation: [
      {
        id: 'automation-beginner',
        title: 'Basic Automation',
        path: 'automation',
        price: 0,
        stripePriceId: '',
        description: 'Learn to automate basic tasks',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'File operations',
          'Basic scripting',
          'Task scheduling',
          'Email automation',
          'GUI automation basics'
        ]
      },
      {
        id: 'automation-intermediate',
        title: 'System Automation',
        path: 'automation',
        price: 0,
        stripePriceId: '',
        description: 'Automate complex system tasks',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'System administration',
          'Network automation',
          'Web scraping',
          'API integration',
          'Database automation'
        ]
      },
      {
        id: 'automation-advanced',
        title: 'Enterprise Automation',
        path: 'automation',
        price: 0,
        stripePriceId: '',
        description: 'Build enterprise-level automation solutions',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          'RPA development',
          'Workflow orchestration',
          'Cloud automation',
          'Testing automation',
          'CI/CD automation'
        ]
      }
    ],
    gaming: [
      {
        id: 'gaming-beginner',
        title: 'Game Development Basics',
        path: 'gaming',
        price: 0,
        stripePriceId: '',
        description: 'Start creating simple games with Python',
        duration: '6 weeks',
        level: 'Beginner',
        includes: [
          'Pygame basics',
          '2D graphics',
          'Game loops',
          'Basic collision detection',
          'Simple game mechanics'
        ]
      },
      {
        id: 'gaming-intermediate',
        title: 'Advanced Game Development',
        path: 'gaming',
        price: 0,
        stripePriceId: '',
        description: 'Create more complex games',
        duration: '8 weeks',
        level: 'Intermediate',
        includes: [
          'Advanced Pygame',
          'Physics engines',
          'Game AI basics',
          'Sound integration',
          'Multiplayer basics'
        ]
      },
      {
        id: 'gaming-advanced',
        title: 'Professional Game Development',
        path: 'gaming',
        price: 0,
        stripePriceId: '',
        description: 'Master professional game development',
        duration: '10 weeks',
        level: 'Advanced',
        includes: [
          '3D game development',
          'Advanced game AI',
          'Game optimization',
          'Multiplayer systems',
          'Game deployment'
        ]
      }
    ]
  };



  const handlePurchase = async (stripePriceId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePriceId,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pathIcons = {
    fundamentals: <FiCode className="w-6 h-6" />,
    fullstack: <FiTerminal className="w-6 h-6" />,
    mlai: <FiCpu className="w-6 h-6" />,
    data: <FiDatabase className="w-6 h-6" />,
    automation: <FiBarChart2 className="w-6 h-6" />,
    gaming: <FiPlayCircle className="w-6 h-6" />
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePurchase(course.stripePriceId)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Purchase Course
        </motion.button>
      </div>
    </motion.div>
  );

  const BundleCard = ({ bundle }: { bundle: typeof bundles[0] }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-500"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{bundle.title}</h3>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            Save {bundle.savings}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{bundle.description}</p>
        <div className="mb-4 flex items-baseline">
          <span className="text-3xl font-bold">${bundle.price}</span>
          <span className="ml-2 text-gray-500 line-through">${bundle.originalPrice}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePurchase(bundle.stripePriceId)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors"
        >
          Get Bundle
        </motion.button>
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
        className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full opacity-10">
            {/* Add subtle grid pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
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
            Choose your path and build your career in Python
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Learning
          </motion.button>
        </div>
      </motion.div>

      {/* Learning Path Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-20"
      >
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Available Courses
        </h2>
        
        {/* Updated Path Sections with 3 columns */}
        {Object.entries(courses).map(([path, pathCourses]) => (
          <div key={path} className="mb-16">
            <div className="flex items-center mb-8">
              <span className="p-2 bg-blue-100 rounded-lg mr-3">
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

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-gray-100 to-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, blue 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Choose Your Path to Success
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with fundamentals and progress through your chosen specialization
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Begin Your Journey
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LearningPath;