"use client"

import { useState } from 'react';
import {
    FiArrowRight,
    FiBriefcase,
    FiCheckCircle,
    FiChevronDown,
    FiChevronUp,
    FiClock,
    FiCode,
    FiCpu,
    FiDatabase,
    FiFilter,
    FiHelpCircle,
    FiLayers,
    FiRefreshCw,
    FiSearch,
    FiSettings,
    FiStar,
    FiTerminal
} from 'react-icons/fi';

// Header component
const Header = () => (
  <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
    <div className="flex items-center">
      <FiCode className="text-blue-600 w-7 h-7 mr-3" />
      <h1 className="text-xl font-bold text-gray-800">PyLearning Topics</h1>
    </div>
    <div className="relative w-2/5">
      <input 
        type="text" 
        placeholder="Search topics, skills, or technologies..." 
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
    <div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        View My Path
      </button>
    </div>
  </header>
);

// Side navigation component
const SideNav = ({ selectedPath, setSelectedPath, paths }) => (
  <div className="bg-gray-50 w-60 border-r border-gray-200 h-screen pt-4">
    <button className="mx-4 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg mb-6 flex items-center justify-center w-40">
      <span className="font-medium">New Learning Path</span>
    </button>

    <div className="space-y-1">
      <div 
        className={`flex items-center px-4 py-2 cursor-pointer ${!selectedPath ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
        onClick={() => setSelectedPath(null)}
      >
        <FiLayers className="w-5 h-5 mr-3" />
        <span className="font-medium">All Topics</span>
      </div>
      
      <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
        <FiStar className="w-5 h-5 mr-3 text-yellow-500" />
        <span className="font-medium">Starred</span>
      </div>
      
      <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
        <FiClock className="w-5 h-5 mr-3 text-green-600" />
        <span className="font-medium">In Progress</span>
      </div>
      
      <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
        <FiCheckCircle className="w-5 h-5 mr-3 text-blue-600" />
        <span className="font-medium">Completed</span>
      </div>
    </div>

    <div className="mt-8 px-4">
      <h2 className="text-xs uppercase font-bold text-gray-500 mb-3 ml-3">Learning Paths</h2>
      <div className="space-y-1">
        {Object.entries(paths).map(([key, { name, icon }]) => (
          <div 
            key={key}
            className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedPath === key ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            onClick={() => setSelectedPath(key)}
          >
            {icon}
            <span className="ml-3 font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Toolbar component
const Toolbar = ({ selectedTopics, setSelectedTopics, topics, onRefresh, onFilterChange }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  
  const selectAllTopics = () => {
    if (selectedTopics.length === topics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(topics.map(topic => topic.id));
    }
  };
  
  const applyFilters = () => {
    onFilterChange({
      difficulty: difficultyFilter,
      status: statusFilter
    });
    setFilterOpen(false);
  };
  
  return (
    <div className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <input 
          type="checkbox" 
          checked={selectedTopics.length > 0 && selectedTopics.length === topics.length}
          onChange={selectAllTopics}
          className="w-5 h-5 rounded text-blue-600"
        />
        <button 
          onClick={onRefresh}
          className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
        >
          <FiRefreshCw />
        </button>
        <div className="relative">
          <button 
            className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded-full"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FiFilter />
          </button>
          
          {filterOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-60">
              <div className="p-4">
                <h3 className="font-medium text-gray-700 mb-2">Difficulty</h3>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <label key={level} className="flex items-center">
                      <input 
                        type="checkbox"
                        checked={difficultyFilter.includes(level)}
                        onChange={() => {
                          if (difficultyFilter.includes(level)) {
                            setDifficultyFilter(difficultyFilter.filter(l => l !== level));
                          } else {
                            setDifficultyFilter([...difficultyFilter, level]);
                          }
                        }}
                        className="mr-2"
                      />
                      {level}
                    </label>
                  ))}
                </div>
                
                <h3 className="font-medium text-gray-700 mt-4 mb-2">Status</h3>
                <div className="space-y-2">
                  {['Not Started', 'In Progress', 'Completed'].map(status => (
                    <label key={status} className="flex items-center">
                      <input 
                        type="checkbox"
                        checked={statusFilter.includes(status)}
                        onChange={() => {
                          if (statusFilter.includes(status)) {
                            setStatusFilter(statusFilter.filter(s => s !== status));
                          } else {
                            setStatusFilter([...statusFilter, status]);
                          }
                        }}
                        className="mr-2"
                      />
                      {status}
                    </label>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => setFilterOpen(false)}
                    className="text-gray-500 mr-2"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={applyFilters}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        {topics.length} topics
      </div>
    </div>
  );
};

// Topic row component
const TopicRow = ({ topic, isSelected, onSelect, onStar, onToggleDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getDifficultyColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-yellow-600';
      default: return 'text-gray-400';
    }
  };
  
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
    onToggleDetails(topic.id);
  };
  
  return (
    <>
      <tr 
        className={`border-b border-gray-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
      >
        <td className="pl-4 py-3 w-10">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => onSelect(topic.id)}
            className="w-5 h-5 rounded text-blue-600"
          />
        </td>
        <td className="py-3 w-10 text-center">
          <button 
            onClick={() => onStar(topic.id)}
            className="text-gray-300 hover:text-yellow-500"
          >
            <FiStar className={topic.starred ? 'text-yellow-500 fill-current' : ''} />
          </button>
        </td>
        <td className="py-3 w-10">
          {topic.pathIcon}
        </td>
        <td className="py-3 w-64">
          <div className="font-medium text-gray-800">{topic.title}</div>
        </td>
        <td className="py-3 flex-grow">
          <div className="text-gray-600 truncate max-w-md">{topic.description}</div>
        </td>
        <td className="py-3 w-32">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
            {topic.difficulty}
          </span>
        </td>
        <td className="py-3 w-32">
          <div className={`flex items-center ${getStatusColor(topic.status)}`}>
            {topic.status === 'Completed' ? <FiCheckCircle className="mr-1" /> : 
             topic.status === 'In Progress' ? <FiClock className="mr-1" /> : 
             <FiHelpCircle className="mr-1" />}
            <span>{topic.status}</span>
          </div>
        </td>
        <td className="py-3 w-10 pr-4 text-right">
          <button 
            onClick={handleToggleDetails}
            className="text-gray-400 hover:text-gray-800"
          >
            {showDetails ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan={8} className="bg-gray-50 p-4">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Prerequisites</h4>
                <ul className="space-y-1">
                  {topic.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <FiArrowRight className="text-gray-400 mr-2 w-3 h-3" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Key Concepts</h4>
                <ul className="space-y-1">
                  {topic.keyConcepts.map((concept, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {concept}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Related Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {topic.relatedTopics.map((related, i) => (
                    <span key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      {related}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const PythonTopicsTable = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [filters, setFilters] = useState({ difficulty: [], status: [] });
  
  // Path definitions with icons
  const paths = {
    fundamentals: { 
      name: 'Python Fundamentals', 
      icon: <FiCode className="w-5 h-5 text-blue-600" />
    },
    web_development: { 
      name: 'Web Development', 
      icon: <FiTerminal className="w-5 h-5 text-purple-600" />
    },
    data_science: { 
      name: 'Data Science', 
      icon: <FiDatabase className="w-5 h-5 text-green-600" />
    },
    machine_learning: { 
      name: 'Machine Learning', 
      icon: <FiCpu className="w-5 h-5 text-red-600" />
    },
    systems: { 
      name: 'System Programming', 
      icon: <FiSettings className="w-5 h-5 text-yellow-600" />
    },
    architecture: { 
      name: 'Software Architecture', 
      icon: <FiBriefcase className="w-5 h-5 text-indigo-600" />
    }
  };
  
  // Topic data with connections
  const allTopics = [
    // Fundamentals Path
    {
      id: 'python-basics',
      path: 'fundamentals',
      pathIcon: <FiCode className="w-5 h-5 text-blue-600" />,
      title: 'Python Syntax Basics',
      description: 'Core Python syntax, data types, and basic operations',
      difficulty: 'Beginner',
      status: 'Not Started',
      starred: false,
      prerequisites: ['None'],
      keyConcepts: ['Variables', 'Data Types', 'Operators', 'Control Flow', 'Input/Output'],
      relatedTopics: ['Functions & Modules', 'Error Handling', 'Basic Algorithms']
    },
    {
      id: 'functions-modules',
      path: 'fundamentals',
      pathIcon: <FiCode className="w-5 h-5 text-blue-600" />,
      title: 'Functions & Modules',
      description: 'Creating and using functions and modules for code organization',
      difficulty: 'Beginner',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics'],
      keyConcepts: ['Function Definition', 'Parameters', 'Return Values', 'Scope', 'Importing Modules'],
      relatedTopics: ['Python Syntax Basics', 'Error Handling', 'Object-Oriented Programming']
    },
    {
      id: 'data-structures',
      path: 'fundamentals',
      pathIcon: <FiCode className="w-5 h-5 text-blue-600" />,
      title: 'Data Structures',
      description: 'Working with lists, tuples, sets, dictionaries, and more',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Functions & Modules'],
      keyConcepts: ['Lists', 'Tuples', 'Sets', 'Dictionaries', 'Comprehensions', 'Memory Management'],
      relatedTopics: ['Basic Algorithms', 'Object-Oriented Programming', 'Advanced Algorithms']
    },
    {
      id: 'oop-python',
      path: 'fundamentals',
      pathIcon: <FiCode className="w-5 h-5 text-blue-600" />,
      title: 'Object-Oriented Programming',
      description: 'Classes, objects, inheritance, and polymorphism in Python',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Functions & Modules', 'Data Structures'],
      keyConcepts: ['Classes', 'Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Magic Methods'],
      relatedTopics: ['Data Structures', 'Advanced Python', 'Design Patterns']
    },
    {
      id: 'advanced-algorithms',
      path: 'fundamentals',
      pathIcon: <FiCode className="w-5 h-5 text-blue-600" />,
      title: 'Advanced Algorithms',
      description: 'Complex algorithms and optimization techniques',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Data Structures', 'Basic Algorithms', 'Object-Oriented Programming'],
      keyConcepts: ['Dynamic Programming', 'Graph Algorithms', 'Optimization', 'Complexity Analysis'],
      relatedTopics: ['Data Structures', 'Machine Learning Algorithms', 'System Design']
    },
    
    // Web Development Path
    {
      id: 'web-basics',
      path: 'web_development',
      pathIcon: <FiTerminal className="w-5 h-5 text-purple-600" />,
      title: 'Web Development Basics',
      description: 'Introduction to web development with Python',
      difficulty: 'Beginner',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Functions & Modules'],
      keyConcepts: ['HTTP Protocol', 'Request/Response', 'Web Servers', 'HTML/CSS/JS Basics'],
      relatedTopics: ['Flask Fundamentals', 'Django Basics', 'RESTful APIs']
    },
    {
      id: 'flask-fundamentals',
      path: 'web_development',
      pathIcon: <FiTerminal className="w-5 h-5 text-purple-600" />,
      title: 'Flask Fundamentals',
      description: 'Building web applications with Flask microframework',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Web Development Basics', 'Object-Oriented Programming'],
      keyConcepts: ['Routing', 'Templates', 'Forms', 'Database Integration', 'Blueprints'],
      relatedTopics: ['Web Development Basics', 'RESTful APIs', 'Django Basics']
    },
    {
      id: 'django-basics',
      path: 'web_development',
      pathIcon: <FiTerminal className="w-5 h-5 text-purple-600" />,
      title: 'Django Basics',
      description: 'Building web applications with Django framework',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Web Development Basics', 'Object-Oriented Programming'],
      keyConcepts: ['MVT Architecture', 'Models', 'Views', 'Templates', 'Admin Interface', 'Forms'],
      relatedTopics: ['Web Development Basics', 'Flask Fundamentals', 'Advanced Django']
    },
    {
      id: 'restful-apis',
      path: 'web_development',
      pathIcon: <FiTerminal className="w-5 h-5 text-purple-600" />,
      title: 'RESTful APIs',
      description: 'Designing and implementing RESTful APIs',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Web Development Basics', 'Flask Fundamentals or Django Basics'],
      keyConcepts: ['REST Principles', 'Endpoints', 'Authentication', 'Serialization', 'API Testing'],
      relatedTopics: ['Flask Fundamentals', 'Django Basics', 'Advanced Django', 'FastAPI']
    },
    {
      id: 'advanced-django',
      path: 'web_development',
      pathIcon: <FiTerminal className="w-5 h-5 text-purple-600" />,
      title: 'Advanced Django',
      description: 'Advanced features and best practices in Django',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Django Basics', 'RESTful APIs'],
      keyConcepts: ['Django ORM', 'Caching', 'Celery', 'Testing', 'Security', 'Deployment'],
      relatedTopics: ['Django Basics', 'RESTful APIs', 'Microservices']
    },
    
    // Data Science Path
    {
      id: 'data-analysis-basics',
      path: 'data_science',
      pathIcon: <FiDatabase className="w-5 h-5 text-green-600" />,
      title: 'Data Analysis Basics',
      description: 'Introduction to data analysis with Python',
      difficulty: 'Beginner',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Data Structures'],
      keyConcepts: ['NumPy', 'Pandas', 'Data Cleaning', 'Basic Statistics', 'Data Visualization'],
      relatedTopics: ['Advanced Data Analysis', 'Data Visualization', 'Statistical Methods']
    },
    {
      id: 'data-visualization',
      path: 'data_science',
      pathIcon: <FiDatabase className="w-5 h-5 text-green-600" />,
      title: 'Data Visualization',
      description: 'Creating visual representations of data',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Data Analysis Basics'],
      keyConcepts: ['Matplotlib', 'Seaborn', 'Plotly', 'Chart Types', 'Interactive Visualizations'],
      relatedTopics: ['Data Analysis Basics', 'Advanced Data Analysis', 'Dashboard Development']
    },
    {
      id: 'statistical-methods',
      path: 'data_science',
      pathIcon: <FiDatabase className="w-5 h-5 text-green-600" />,
      title: 'Statistical Methods',
      description: 'Statistical analysis and hypothesis testing',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Data Analysis Basics'],
      keyConcepts: ['Descriptive Statistics', 'Inferential Statistics', 'Hypothesis Testing', 'Regression'],
      relatedTopics: ['Data Analysis Basics', 'Advanced Data Analysis', 'Machine Learning Foundations']
    },
    {
      id: 'advanced-data-analysis',
      path: 'data_science',
      pathIcon: <FiDatabase className="w-5 h-5 text-green-600" />,
      title: 'Advanced Data Analysis',
      description: 'Advanced techniques for analyzing complex datasets',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Data Analysis Basics', 'Statistical Methods', 'Data Visualization'],
      keyConcepts: ['Time Series Analysis', 'Feature Engineering', 'Dimensionality Reduction', 'Advanced Pandas'],
      relatedTopics: ['Statistical Methods', 'Machine Learning Foundations', 'Big Data Processing']
    },
    {
      id: 'big-data-processing',
      path: 'data_science',
      pathIcon: <FiDatabase className="w-5 h-5 text-green-600" />,
      title: 'Big Data Processing',
      description: 'Processing and analyzing large-scale datasets',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Advanced Data Analysis'],
      keyConcepts: ['Distributed Computing', 'PySpark', 'Dask', 'Data Pipelines', 'Cloud Computing'],
      relatedTopics: ['Advanced Data Analysis', 'Data Engineering', 'Cloud Deployment']
    },
    
    // Machine Learning Path
    {
      id: 'ml-foundations',
      path: 'machine_learning',
      pathIcon: <FiCpu className="w-5 h-5 text-red-600" />,
      title: 'Machine Learning Foundations',
      description: 'Introduction to machine learning concepts and algorithms',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Data Analysis Basics', 'Statistical Methods'],
      keyConcepts: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Selection'],
      relatedTopics: ['Statistical Methods', 'Deep Learning', 'Natural Language Processing']
    },
    {
      id: 'deep-learning',
      path: 'machine_learning',
      pathIcon: <FiCpu className="w-5 h-5 text-red-600" />,
      title: 'Deep Learning',
      description: 'Neural networks and deep learning techniques',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Machine Learning Foundations'],
      keyConcepts: ['Neural Networks', 'CNNs', 'RNNs', 'Transfer Learning', 'PyTorch/TensorFlow'],
      relatedTopics: ['Machine Learning Foundations', 'Natural Language Processing', 'Computer Vision']
    },
    {
      id: 'natural-language-processing',
      path: 'machine_learning',
      pathIcon: <FiCpu className="w-5 h-5 text-red-600" />,
      title: 'Natural Language Processing',
      description: 'Processing and analyzing text data',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Machine Learning Foundations', 'Deep Learning'],
      keyConcepts: ['Text Processing', 'Word Embeddings', 'Language Models', 'Transformers', 'NLTK/spaCy'],
      relatedTopics: ['Deep Learning', 'Computer Vision', 'Generative AI']
    },
    {
      id: 'computer-vision',
      path: 'machine_learning',
      pathIcon: <FiCpu className="w-5 h-5 text-red-600" />,
      title: 'Computer Vision',
      description: 'Processing and analyzing visual data',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Machine Learning Foundations', 'Deep Learning'],
      keyConcepts: ['Image Processing', 'Object Detection', 'Image Classification', 'OpenCV', 'CNN Architectures'],
      relatedTopics: ['Deep Learning', 'Natural Language Processing', 'Generative AI']
    },
    {
      id: 'generative-ai',
      path: 'machine_learning',
      pathIcon: <FiCpu className="w-5 h-5 text-red-600" />,
      title: 'Generative AI',
      description: 'Creating generative models and applications',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Deep Learning', 'Natural Language Processing or Computer Vision'],
      keyConcepts: ['GANs', 'VAEs', 'Diffusion Models', 'Large Language Models', 'Prompt Engineering'],
      relatedTopics: ['Deep Learning', 'Natural Language Processing', 'Computer Vision']
    },
    
    // Systems Path
    {
      id: 'system-programming',
      path: 'systems',
      pathIcon: <FiSettings className="w-5 h-5 text-yellow-600" />,
      title: 'System Programming',
      description: 'Low-level system programming with Python',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Functions & Modules'],
      keyConcepts: ['Process Management', 'Memory Management', 'File Systems', 'System Calls', 'OS Module'],
      relatedTopics: ['Concurrent Programming', 'Network Programming', 'Automation']
    },
    {
      id: 'concurrent-programming',
      path: 'systems',
      pathIcon: <FiSettings className="w-5 h-5 text-yellow-600" />,
      title: 'Concurrent Programming',
      description: 'Writing concurrent and parallel code',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['System Programming'],
      keyConcepts: ['Threading', 'Multiprocessing', 'Async I/O', 'Synchronization', 'Locks & Semaphores'],
      relatedTopics: ['System Programming', 'Distributed Systems', 'Performance Optimization']
    },
    {
      id: 'network-programming',
      path: 'systems',
      pathIcon: <FiSettings className="w-5 h-5 text-yellow-600" />,
      title: 'Network Programming',
      description: 'Building networked applications and protocols',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['System Programming'],
      keyConcepts: ['Sockets', 'HTTP', 'TCP/IP', 'Client-Server', 'Network Protocols'],
      relatedTopics: ['System Programming', 'Web Development Basics', 'Distributed Systems']
    },
    {
      id: 'distributed-systems',
      path: 'systems',
      pathIcon: <FiSettings className="w-5 h-5 text-yellow-600" />,
      title: 'Distributed Systems',
      description: 'Building scalable distributed applications',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Concurrent Programming', 'Network Programming'],
      keyConcepts: ['Distributed Architectures', 'Consensus Algorithms', 'Fault Tolerance', 'Load Balancing'],
      relatedTopics: ['Concurrent Programming', 'Network Programming', 'Cloud Deployment']
    },
    {
      id: 'automation-scripting',
      path: 'systems',
      pathIcon: <FiSettings className="w-5 h-5 text-yellow-600" />,
      title: 'Automation & Scripting',
      description: 'Automating tasks and processes with Python',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Functions & Modules'],
      keyConcepts: ['Shell Integration', 'Task Automation', 'Scheduled Jobs', 'Process Control', 'PyAutoGUI'],
      relatedTopics: ['System Programming', 'Data Processing', 'DevOps']
    },
    
    // Architecture Path
    {
      id: 'clean-code',
      path: 'architecture',
      pathIcon: <FiBriefcase className="w-5 h-5 text-indigo-600" />,
      title: 'Clean Code Principles',
      description: 'Writing maintainable and efficient code',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Object-Oriented Programming'],
      keyConcepts: ['Code Organization', 'Naming Conventions', 'Refactoring', 'Documentation', 'Testing'],
      relatedTopics: ['Object-Oriented Programming', 'Design Patterns', 'Software Architecture']
    },
    {
      id: 'design-patterns',
      path: 'architecture',
      pathIcon: <FiBriefcase className="w-5 h-5 text-indigo-600" />,
      title: 'Design Patterns',
      description: 'Common software design patterns in Python',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Object-Oriented Programming', 'Clean Code Principles'],
      keyConcepts: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'Pattern Selection'],
      relatedTopics: ['Clean Code Principles', 'Software Architecture', 'Enterprise Architecture']
    },
    {
      id: 'software-architecture',
      path: 'architecture',
      pathIcon: <FiBriefcase className="w-5 h-5 text-indigo-600" />,
      title: 'Software Architecture',
      description: 'Designing robust software systems',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Clean Code Principles', 'Design Patterns'],
      keyConcepts: ['Architectural Patterns', 'Scalability', 'Maintainability', 'Security', 'Performance'],
      relatedTopics: ['Design Patterns', 'Enterprise Architecture', 'System Design']
    },
    {
      id: 'testing-quality-assurance',
      path: 'architecture',
      pathIcon: <FiBriefcase className="w-5 h-5 text-indigo-600" />,
      title: 'Testing & Quality Assurance',
      description: 'Ensuring software quality through testing',
      difficulty: 'Intermediate',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Python Syntax Basics', 'Clean Code Principles'],
      keyConcepts: ['Unit Testing', 'Integration Testing', 'Test-Driven Development', 'CI/CD', 'Code Coverage'],
      relatedTopics: ['Clean Code Principles', 'DevOps', 'Software Architecture']
    },
    {
      id: 'enterprise-architecture',
      path: 'architecture',
      pathIcon: <FiBriefcase className="w-5 h-5 text-indigo-600" />,
      title: 'Enterprise Architecture',
      description: 'Building large-scale enterprise applications',
      difficulty: 'Advanced',
      status: 'Not Started',
      starred: false,
      prerequisites: ['Software Architecture', 'Design Patterns', 'Testing & Quality Assurance'],
      keyConcepts: ['Microservices', 'Event-Driven Architecture', 'Domain-Driven Design', 'Integration Patterns'],
      relatedTopics: ['Software Architecture', 'Distributed Systems', 'DevOps']
    }
  ];
  
  // Filter topics based on selected path and filters
  const getFilteredTopics = () => {
    let filtered = [...allTopics];
    
    if (selectedPath) {
      filtered = filtered.filter(topic => topic.path === selectedPath);
    }
    
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(topic => filters.difficulty.includes(topic.difficulty));
    }
    
    if (filters.status.length > 0) {
      filtered = filtered.filter(topic => filters.status.includes(topic.status));
    }
    
    return filtered;
  };
  
  const filteredTopics = getFilteredTopics();
  
  // Handlers
  const handleSelectTopic = (topicId: string) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };
  
  const handleStarTopic = (topicId: string) => {
    const updatedTopics = allTopics.map(topic => {
      if (topic.id === topicId) {
        return { ...topic, starred: !topic.starred };
      }
      return topic;
    });
    // In a real app, we'd update the state here
  };
  
  const handleToggleDetails = (topicId: string) => {
    if (expandedTopics.includes(topicId)) {
      setExpandedTopics(expandedTopics.filter(id => id !== topicId));
    } else {
      setExpandedTopics([...expandedTopics, topicId]);
    }
  };
  
  const handleRefresh = () => {
    // In a real app, we might fetch fresh data here
    console.log('Refreshing data...');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav 
        selectedPath={selectedPath} 
        setSelectedPath={setSelectedPath}
        paths={paths}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto">
          <Toolbar 
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
            topics={filteredTopics}
            onRefresh={handleRefresh}
            onFilterChange={setFilters}
          />
          
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="pl-4 py-3 w-10"></th>
                <th className="py-3 w-10"></th>
                <th className="py-3 w-10"></th>
                <th className="py-3 w-64 text-left text-sm font-medium text-gray-500">Topic</th>
                <th className="py-3 flex-grow text-left text-sm font-medium text-gray-500">Description</th>
                <th className="py-3 w-32 text-left text-sm font-medium text-gray-500">Difficulty</th>
                <th className="py-3 w-32 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-3 w-10 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTopics.map(topic => (
                <TopicRow 
                  key={topic.id}
                  topic={topic}
                  isSelected={selectedTopics.includes(topic.id)}
                  onSelect={handleSelectTopic}
                  onStar={handleStarTopic}
                  onToggleDetails={handleToggleDetails}
                />
              ))}
            </tbody>
          </table>
          
          {filteredTopics.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FiSearch className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg">No topics match your filters</p>
              <button 
                onClick={() => setFilters({ difficulty: [], status: [] })}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PythonTopicsTable;