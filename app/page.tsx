'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBook, FaChartBar, FaChevronDown, FaCog, FaGlobe, FaRobot } from 'react-icons/fa';
import NavBar from '../components/NavBar';

interface ExpandedSections {
  fundamentals: boolean;
  webdev: boolean;
  datascience: boolean;
  automation: boolean;
  aiml: boolean;
}

const LearningPath = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    fundamentals: true,
    webdev: false,
    datascience: false,
    automation: false,
    aiml: false
  });
  
  const toggleSection = (section: keyof ExpandedSections): void => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-24"
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
        <h2 className="text-3xl font-bold mb-12 text-center">Your Learning Journey</h2>
        
        {/* Fundamentals Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
            onClick={() => toggleSection('fundamentals')}
            className="w-full flex items-center justify-between p-6"
          >
            <div className="flex items-center">
              <FaBook className="w-6 h-6 mr-4 text-blue-600" />
              <h3 className="text-2xl font-semibold">Python Fundamentals</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.fundamentals ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="w-6 h-6 text-blue-500" />
            </motion.div>
          </motion.button>
          
          {expandedSections.fundamentals && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 pt-0 grid md:grid-cols-3 gap-6"
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Python Basics</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Variables & Types</li>
                  <li>• Control Flow</li>
                  <li>• Functions</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Data Structures</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Lists & Tuples</li>
                  <li>• Dictionaries</li>
                  <li>• Sets</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Basic OOP</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Classes</li>
                  <li>• Objects</li>
                  <li>• Inheritance</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Career Paths */}
        <h3 className="text-2xl font-bold mb-8 text-center">Specialized Career Paths</h3>

        {/* Web Development Path */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 overflow-hidden"
        >
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
            onClick={() => toggleSection('webdev')}
            className="w-full flex items-center justify-between p-6"
          >
            <div className="flex items-center">
              <FaGlobe className="w-6 h-6 mr-4 text-blue-500" />
              <h3 className="text-2xl font-semibold">Web Development Path</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.webdev ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="w-6 h-6 text-blue-500" />
            </motion.div>
          </motion.button>
          
          {expandedSections.webdev && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 pt-0 grid md:grid-cols-3 gap-6"
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 1: Basics</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• HTML/CSS Integration</li>
                  <li>• Flask Fundamentals</li>
                  <li>• Basic Routing</li>
                  <li>• Templates & Forms</li>
                  <li>• HTTP Basics</li>
                  <li>• Basic Database Operations</li>
                  <li>• Error Handling</li>
                  <li>• Session Management</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 2: Advanced</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Django Framework</li>
                  <li>• Database Integration</li>
                  <li>• Authentication & Authorization</li>
                  <li>• RESTful API Design</li>
                  <li>• API Security</li>
                  <li>• Caching Strategies</li>
                  <li>• Async Programming</li>
                  <li>• Testing Web Apps</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 3: Expert</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Microservices Architecture</li>
                  <li>• GraphQL APIs</li>
                  <li>• WebSockets</li>
                  <li>• Docker & Containers</li>
                  <li>• Cloud Deployment</li>
                  <li>• Performance Optimization</li>
                  <li>• Security Best Practices</li>
                  <li>• Monitoring & Logging</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Data Science Path */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500 overflow-hidden"
        >
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(22, 163, 74, 0.05)' }}
            onClick={() => toggleSection('datascience')}
            className="w-full flex items-center justify-between p-6"
          >
            <div className="flex items-center">
              <FaChartBar className="w-6 h-6 mr-4 text-green-500" />
              <h3 className="text-2xl font-semibold">Data Science Path</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.datascience ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="w-6 h-6 text-green-500" />
            </motion.div>
          </motion.button>
          
          {expandedSections.datascience && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 pt-0 grid md:grid-cols-3 gap-6"
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 1: Foundations</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• NumPy Arrays & Operations</li>
                  <li>• Pandas DataFrames</li>
                  <li>• Data Cleaning & Preprocessing</li>
                  <li>• Basic Statistics</li>
                  <li>• Data Collection</li>
                  <li>• Excel Integration</li>
                  <li>• Basic Visualization</li>
                  <li>• SQL Fundamentals</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 2: Analysis</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Advanced Statistics</li>
                  <li>• Hypothesis Testing</li>
                  <li>• Advanced Pandas</li>
                  <li>• Feature Engineering</li>
                  <li>• Time Series Analysis</li>
                  <li>• Advanced Visualization</li>
                  <li>• Data Pipelines</li>
                  <li>• ETL Processes</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 3: Advanced</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Big Data with PySpark</li>
                  <li>• Advanced Analytics</li>
                  <li>• Production Systems</li>
                  <li>• Data Warehousing</li>
                  <li>• Business Intelligence</li>
                  <li>• Data Strategy</li>
                  <li>• Cloud Analytics</li>
                  <li>• Data Ethics</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Automation Path */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500 overflow-hidden"
        >
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.05)' }}
            onClick={() => toggleSection('automation')}
            className="w-full flex items-center justify-between p-6"
          >
            <div className="flex items-center">
              <FaCog className="w-6 h-6 mr-4 text-purple-500" />
              <h3 className="text-2xl font-semibold">Automation Path</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.automation ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="w-6 h-6 text-purple-500" />
            </motion.div>
          </motion.button>
          
          {expandedSections.automation && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 pt-0 grid md:grid-cols-3 gap-6"
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 1: Scripting</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• File & Directory Operations</li>
                  <li>• Basic Shell Integration</li>
                  <li>• Task Scheduling</li>
                  <li>• Regular Expressions</li>
                  <li>• Command Line Tools</li>
                  <li>• Basic Error Handling</li>
                  <li>• Config Management</li>
                  <li>• Logging Basics</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 2: Testing</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Unit Testing (PyTest)</li>
                  <li>• Integration Testing</li>
                  <li>• Test Automation</li>
                  <li>• Mocking & Patching</li>
                  <li>• Performance Testing</li>
                  <li>• Security Testing</li>
                  <li>• Test Coverage</li>
                  <li>• BDD with Behave</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 3: DevOps</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• CI/CD Pipelines</li>
                  <li>• Infrastructure as Code</li>
                  <li>• Container Orchestration</li>
                  <li>• Cloud Automation</li>
                  <li>• Configuration Management</li>
                  <li>• Monitoring Systems</li>
                  <li>• Security Automation</li>
                  <li>• Site Reliability</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* AI/ML Path */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500 overflow-hidden"
        >
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
            onClick={() => toggleSection('aiml')}
            className="w-full flex items-center justify-between p-6"
          >
            <div className="flex items-center">
              <FaRobot className="w-6 h-6 mr-4 text-red-500" />
              <h3 className="text-2xl font-semibold">AI/ML Path</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.aiml ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="w-6 h-6 text-red-500" />
            </motion.div>
          </motion.button>
          
          {expandedSections.aiml && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 pt-0 grid md:grid-cols-3 gap-6"
            >
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 1: ML Basics</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Scikit-learn Fundamentals</li>
                  <li>• Supervised Learning</li>
                  <li>• Model Evaluation</li>
                  <li>• Data Preprocessing</li>
                  <li>• Feature Selection</li>
                  <li>• Cross-validation</li>
                  <li>• Basic Optimization</li>
                  <li>• ML Pipelines</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 2: Deep Learning</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Neural Network Basics</li>
                  <li>• TensorFlow/PyTorch</li>
                  <li>• CNN Architecture</li>
                  <li>• Computer Vision</li>
                  <li>• Transfer Learning</li>
                  <li>• Data Augmentation</li>
                  <li>• Model Tuning</li>
                  <li>• GPU Training</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Level 3: Advanced AI</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Transformers & NLP</li>
                  <li>• Reinforcement Learning</li>
                  <li>• GANs</li>
                  <li>• MLOps & Deployment</li>
                  <li>• Model Optimization</li>
                  <li>• AutoML</li>
                  <li>• AI Ethics</li>
                  <li>• Research Methods</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-gray-100 to-white py-20"
      >
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