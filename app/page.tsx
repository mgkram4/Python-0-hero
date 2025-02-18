"use client"

import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiArrowRight,
  FiAward,
  FiBook,
  FiBriefcase,
  FiClock,
  FiCode,
  FiCpu,
  FiDatabase,
  FiSettings,
  FiStar,
  FiTerminal,
  FiUsers
} from 'react-icons/fi';


// Path icon mapping
const pathIcons = {
  fundamentals: <FiCode className="w-6 h-6 text-blue-500" />,
  web_development: <FiTerminal className="w-6 h-6 text-blue-500" />,
  machine_learning: <FiCpu className="w-6 h-6 text-blue-500" />,
  data_science: <FiDatabase className="w-6 h-6 text-blue-500" />,
  systems: <FiSettings className="w-6 h-6 text-blue-500" />,
  architecture: <FiBriefcase className="w-6 h-6 text-blue-500" />
};

// Path display names mapping
const pathNames = {
  fundamentals: "Python Fundamentals",
  web_development: "Full Stack Development",
  machine_learning: "Machine Learning & AI",
  data_science: "Data Science & Analysis",
  systems: "System Programming",
  architecture: "Software Architecture"
};

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
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [hoverPath, setHoverPath] = useState<string | null>(null);

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

  // Calculate total students and courses
  const totalCourses = Object.values(courses).flat().length;
  const estimatedStudents = 125000;
  const graduationRate = 92;

  // Get displayed courses
  const getDisplayedCourses = () => {
    if (selectedPath) {
      return { [selectedPath]: courses[selectedPath] };
    }
    return courses;
  };

  const getLevelBadgeColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-all group"
    >
      <div className="h-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{course.title}</h3>
          <span className={`${getLevelBadgeColor(course.level)} px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
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
          <p className="text-sm font-medium text-gray-700 flex items-center">
            <FiBook className="w-4 h-4 mr-2 text-blue-500" />
            Course includes:
          </p>
          <ul className="space-y-2">
            {course.includes.map((item, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 flex items-center">
            <FiBriefcase className="w-4 h-4 mr-2 text-blue-500" />
            Career Paths:
          </p>
          <p className="text-sm text-gray-600 mt-1">{course.careers}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-colors"
        >
          Enroll Now <FiArrowRight className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );

  const PathCard = ({ pathKey }: { pathKey: string }) => {
    const isHovered = hoverPath === pathKey;
    const coursesInPath = courses[pathKey];
    
    return (
      <motion.div
        whileHover={{ y: -5 }}
        onHoverStart={() => setHoverPath(pathKey)}
        onHoverEnd={() => setHoverPath(null)}
        onClick={() => setSelectedPath(selectedPath === pathKey ? null : pathKey)}
        className={`bg-white rounded-xl shadow-md p-6 cursor-pointer border-2 transition-all
          ${selectedPath === pathKey ? 'border-blue-500 shadow-blue-100' : 'border-transparent hover:border-blue-200'}`}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${isHovered || selectedPath === pathKey ? 'bg-blue-100' : 'bg-gray-100'} transition-colors`}>
            {pathIcons[pathKey as keyof typeof pathIcons]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{pathNames[pathKey as keyof typeof pathNames]}</h3>
            <p className="text-gray-600 text-sm mb-3">{coursesInPath.length} courses • {coursesInPath.map(c => c.level).filter((v, i, a) => a.indexOf(v) === i).join(', ')}</p>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">View Courses</span>
              <FiArrowRight className="ml-1 w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Statistics component
  const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
      <div className="p-3 rounded-full bg-blue-100 mb-4">
        {icon}
      </div>
      <span className="text-3xl font-bold text-gray-800 mb-1">{value}</span>
      <span className="text-gray-500 text-center">{label}</span>
    </div>
  );

  // Testimonial component
  const Testimonial = ({ quote, name, role, image }: { quote: string, name: string, role: string, image: string }) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
      <div className="flex mt-4">
        {[1, 2, 3, 4, 5].map(i => (
          <FiStar key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
        ))}
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
        className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-32 overflow-hidden"
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-8 md:mb-0">
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
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-xl"
            >
              From Data Science to Web Development: Build Your Python Career
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Start Learning Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all text-lg"
              >
                Explore Courses
              </motion.button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:w-2/5 relative"
          >
            <div className="relative w-full h-80 md:h-96">
              <svg className="absolute w-full h-full text-white opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M47.7,-57.2C59,-47.3,64,-29.7,68.3,-11.1C72.7,7.5,76.5,27.2,68.5,39.6C60.4,52.1,40.4,57.5,21.1,63.7C1.7,69.9,-17,77,-34.9,72.8C-52.8,68.6,-70,53.1,-77.8,33.5C-85.6,13.9,-84,-10,-73.7,-27.7C-63.4,-45.4,-44.4,-57,-26.3,-65.2C-8.1,-73.3,9.1,-78,25.3,-73.5C41.6,-69,53,-59.3,47.7,-57.2Z" transform="translate(100 100)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiCode className="w-32 h-32 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Banner */}
      <div className="bg-white py-8 shadow-md relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatItem 
              icon={<FiUsers className="w-6 h-6 text-blue-600" />} 
              value={`${(estimatedStudents / 1000).toFixed(0)}k+`} 
              label="Students Enrolled" 
            />
            <StatItem 
              icon={<FiBook className="w-6 h-6 text-blue-600" />} 
              value={`${totalCourses}+`} 
              label="Specialized Courses" 
            />
            <StatItem 
              icon={<FiAward className="w-6 h-6 text-blue-600" />} 
              value={`${graduationRate}%`} 
              label="Completion Rate" 
            />
          </div>
        </div>
      </div>

      {/* Learning Paths Section */}
      <motion.div 
        id="paths"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Choose Your Learning Path</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our specialized learning paths are designed to take you from beginner to professional in your chosen Python specialization
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(courses).map(pathKey => (
            <PathCard key={pathKey} pathKey={pathKey} />
          ))}
        </div>
      </motion.div>

      {/* Courses Section */}
      <motion.div 
        id="courses"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {selectedPath 
                ? `${pathNames[selectedPath as keyof typeof pathNames]} Courses` 
                : 'All Python Courses'}
            </h2>
            <p className="text-gray-600">
              {selectedPath 
                ? `Master ${pathNames[selectedPath as keyof typeof pathNames].toLowerCase()} with our expert-led curriculum`
                : 'Comprehensive courses for all skill levels and specializations'}
            </p>
          </div>
          {selectedPath && (
            <button 
              onClick={() => setSelectedPath(null)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All Courses
            </button>
          )}
        </div>
        
        {Object.entries(getDisplayedCourses()).map(([path, pathCourses]) => (
          <div key={path} className="mb-16">
            {!selectedPath && (
              <h3 className="text-2xl font-bold capitalize mb-8 flex items-center">
                {pathIcons[path as keyof typeof pathIcons]}
                <span className="ml-3">{pathNames[path as keyof typeof pathNames]}</span>
              </h3>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pathCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Skills & Technologies Section */}
      <motion.div 
        id="skills"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Python Skills Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Develop in-demand skills across the entire Python ecosystem with our comprehensive curriculum
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Core Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Matplotlib'].map(tech => (
                    <div key={tech} className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span>
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Skill Progression</h3>
                <div className="space-y-6">
                  {[
                    { level: 'Beginner', skills: ['Syntax', 'Data Types', 'Control Flow', 'Functions', 'Error Handling'] },
                    { level: 'Intermediate', skills: ['OOP', 'Modules', 'File I/O', 'Regular Expressions', 'Testing'] },
                    { level: 'Advanced', skills: ['Concurrency', 'Design Patterns', 'Performance', 'Package Development', 'Security'] }
                  ].map(({ level, skills }) => (
                    <div key={level} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className={`${getLevelBadgeColor(level)} inline-block px-3 py-1 rounded-full text-sm font-medium mb-3`}>
                        {level}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                          <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Industry Applications</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Data Science & Analytics',
                    description: 'Analyze complex datasets, build predictive models, and extract actionable insights',
                    tools: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn']
                  },
                  {
                    title: 'Web Development',
                    description: 'Create robust web applications with Python backends and RESTful APIs',
                    tools: ['Django', 'Flask', 'FastAPI', 'SQLAlchemy']
                  },
                  {
                    title: 'Machine Learning & AI',
                    description: 'Build intelligent systems for prediction, classification, and generation',
                    tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras']
                  },
                  {
                    title: 'Automation & DevOps',
                    description: 'Streamline operations with scripts, CI/CD pipelines, and infrastructure automation',
                    tools: ['Ansible', 'Pytest', 'Docker', 'Jenkins']
                  }
                ].map(industry => (
                  <div key={industry.title} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold text-lg mb-2">{industry.title}</h4>
                    <p className="text-gray-600 mb-3 text-sm">{industry.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {industry.tools.map(tool => (
                        <span key={tool} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Career Pathways Section */}
      <motion.div 
        id="careers"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Career Pathways</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our courses are designed to prepare you for in-demand roles across the tech industry
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Data Scientist',
              description: 'Analyze complex data sets to extract insights and build predictive models',
              salary: '$100,000 - $150,000',
              skills: ['Statistics', 'Machine Learning', 'Data Visualization', 'SQL', 'Pandas'],
              courses: ['Data Science Foundations', 'Advanced Analytics', 'ML Foundations']
            },
            {
              title: 'Backend Developer',
              description: 'Build server-side applications, RESTful APIs, and database architectures',
              salary: '$90,000 - $140,000',
              skills: ['Django', 'Flask', 'Databases', 'API Design', 'Testing'],
              courses: ['Web Development Foundations', 'Advanced Django', 'Software Architecture']
            },
            {
              title: 'ML Engineer',
              description: 'Develop and deploy machine learning models for production environments',
              salary: '$110,000 - $170,000',
              skills: ['Deep Learning', 'TensorFlow/PyTorch', 'MLOps', 'Data Processing', 'Cloud Deployment'],
              courses: ['ML Foundations', 'Deep Learning', 'System Programming']
            }
          ].map(career => (
            <motion.div
              key={career.title}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{career.title}</h3>
                <p className="text-gray-600 mb-4">{career.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Average Salary Range:</p>
                  <p className="text-xl font-bold text-blue-600">{career.salary}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map(skill => (
                      <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Recommended Courses:</p>
                  <ul className="space-y-2">
                    {career.courses.map(course => (
                      <li key={course} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                        <FiArrowRight className="w-4 h-4 mr-2" />
                        <a href="#" className="hover:underline">{course}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Student Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our courses have helped professionals transform their careers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              quote="The Python Foundations course completely transformed my career. Within 6 months of completing the Data Science track, I landed a job as a junior data analyst at a Fortune 500 company."
              name="Sarah Johnson"
              role="Data Analyst at TechCorp"
              image="/api/placeholder/80/80"
            />
            <Testimonial
              quote="The courses were incredibly practical and focused on real-world applications. The Machine Learning pathway gave me the skills I needed to transition from a traditional software role to ML engineering."
              name="Michael Chen"
              role="Machine Learning Engineer"
              image="/api/placeholder/80/80"
            />
            <Testimonial
              quote="As someone with no prior programming experience, the step-by-step approach made learning Python accessible. The full stack course helped me build my first web application and launch my freelance career."
              name="Priya Patel"
              role="Freelance Developer"
              image="/api/placeholder/80/80"
            />
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{ 
              backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Python Journey?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-6 md:pr-12">
                Join thousands of students mastering Python and building successful careers in tech. Start with our free courses today.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  Start Learning Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all text-lg"
                >
                  View All Courses
                </motion.button>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subscribe to Updates</h3>
                <p className="text-gray-600 mb-4 text-sm">Get notified about new courses, workshops, and special offers.</p>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FiCode className="text-blue-400 w-6 h-6 mr-2" />
                <span className="font-bold text-xl">PyCoderPro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Comprehensive Python education for professionals at all skill levels.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Learning Paths</h4>
              <ul className="space-y-2">
                {Object.entries(pathNames).map(([key, name]) => (
                  <li key={key}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Career Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} PyCoderPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PythonPath;