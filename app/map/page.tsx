'use client'

import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';

interface ConceptNode {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToMaster: string;
  prerequisites?: string[];
  keyTopics: string[];
  resources?: string[];
}

const MindMap = () => {
  const pathColors = {
    fundamentals: '#3B82F6', // blue-500
    frontend: '#F59E0B', // amber-500
    backend: '#10B981', // emerald-500
    mlai: '#8B5CF6', // violet-500
    data: '#EC4899', // pink-500
    cloud: '#6366F1', // indigo-500
    mobile: '#EF4444', // red-500
    testing: '#14B8A6', // teal-500
  }

  const ConceptBox = ({ 
    node, 
    color 
  }: { 
    node: ConceptNode, 
    color: string 
  }) => (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl border-2 bg-white/95 shadow-sm hover:shadow-lg transition-all duration-300 w-72"
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg">{node.title}</h4>
        <span 
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {node.difficulty}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{node.description}</p>
      <div className="space-y-2">
        <div>
          <p className="text-xs font-semibold text-gray-500">Time to Master:</p>
          <p className="text-sm">{node.timeToMaster}</p>
        </div>
        {node.prerequisites && (
          <div>
            <p className="text-xs font-semibold text-gray-500">Prerequisites:</p>
            <div className="flex flex-wrap gap-1">
              {node.prerequisites.map(prereq => (
                <span key={prereq} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-gray-500">Key Topics:</p>
          <div className="flex flex-wrap gap-1">
            {node.keyTopics.map(topic => (
              <span 
                key={topic} 
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${color}10`, color }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const fundamentalsTree: ConceptNode[] = [
    {
      title: "Programming Logic",
      description: "Core concepts of programming and computational thinking",
      difficulty: "Beginner",
      timeToMaster: "4-6 weeks",
      keyTopics: [
        "Variables & Data Types",
        "Control Flow",
        "Functions",
        "Basic Problem Solving",
        "Debugging"
      ],
      resources: [
        "CS50",
        "Programming Logic 101",
        "Code.org"
      ]
    },
    {
      title: "Data Structures",
      description: "Fundamental data structures and their implementations",
      difficulty: "Intermediate",
      timeToMaster: "8-12 weeks",
      prerequisites: ["Programming Logic"],
      keyTopics: [
        "Arrays",
        "Linked Lists",
        "Stacks & Queues",
        "Trees",
        "Hash Tables",
        "Graphs"
      ]
    },
    // Add more nodes following the same pattern...
  ]

  const frontendTree: ConceptNode[] = [
    {
      title: "HTML & CSS Fundamentals",
      description: "Building blocks of web development",
      difficulty: "Beginner",
      timeToMaster: "4-6 weeks",
      keyTopics: [
        "Semantic HTML",
        "CSS Box Model",
        "Flexbox",
        "Grid",
        "Responsive Design",
        "CSS Variables"
      ]
    },
    {
      title: "JavaScript Core",
      description: "Essential JavaScript concepts and DOM manipulation",
      difficulty: "Intermediate",
      timeToMaster: "8-12 weeks",
      prerequisites: ["HTML & CSS Fundamentals"],
      keyTopics: [
        "ES6+ Features",
        "Async Programming",
        "DOM Manipulation",
        "Event Handling",
        "Error Handling",
        "Web APIs"
      ]
    },
    // Add more nodes...
  ]

  const careerPaths = {
    aiml: {
      title: "AI & Machine Learning",
      nodes: [
        {
          title: "Mathematics Foundations",
          description: "Essential mathematical concepts for AI/ML",
          difficulty: "Beginner",
          timeToMaster: "12-16 weeks",
          keyTopics: [
            "Linear Algebra",
            "Calculus",
            "Statistics",
            "Probability",
            "Optimization Theory"
          ],
          resources: [
            "Khan Academy",
            "3Blue1Brown",
            "Mathematics for Machine Learning Book"
          ]
        },
        {
          title: "Python for Data Science",
          description: "Python programming with focus on data manipulation",
          difficulty: "Intermediate",
          timeToMaster: "8-10 weeks",
          prerequisites: ["Programming Logic"],
          keyTopics: [
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Scikit-learn",
            "Jupyter Notebooks"
          ]
        },
        {
          title: "Machine Learning Fundamentals",
          description: "Core ML algorithms and concepts",
          difficulty: "Advanced",
          timeToMaster: "16-20 weeks",
          prerequisites: ["Mathematics Foundations", "Python for Data Science"],
          keyTopics: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Model Evaluation",
            "Feature Engineering",
            "Ensemble Methods"
          ]
        },
        {
          title: "Deep Learning",
          description: "Neural networks and deep learning architectures",
          difficulty: "Advanced",
          timeToMaster: "20-24 weeks",
          prerequisites: ["Machine Learning Fundamentals"],
          keyTopics: [
            "Neural Networks",
            "CNN",
            "RNN & LSTM",
            "Transformers",
            "GANs",
            "Transfer Learning"
          ]
        }
      ]
    },

    fullstack: {
      title: "Full Stack Development",
      nodes: [
        {
          title: "Frontend Fundamentals",
          description: "Core web technologies and UI development",
          difficulty: "Beginner",
          timeToMaster: "12-16 weeks",
          keyTopics: [
            "HTML5 & CSS3",
            "JavaScript ES6+",
            "Responsive Design",
            "Web Accessibility",
            "Version Control (Git)"
          ]
        },
        {
          title: "Frontend Frameworks",
          description: "Modern JavaScript frameworks and tools",
          difficulty: "Intermediate",
          timeToMaster: "16-20 weeks",
          prerequisites: ["Frontend Fundamentals"],
          keyTopics: [
            "React/Next.js",
            "State Management",
            "API Integration",
            "Testing (Jest)",
            "Performance Optimization"
          ]
        },
        {
          title: "Backend Development",
          description: "Server-side programming and databases",
          difficulty: "Intermediate",
          timeToMaster: "16-20 weeks",
          prerequisites: ["Frontend Frameworks"],
          keyTopics: [
            "Node.js/Express",
            "RESTful APIs",
            "SQL Databases",
            "NoSQL Databases",
            "Authentication/Authorization"
          ]
        },
        {
          title: "DevOps & Deployment",
          description: "Deployment, CI/CD, and cloud services",
          difficulty: "Advanced",
          timeToMaster: "12-16 weeks",
          prerequisites: ["Backend Development"],
          keyTopics: [
            "Docker",
            "CI/CD Pipelines",
            "Cloud Services (AWS/GCP)",
            "Monitoring",
            "Security Best Practices"
          ]
        }
      ]
    },

    gamedev: {
      title: "Game Development",
      nodes: [
        {
          title: "Game Programming Basics",
          description: "Fundamental concepts of game development",
          difficulty: "Beginner",
          timeToMaster: "12-16 weeks",
          keyTopics: [
            "C# Fundamentals",
            "Game Loops",
            "2D Graphics",
            "Input Handling",
            "Basic Physics"
          ]
        },
        {
          title: "Unity Development",
          description: "Game development with Unity engine",
          difficulty: "Intermediate",
          timeToMaster: "20-24 weeks",
          prerequisites: ["Game Programming Basics"],
          keyTopics: [
            "Unity Interface",
            "Scene Management",
            "Animation Systems",
            "Physics Engine",
            "Audio Integration"
          ]
        },
        {
          title: "Advanced Game Systems",
          description: "Complex game mechanics and optimization",
          difficulty: "Advanced",
          timeToMaster: "24-28 weeks",
          prerequisites: ["Unity Development"],
          keyTopics: [
            "3D Graphics",
            "Networking",
            "AI Systems",
            "Shader Programming",
            "Performance Optimization"
          ]
        }
      ]
    },

    dataeng: {
      title: "Data Engineering",
      nodes: [
        {
          title: "Data Processing Fundamentals",
          description: "Basic concepts of data processing and ETL",
          difficulty: "Beginner",
          timeToMaster: "8-12 weeks",
          keyTopics: [
            "SQL Fundamentals",
            "Python for Data",
            "ETL Basics",
            "Data Modeling",
            "Data Quality"
          ]
        },
        {
          title: "Big Data Technologies",
          description: "Large-scale data processing frameworks",
          difficulty: "Intermediate",
          timeToMaster: "16-20 weeks",
          prerequisites: ["Data Processing Fundamentals"],
          keyTopics: [
            "Hadoop Ecosystem",
            "Apache Spark",
            "Data Warehousing",
            "Data Lakes",
            "Stream Processing"
          ]
        }
      ]
    },

    automation: {
      title: "DevOps & Automation",
      nodes: [
        {
          title: "Automation Fundamentals",
          description: "Basic concepts of IT automation",
          difficulty: "Beginner",
          timeToMaster: "8-12 weeks",
          keyTopics: [
            "Shell Scripting",
            "Python Automation",
            "Git & Version Control",
            "Basic Networking",
            "Linux Systems"
          ]
        },
        {
          title: "Infrastructure as Code",
          description: "Automated infrastructure management",
          difficulty: "Intermediate",
          timeToMaster: "12-16 weeks",
          prerequisites: ["Automation Fundamentals"],
          keyTopics: [
            "Terraform",
            "Ansible",
            "Docker",
            "Kubernetes",
            "Cloud Platforms"
          ]
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Computer Science Learning Paths
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Master Your Journey: From Fundamentals to Advanced Specializations
          </motion.p>
        </div>
        
        <div className="relative w-full min-h-[3000px] overflow-auto rounded-3xl bg-white/90 backdrop-blur-md p-12 shadow-2xl border border-gray-200/50">
          {/* Tree Structure */}
          <div className="flex flex-col items-center">
            {/* Root Node */}
            <div className="mb-16">
              <ConceptBox 
                node={fundamentalsTree[0]} 
                color={pathColors.fundamentals}
              />
            </div>

            {/* First Level */}
            <div className="flex justify-center gap-32 mb-16">
              <ConceptBox 
                node={frontendTree[0]} 
                color={pathColors.frontend}
              />
              <ConceptBox 
                node={fundamentalsTree[1]} 
                color={pathColors.fundamentals}
              />
            </div>

            {/* Continue building the tree with proper connecting lines... */}
          </div>
        </div>

        {/* Career Paths Section */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Specialized Career Paths
          </h2>
          
          {/* AI/ML Path */}
          <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-8 text-violet-600">
              {careerPaths.aiml.title}
            </h3>
            <div className="flex flex-wrap gap-8">
              {careerPaths.aiml.nodes.map((node) => (
                <ConceptBox 
                  key={node.title}
                  node={node}
                  color={pathColors.mlai}
                />
              ))}
            </div>
          </div>

          {/* Full Stack Path */}
          <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-8 text-amber-600">
              {careerPaths.fullstack.title}
            </h3>
            <div className="flex flex-wrap gap-8">
              {careerPaths.fullstack.nodes.map((node) => (
                <ConceptBox 
                  key={node.title}
                  node={node}
                  color={pathColors.frontend}
                />
              ))}
            </div>
          </div>

          {/* Game Development Path */}
          <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-8 text-emerald-600">
              {careerPaths.gamedev.title}
            </h3>
            <div className="flex flex-wrap gap-8">
              {careerPaths.gamedev.nodes.map((node) => (
                <ConceptBox 
                  key={node.title}
                  node={node}
                  color={pathColors.backend}
                />
              ))}
            </div>
          </div>

          {/* Data Engineering Path */}
          <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-8 text-pink-600">
              {careerPaths.dataeng.title}
            </h3>
            <div className="flex flex-wrap gap-8">
              {careerPaths.dataeng.nodes.map((node) => (
                <ConceptBox 
                  key={node.title}
                  node={node}
                  color={pathColors.data}
                />
              ))}
            </div>
          </div>

          {/* DevOps & Automation Path */}
          <div className="mb-24">
            <h3 className="text-2xl font-semibold mb-8 text-indigo-600">
              {careerPaths.automation.title}
            </h3>
            <div className="flex flex-wrap gap-8">
              {careerPaths.automation.nodes.map((node) => (
                <ConceptBox 
                  key={node.title}
                  node={node}
                  color={pathColors.cloud}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MindMap 