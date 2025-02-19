// pages/index.tsx
"use client"
// Import necessary dependencies    
import { motion } from 'framer-motion';
import Head from 'next/head';
import React, { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Define types for our interactive components
type LearningRateData = {
  rate: number;
  loss: number;
  accuracy: number;
};

type BatchSizeData = {
  size: number;
  trainingTime: number;
  memoryUsage: number;
};

// Add these types for the model information table
type ModelInfo = {
  name: string;
  category: string;
  hyperparameters: {
    name: string;
    typical_values: string;
    impact: string;
  }[];
  use_cases: string[];
  tips: string;
};

// Add new type for RL information
type RLInfo = {
  name: string;
  description: string;
  algorithms: {
    name: string;
    description: string;
    use_cases: string[];
    key_parameters: {
      name: string;
      description: string;
      typical_values: string;
    }[];
  }[];
};

// Generate learning rate sample data
const learningRateData: LearningRateData[] = [
  { rate: 0.0001, loss: 0.82, accuracy: 0.64 },
  { rate: 0.001, loss: 0.45, accuracy: 0.78 },
  { rate: 0.01, loss: 0.25, accuracy: 0.89 },
  { rate: 0.1, loss: 0.35, accuracy: 0.82 },
  { rate: 0.5, loss: 0.65, accuracy: 0.73 },
  { rate: 1.0, loss: 0.95, accuracy: 0.61 },
];

// Generate batch size sample data
const batchSizeData: BatchSizeData[] = [
  { size: 8, trainingTime: 120, memoryUsage: 1.2 },
  { size: 16, trainingTime: 95, memoryUsage: 1.8 },
  { size: 32, trainingTime: 60, memoryUsage: 2.5 },
  { size: 64, trainingTime: 45, memoryUsage: 4.2 },
  { size: 128, trainingTime: 35, memoryUsage: 7.8 },
  { size: 256, trainingTime: 32, memoryUsage: 15.1 },
];

// Add this data array
const modelInformation: ModelInfo[] = [
  // Deep Learning Models
  {
    name: "Transformer (BERT)",
    category: "Natural Language Processing",
    hyperparameters: [
      { name: "Attention Heads", typical_values: "8-24", impact: "Multi-head attention capacity" },
      { name: "Hidden Size", typical_values: "768-1024", impact: "Model representation capacity" },
      { name: "Layers", typical_values: "12-24", impact: "Model depth" },
      { name: "Learning Rate", typical_values: "1e-5 to 5e-5", impact: "Fine-tuning stability" }
    ],
    use_cases: ["Text Classification", "Named Entity Recognition", "Question Answering"],
    tips: "Use gradient accumulation for large batch training; warm up learning rate"
  },
  {
    name: "GPT Architecture",
    category: "Natural Language Processing",
    hyperparameters: [
      { name: "Context Window", typical_values: "1024-8192", impact: "Maximum sequence length" },
      { name: "Model Dimension", typical_values: "768-2048", impact: "Representation capacity" },
      { name: "Attention Heads", typical_values: "12-40", impact: "Parallel attention processing" }
    ],
    use_cases: ["Text Generation", "Completion", "Few-shot Learning"],
    tips: "Use flash attention for efficiency; implement proper tokenization"
  },
  {
    name: "ResNet",
    category: "Computer Vision",
    hyperparameters: [
      { name: "Depth", typical_values: "18, 34, 50, 101", impact: "Model complexity" },
      { name: "Width Multiplier", typical_values: "0.5-2.0", impact: "Channel capacity" },
      { name: "Initial Channels", typical_values: "32-64", impact: "Base representation size" }
    ],
    use_cases: ["Image Classification", "Feature Extraction", "Transfer Learning"],
    tips: "Use skip connections; batch normalization after convolutions"
  },
  {
    name: "Vision Transformer (ViT)",
    category: "Computer Vision",
    hyperparameters: [
      { name: "Patch Size", typical_values: "14x14, 16x16", impact: "Input tokenization" },
      { name: "Heads", typical_values: "8-16", impact: "Multi-head attention" },
      { name: "MLP Ratio", typical_values: "2.0-4.0", impact: "Feed-forward capacity" }
    ],
    use_cases: ["Image Classification", "Vision Tasks", "Self-supervised Learning"],
    tips: "Pre-train on large datasets; use proper regularization"
  },
  {
    name: "YOLO",
    category: "Computer Vision",
    hyperparameters: [
      { name: "Input Resolution", typical_values: "416x416, 608x608", impact: "Detection detail" },
      { name: "Anchor Boxes", typical_values: "3-5 per scale", impact: "Object detection priors" },
      { name: "IOU Threshold", typical_values: "0.4-0.6", impact: "Detection confidence" }
    ],
    use_cases: ["Object Detection", "Real-time Detection", "Video Analysis"],
    tips: "Balance speed and accuracy; use mosaic augmentation"
  },
  {
    name: "U-Net",
    category: "Computer Vision",
    hyperparameters: [
      { name: "Depth", typical_values: "4-5", impact: "Feature hierarchy levels" },
      { name: "Base Channels", typical_values: "32-64", impact: "Feature capacity" },
      { name: "Dropout Rate", typical_values: "0.2-0.5", impact: "Regularization strength" }
    ],
    use_cases: ["Image Segmentation", "Medical Imaging", "Dense Prediction"],
    tips: "Use skip connections; implement proper data augmentation"
  },
  {
    name: "Stable Diffusion",
    category: "Generative AI",
    hyperparameters: [
      { name: "Noise Schedule", typical_values: "linear, cosine", impact: "Diffusion process" },
      { name: "Sampling Steps", typical_values: "20-50", impact: "Generation quality" },
      { name: "CFG Scale", typical_values: "7.0-15.0", impact: "Prompt adherence" }
    ],
    use_cases: ["Image Generation", "Image Editing", "Style Transfer"],
    tips: "Balance speed vs quality; use proper prompt engineering"
  },
  {
    name: "LSTM",
    category: "Sequential Data",
    hyperparameters: [
      { name: "Hidden Size", typical_values: "128-512", impact: "Memory capacity" },
      { name: "Layers", typical_values: "1-3", impact: "Sequential depth" },
      { name: "Dropout", typical_values: "0.2-0.5", impact: "Regularization" }
    ],
    use_cases: ["Time Series", "Text Generation", "Sequence Prediction"],
    tips: "Use gradient clipping; initialize forget bias to 1"
  },
  // Traditional Machine Learning Models
  {
    name: "LightGBM",
    category: "Gradient Boosting",
    hyperparameters: [
      { name: "num_leaves", typical_values: "31-127", impact: "Tree complexity" },
      { name: "learning_rate", typical_values: "0.01-0.1", impact: "Training speed" },
      { name: "feature_fraction", typical_values: "0.6-0.9", impact: "Feature sampling" }
    ],
    use_cases: ["Structured Data", "Ranking", "Classification"],
    tips: "Use early stopping; handle categorical features properly"
  },
  {
    name: "CatBoost",
    category: "Gradient Boosting",
    hyperparameters: [
      { name: "depth", typical_values: "6-10", impact: "Tree depth" },
      { name: "l2_leaf_reg", typical_values: "3-10", impact: "L2 regularization" },
      { name: "learning_rate", typical_values: "0.03-0.1", impact: "Training speed" }
    ],
    use_cases: ["Categorical Data", "Time Series", "Ranking"],
    tips: "Use ordered boosting; handle categorical features automatically"
  },
  {
    name: "Random Forest",
    category: "Ensemble Methods",
    hyperparameters: [
      { name: "n_estimators", typical_values: "100-1000", impact: "Ensemble size" },
      { name: "max_depth", typical_values: "10-100", impact: "Tree complexity" },
      { name: "min_samples_leaf", typical_values: "1-10", impact: "Leaf size" }
    ],
    use_cases: ["Classification", "Regression", "Feature Selection"],
    tips: "Balance depth vs number of trees; use feature importance"
  },
  {
    name: "SVM",
    category: "Classical ML",
    hyperparameters: [
      { name: "C", typical_values: "0.1-10.0", impact: "Regularization strength" },
      { name: "kernel", typical_values: "rbf, linear, poly", impact: "Feature space mapping" },
      { name: "gamma", typical_values: "scale, auto", impact: "RBF kernel width" }
    ],
    use_cases: ["Binary Classification", "Text Classification", "Small Datasets"],
    tips: "Scale features; use kernel trick for non-linear data"
  },
  // Specialized Models
  {
    name: "Graph Neural Network",
    category: "Graph Learning",
    hyperparameters: [
      { name: "layers", typical_values: "2-4", impact: "Message passing steps" },
      { name: "hidden_channels", typical_values: "64-256", impact: "Node representation" },
      { name: "dropout", typical_values: "0.1-0.5", impact: "Regularization" }
    ],
    use_cases: ["Molecular Property Prediction", "Social Networks", "Knowledge Graphs"],
    tips: "Use skip connections; handle sparse data efficiently"
  },
  {
    name: "VAE",
    category: "Generative Models",
    hyperparameters: [
      { name: "latent_dim", typical_values: "32-128", impact: "Compression level" },
      { name: "beta", typical_values: "0.1-1.0", impact: "KL divergence weight" },
      { name: "architecture", typical_values: "CNN, MLP", impact: "Encoder/decoder structure" }
    ],
    use_cases: ["Image Generation", "Anomaly Detection", "Feature Learning"],
    tips: "Balance reconstruction vs KL loss; use proper architecture"
  },
  {
    name: "T5",
    category: "Natural Language Processing",
    hyperparameters: [
      { name: "model_dim", typical_values: "512-1024", impact: "Representation capacity" },
      { name: "feed_forward_dim", typical_values: "1024-4096", impact: "Processing capacity" },
      { name: "num_layers", typical_values: "8-24", impact: "Model depth" }
    ],
    use_cases: ["Text-to-Text Tasks", "Translation", "Summarization"],
    tips: "Use task prefixes; implement proper preprocessing"
  }
];

// Add RL data
const rlInformation: RLInfo[] = [
  {
    name: "Value-Based Methods",
    description: "Learn to estimate the value of being in a state or taking an action",
    algorithms: [
      {
        name: "DQN (Deep Q-Network)",
        description: "Combines Q-learning with deep neural networks for value approximation",
        use_cases: ["Game playing", "Robotics", "Resource management"],
        key_parameters: [
          {
            name: "Epsilon (ε)",
            description: "Exploration vs exploitation trade-off",
            typical_values: "Start at 1.0, decay to 0.01-0.1"
          },
          {
            name: "Gamma (γ)",
            description: "Discount factor for future rewards",
            typical_values: "0.95-0.99"
          },
          {
            name: "Learning rate",
            description: "Step size for value updates",
            typical_values: "0.0001-0.001"
          }
        ]
      },
      {
        name: "Double DQN",
        description: "Addresses overestimation bias in DQN using two networks",
        use_cases: ["Complex decision making", "Continuous control"],
        key_parameters: [
          {
            name: "Target network update frequency",
            description: "How often to update target network",
            typical_values: "Every 100-1000 steps"
          }
        ]
      }
    ]
  },
  {
    name: "Policy-Based Methods",
    description: "Directly learn the optimal policy without value estimation",
    algorithms: [
      {
        name: "PPO (Proximal Policy Optimization)",
        description: "Stable policy gradient method with clipped objective",
        use_cases: ["Robotics", "Complex control tasks", "Game AI"],
        key_parameters: [
          {
            name: "Clip parameter",
            description: "Limits policy update size",
            typical_values: "0.1-0.3"
          },
          {
            name: "GAE lambda",
            description: "Controls advantage estimation bias-variance trade-off",
            typical_values: "0.9-0.95"
          }
        ]
      },
      {
        name: "SAC (Soft Actor-Critic)",
        description: "Maximum entropy RL with separate policy and value networks",
        use_cases: ["Robotics", "Continuous control", "Autonomous systems"],
        key_parameters: [
          {
            name: "Temperature (alpha)",
            description: "Controls exploration-exploitation balance",
            typical_values: "0.01-1.0"
          },
          {
            name: "Target smoothing coefficient",
            description: "Controls target network updates",
            typical_values: "0.001-0.005"
          }
        ]
      }
    ]
  },
  {
    name: "Model-Based Methods",
    description: "Learn a model of the environment to plan and make decisions",
    algorithms: [
      {
        name: "MBPO (Model-Based Policy Optimization)",
        description: "Combines model learning with policy optimization for sample efficiency",
        use_cases: ["Robot manipulation", "System control", "Planning"],
        key_parameters: [
          {
            name: "Model ensemble size",
            description: "Number of dynamics models in ensemble",
            typical_values: "5-10 models"
          },
          {
            name: "Planning horizon",
            description: "How many steps ahead to plan",
            typical_values: "5-20 steps"
          },
          {
            name: "Real data ratio",
            description: "Ratio of real to model-generated data",
            typical_values: "0.05-0.5"
          }
        ]
      },
      {
        name: "World Models",
        description: "Learn latent dynamics model for efficient planning",
        use_cases: ["Visual environments", "Complex dynamics", "Long-horizon tasks"],
        key_parameters: [
          {
            name: "Latent dimension",
            description: "Size of learned state representation",
            typical_values: "32-256"
          },
          {
            name: "Reconstruction weight",
            description: "Balance between reconstruction and prediction",
            typical_values: "0.1-1.0"
          }
        ]
      }
    ]
  },
  {
    name: "Multi-Agent Methods",
    description: "Handle interactions between multiple learning agents",
    algorithms: [
      {
        name: "MADDPG (Multi-Agent DDPG)",
        description: "Decentralized execution with centralized training",
        use_cases: ["Multi-robot systems", "Game theory", "Competitive scenarios"],
        key_parameters: [
          {
            name: "Critic network architecture",
            description: "How to process other agents' information",
            typical_values: "Attention-based or concatenation"
          },
          {
            name: "Communication bandwidth",
            description: "Amount of information shared between agents",
            typical_values: "4-32 dimensions per agent"
          }
        ]
      },
      {
        name: "QMIX",
        description: "Value factorization for cooperative multi-agent tasks",
        use_cases: ["Team sports", "Swarm robotics", "Cooperative games"],
        key_parameters: [
          {
            name: "Mixing network size",
            description: "Capacity of value decomposition",
            typical_values: "64-256 units"
          },
          {
            name: "Agent number",
            description: "Number of cooperative agents",
            typical_values: "2-20 agents"
          }
        ]
      }
    ]
  }
];

// Add type for training metrics visualization
type TrainingMetrics = {
  episode: number;
  reward: number;
  value_loss: number;
  policy_loss: number;
};

// Add sample training data
const trainingData: TrainingMetrics[] = [
  { episode: 0, reward: -100, value_loss: 2.5, policy_loss: 1.8 },
  { episode: 100, reward: -50, value_loss: 1.8, policy_loss: 1.5 },
  { episode: 200, reward: 0, value_loss: 1.2, policy_loss: 1.2 },
  { episode: 300, reward: 50, value_loss: 0.8, policy_loss: 0.9 },
  { episode: 400, reward: 150, value_loss: 0.5, policy_loss: 0.6 },
  { episode: 500, reward: 200, value_loss: 0.3, policy_loss: 0.4 },
];

// Add RL Code Examples component
const RLCodeExamples: React.FC<{ algorithm: string }> = ({ algorithm }) => {
  const codeExamples = {
    dqn: `
import torch
import torch.nn as nn

class DQN(nn.Module):
    def __init__(self, state_dim, action_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(state_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, action_dim)
        )
        
    def forward(self, x):
        return self.network(x)

class ReplayBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.buffer = []
        
    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))
        if len(self.buffer) > self.capacity:
            self.buffer.pop(0)
            
    def sample(self, batch_size):
        return random.sample(self.buffer, batch_size)
`,
    ppo: `
import torch
import torch.nn as nn
from torch.distributions import Normal

class PPO(nn.Module):
    def __init__(self, state_dim, action_dim):
        super().__init__()
        self.actor = nn.Sequential(
            nn.Linear(state_dim, 64),
            nn.Tanh(),
            nn.Linear(64, 64),
            nn.Tanh(),
            nn.Linear(64, action_dim),
        )
        self.critic = nn.Sequential(
            nn.Linear(state_dim, 64),
            nn.Tanh(),
            nn.Linear(64, 64),
            nn.Tanh(),
            nn.Linear(64, 1)
        )
        
    def forward(self, state):
        value = self.critic(state)
        action_mean = self.actor(state)
        action_std = torch.ones_like(action_mean)
        return Normal(action_mean, action_std), value
`
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
      <pre className="text-green-400 text-sm">
        <code>{codeExamples[algorithm]}</code>
      </pre>
    </div>
  );
};

// Add new ModelCard component
const ModelCard: React.FC<{ model: ModelInfo }> = ({ model }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{model.name}</h3>
        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
          {model.category}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Key Hyperparameters:</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parameter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Typical Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {model.hyperparameters.map((param, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {param.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {param.typical_values}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {param.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Common Use Cases:</h4>
        <div className="flex flex-wrap gap-2">
          {model.use_cases.map((use, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800"
            >
              {use}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-sm text-yellow-700">
          <strong>Tip:</strong> {model.tips}
        </p>
      </div>
    </div>
  );
};

// Modify the ModelTable component
const ModelTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredModels = modelInformation.filter(model => 
    (selectedCategory === "all" || model.category === selectedCategory) &&
    (model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     model.use_cases.some(use => use.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search models or use cases..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "all" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "Deep Learning" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("Deep Learning")}
            >
              Deep Learning
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "Machine Learning" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("Machine Learning")}
            >
              Machine Learning
            </button>
          </div>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid gap-6">
        {filteredModels.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No models found matching your search criteria
          </div>
        ) : (
          filteredModels.map((model, index) => (
            <ModelCard key={index} model={model} />
          ))
        )}
      </div>
    </div>
  );
};

// Main component
const HyperparameterTutorial: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [activeDLParam, setActiveDLParam] = useState<string>('learning_rate');
  const [activeGenAITopic, setActiveGenAITopic] = useState<string>('foundations');
  const [activeMLParam, setActiveMLParam] = useState<string>('regularization');
  const [activeRLTopic, setActiveRLTopic] = useState<string>('value_based');

  // Add navigation sections
  const sections = [
    { id: 'introduction', name: 'Introduction' },
    { id: 'deep_learning', name: 'Deep Learning' },
    { id: 'generative_ai', name: 'Generative AI' },
    { id: 'machine_learning', name: 'Machine Learning' },
    { id: 'reinforcement_learning', name: 'Reinforcement Learning' },
    { id: 'model_catalog', name: 'Model Catalog' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Machine Learning Hyperparameters</title>
        <meta name="description" content="Learn about hyperparameters in deep learning and machine learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sticky Header with Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <span className="text-white text-xl font-bold">ML Hyperparameter Guide</span>
            </div>
          </div>
        </nav>
        
        {/* Section Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 overflow-x-auto py-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Parameters/Topics */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-36 bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {activeSection === 'deep_learning' && 'Deep Learning Parameters'}
                {activeSection === 'generative_ai' && 'Generative AI Topics'}
                {activeSection === 'machine_learning' && 'ML Parameters'}
                {activeSection === 'reinforcement_learning' && 'RL Topics'}
              </h3>
              
              {/* Dynamic Parameter/Topic List */}
              <div className="space-y-2">
                {activeSection === 'deep_learning' && (
                  ['learning_rate', 'batch_size', 'epochs', 'optimizer', 'layers'].map(param => (
                    <button
                      key={param}
                      onClick={() => setActiveDLParam(param)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeDLParam === param 
                          ? 'bg-blue-100 text-blue-800 font-medium' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {param.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </button>
                  ))
                )}
                {activeSection === 'generative_ai' && (
                  ['foundations', 'architectures', 'training_methods', 'applications', 'challenges'].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setActiveGenAITopic(topic)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeGenAITopic === topic 
                          ? 'bg-purple-100 text-purple-800 font-medium' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {topic.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </button>
                  ))
                )}
                {activeSection === 'machine_learning' && (
                  ['regularization', 'tree_depth', 'k_neighbors', 'kernel', 'clusters'].map(param => (
                    <button
                      key={param}
                      onClick={() => setActiveMLParam(param)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeMLParam === param 
                          ? 'bg-blue-100 text-blue-800 font-medium' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {param.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </button>
                  ))
                )}
                {activeSection === 'reinforcement_learning' && (
                  ['value_based', 'policy_based', 'model_based', 'multi_agent'].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setActiveRLTopic(topic)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeRLTopic === topic 
                          ? 'bg-green-100 text-green-800 font-medium' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {topic.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg"
            >
              <div className="border-b p-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {activeSection === 'introduction' && 'Introduction to Machine Learning Parameters'}
                  {activeSection === 'deep_learning' && activeDLParam.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  {activeSection === 'generative_ai' && activeGenAITopic.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  {activeSection === 'machine_learning' && activeMLParam.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  {activeSection === 'reinforcement_learning' && activeRLTopic.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  {activeSection === 'model_catalog' && 'Model Catalog'}
                </h2>
              </div>

              <div className="p-6">
                {activeSection === 'introduction' && (
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">
                        Welcome to the Machine Learning Hyperparameter Guide. This interactive resource helps you understand and optimize the key parameters that control machine learning model behavior and performance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">What are Hyperparameters?</h3>
                        <p className="text-blue-700">
                          Hyperparameters are configuration variables that control the learning process. Unlike model parameters, they are set before training begins and can significantly impact model performance.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">How to Use This Guide</h3>
                        <ul className="list-disc pl-5 text-green-700 space-y-2">
                          <li>Navigate through different sections using the top menu</li>
                          <li>Explore interactive visualizations</li>
                          <li>Find practical tips and recommendations</li>
                          <li>Access code examples and implementation details</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="text-sm text-yellow-700">
                        <strong>Getting Started:</strong> Begin with the Deep Learning section to understand fundamental parameters like learning rate and batch size, then explore more advanced topics.
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === 'model_catalog' && (
                  <div className="space-y-6">
                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-700">
                        Browse through our comprehensive collection of machine learning and deep learning models. Each model includes detailed information about hyperparameters, use cases, and optimization tips.
                      </p>
                    </div>

                    <ModelTable />
                  </div>
                )}

                {/* Existing content components with improved styling */}
                {activeSection === 'deep_learning' && activeDLParam === 'learning_rate' && (
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">
                        The learning rate controls how much to adjust the model weights during training. 
                        It's one of the most critical hyperparameters to tune.
                      </p>
                    </div>

                    {/* Visualization */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Visualization</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={learningRateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="rate" 
                              label={{ value: 'Learning Rate', position: 'insideBottom', offset: -5 }} 
                              scale="log"
                              domain={['dataMin', 'dataMax']}
                              tickFormatter={(value) => value.toString()}
                            />
                            <YAxis yAxisId="left" label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Accuracy', angle: 90, position: 'insideRight' }} />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#8884d8" name="Training Loss" />
                            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#82ca9d" name="Validation Accuracy" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-red-50 rounded-xl p-4">
                        <h4 className="font-medium text-red-800 mb-2">Too Small</h4>
                        <p className="text-sm text-red-600">
                          Training will be slow and may get stuck in local minima
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-medium text-green-800 mb-2">Optimal</h4>
                        <p className="text-sm text-green-600">
                          Fast convergence to global minimum
                        </p>
                      </div>
                      <div className="bg-yellow-50 rounded-xl p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Too Large</h4>
                        <p className="text-sm text-yellow-600">
                          Training may diverge or oscillate
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {activeSection === 'deep_learning' && activeDLParam === 'batch_size' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Batch Size</h3>
                    <p className="text-gray-700 mb-4">
                      Batch size determines how many training examples are processed before the model weights are updated. This hyperparameter affects both training stability and speed.
                    </p>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Considerations:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Small batch sizes provide more noise during training, which can help escape local minima</li>
                        <li>Large batch sizes give more stable and accurate gradient estimates</li>
                        <li>Batch size is limited by available GPU/TPU memory</li>
                        <li>Common values: 32, 64, 128, 256</li>
                      </ul>
                    </div>
                    <div className="h-64 mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={batchSizeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="size" 
                            label={{ value: 'Batch Size', position: 'insideBottom', offset: -5 }} 
                            scale="log"
                            domain={[8, 256]}
                            ticks={[8, 16, 32, 64, 128, 256]}
                          />
                          <YAxis yAxisId="left" label={{ value: 'Training Time (s)', angle: -90, position: 'insideLeft' }} />
                          <YAxis yAxisId="right" orientation="right" label={{ value: 'Memory Usage (GB)', angle: 90, position: 'insideRight' }} />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="trainingTime" stroke="#ff7300" name="Training Time" />
                          <Line yAxisId="right" type="monotone" dataKey="memoryUsage" stroke="#00bcd4" name="Memory Usage" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                {activeSection === 'deep_learning' && activeDLParam === 'epochs' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Number of Epochs</h3>
                    <p className="text-gray-700 mb-4">
                      An epoch represents one complete pass through the entire training dataset. The number of epochs defines how many times the learning algorithm will process the entire dataset.
                    </p>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Key Points:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Too few epochs: Underfitting (model hasnt learned enough)</li>
                        <li>Too many epochs: Overfitting (model memorizes training data)</li>
                        <li>Usually determined using early stopping with a validation set</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                      <p className="text-sm text-yellow-700">
                        <strong>Best Practice:</strong> Use early stopping with patience. Monitor validation loss and stop training when it stops improving for a specified number of epochs.
                      </p>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-800 mb-2">Code Example:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                        {`from tensorflow.keras.callbacks import EarlyStopping

early_stopping = EarlyStopping(
    monitor='val_loss',    # Metric to monitor
    patience=10,           # Number of epochs with no improvement
    restore_best_weights=True  # Restore weights from best epoch
)

model.fit(
    X_train, y_train,
    epochs=1000,           # Maximum number of epochs
    validation_data=(X_val, y_val),
    callbacks=[early_stopping]
)`}
                      </pre>
                    </div>
                  </div>
                )}
                {activeSection === 'deep_learning' && activeDLParam === 'optimizer' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimizer</h3>
                    <p className="text-gray-700 mb-4">
                      The optimizer determines how the network weights are updated based on the loss gradient. Different optimizers have different characteristics and may work better for specific problems.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white border rounded p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">SGD (Stochastic Gradient Descent)</h4>
                        <p className="text-sm text-gray-600 mb-2">The simplest optimizer that follows the gradient downhill.</p>
                        <ul className="text-xs text-gray-600 list-disc pl-4">
                          <li>Hyperparameters: learning rate, momentum, nesterov</li>
                          <li>Pros: Well understood, reliable convergence</li>
                          <li>Cons: Slow convergence, can get stuck</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white border rounded p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Adam</h4>
                        <p className="text-sm text-gray-600 mb-2">Adaptive optimizer with momentum. Often the default choice.</p>
                        <ul className="text-xs text-gray-600 list-disc pl-4">
                          <li>Hyperparameters: learning rate, beta1, beta2, epsilon</li>
                          <li>Pros: Fast convergence, adapts to problem</li>
                          <li>Cons: Can overfit on some problems</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white border rounded p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">RMSprop</h4>
                        <p className="text-sm text-gray-600 mb-2">Adaptive learning rate method.</p>
                        <ul className="text-xs text-gray-600 list-disc pl-4">
                          <li>Hyperparameters: learning rate, rho, epsilon</li>
                          <li>Pros: Good for RNNs, adapts per-parameter</li>
                          <li>Cons: May have higher variance</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white border rounded p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">AdamW</h4>
                        <p className="text-sm text-gray-600 mb-2">Adam with improved weight decay regularization.</p>
                        <ul className="text-xs text-gray-600 list-disc pl-4">
                          <li>Hyperparameters: learning rate, betas, weight_decay</li>
                          <li>Pros: Better generalization than Adam</li>
                          <li>Cons: Slightly more complex</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Recommendation:</strong> Start with Adam optimizer with a learning rate of 0.001. It works well for most deep learning tasks. For fine-tuning or when generalization is critical, consider AdamW.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'deep_learning' && activeDLParam === 'layers' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Network Architecture</h3>
                    <p className="text-gray-700 mb-4">
                      Network architecture defines the structure of the neural network: number of layers, units per layer, and connection patterns. These are critical hyperparameters that determine the models capacity and inductive bias.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Key Architectural Hyperparameters:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          <span className="font-medium">Number of layers</span>
                          <p className="text-sm mt-1">Deeper networks can learn more complex features but are harder to train. Typically: 1-3 layers for simple tasks, 10+ for complex tasks.</p>
                        </li>
                        <li>
                          <span className="font-medium">Units per layer</span>
                          <p className="text-sm mt-1">Controls capacity at each layer. More units can model more complex functions but risk overfitting.</p>
                        </li>
                        <li>
                          <span className="font-medium">Activation functions</span>
                          <p className="text-sm mt-1">ReLU is common for hidden layers, sigmoid/softmax for output layer depending on task.</p>
                        </li>
                        <li>
                          <span className="font-medium">Skip connections</span>
                          <p className="text-sm mt-1">Help gradient flow in deeper networks (as used in ResNet).</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-medium text-indigo-800 mb-2">Architecture Selection Strategy:</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-indigo-700">
                        <li>Start with established architectures for your problem domain</li>
                        <li>For custom networks, start simple and gradually increase complexity</li>
                        <li>Use cross-validation to compare different architectures</li>
                        <li>Consider computational constraints (memory, inference time)</li>
                      </ol>
                    </div>
                  </div>
                )}
                {activeSection === 'generative_ai' && activeGenAITopic === 'foundations' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Foundations of Generative AI</h3>
                    <p className="text-gray-700 mb-4">
                      Generative AI refers to artificial intelligence systems that can create new content, including text, images, music, and code. These systems learn patterns from existing data to generate novel outputs.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Key Concepts:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          <span className="font-medium">Latent Space</span>
                          <p className="text-sm mt-1">A compressed representation of data where similar items are close together. Generative models learn to navigate this space.</p>
                        </li>
                        <li>
                          <span className="font-medium">Distribution Learning</span>
                          <p className="text-sm mt-1">Models learn the probability distribution of training data to generate similar examples.</p>
                        </li>
                        <li>
                          <span className="font-medium">Conditional Generation</span>
                          <p className="text-sm mt-1">Generating content based on specific inputs or conditions (e.g., text-to-image generation).</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Types of Generative Models:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-purple-700">
                        <li>Generative Adversarial Networks (GANs)</li>
                        <li>Variational Autoencoders (VAEs)</li>
                        <li>Transformer-based Language Models</li>
                        <li>Diffusion Models</li>
                      </ul>
                    </div>
                  </div>
                )}
                {activeSection === 'generative_ai' && activeGenAITopic === 'architectures' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Neural Network Architectures</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white border rounded p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Transformer Architecture</h4>
                        <p className="text-sm text-gray-600 mb-2">The backbone of modern language models and many generative AI systems.</p>
                        <ul className="text-xs text-gray-600 list-disc pl-4">
                          <li>Self-attention mechanism</li>
                          <li>Parallel processing capability</li>
                          <li>Position embeddings</li>
                          <li>Examples: GPT, BERT, T5</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white border rounded p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Diffusion Models</h4>
                        <p className="text-sm text-gray-600 mb-2">State-of-the-art for image generation.</p>
                        <ul className="text-xs text-gray-600 list-disc pl-4">
                          <li>Gradual denoising process</li>
                          <li>U-Net architecture</li>
                          <li>Examples: DALL-E, Stable Diffusion</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Advanced Components:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          <span className="font-medium">Attention Mechanisms</span>
                          <p className="text-sm mt-1">Allows models to focus on relevant parts of the input, crucial for handling long-range dependencies.</p>
                        </li>
                        <li>
                          <span className="font-medium">Cross-Attention</span>
                          <p className="text-sm mt-1">Enables conditioning one modality on another (e.g., text conditioning for image generation).</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {activeSection === 'generative_ai' && activeGenAITopic === 'training_methods' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Training Methods</h3>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Advanced Training Techniques:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          <span className="font-medium">Adversarial Training (GANs)</span>
                          <p className="text-sm mt-1">Generator and discriminator networks compete to improve generation quality.</p>
                          <pre className="bg-gray-100 p-2 mt-1 rounded text-xs">
{`# Basic GAN training loop
for epoch in epochs:
    # Train Discriminator
    fake_images = generator(noise)
    disc_loss = discriminator.train(real_images, fake_images)
    
    # Train Generator
    gen_loss = generator.train(discriminator)`}
                          </pre>
                        </li>
                        <li>
                          <span className="font-medium">Diffusion Training</span>
                          <p className="text-sm mt-1">Models learn to reverse a gradual noising process.</p>
                        </li>
                        <li>
                          <span className="font-medium">Self-Supervised Learning</span>
                          <p className="text-sm mt-1">Learning from unlabeled data through clever task design.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Best Practices:</strong>
                        <ul className="list-disc pl-4 mt-2">
                          <li>Use gradient accumulation for large models</li>
                          <li>Implement mixed-precision training</li>
                          <li>Consider curriculum learning</li>
                          <li>Monitor for mode collapse in GANs</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'machine_learning' && activeMLParam === 'regularization' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Regularization Parameters</h3>
                    <p className="text-gray-700 mb-4">
                      Regularization helps prevent overfitting by adding a penalty on the complexity of the model. The strength of this penalty is controlled by regularization hyperparameters.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">L1 Regularization (Lasso)</h4>
                        <p className="text-sm text-gray-600 mb-2">Adds a penalty proportional to the absolute value of weights.</p>
                        <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                          <li>Promotes sparsity (feature selection)</li>
                          <li>Creates models with fewer features</li>
                          <li>Hyperparameter: alpha (λ)</li>
                          <li>Common values: 0.01, 0.1, 1.0</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">L2 Regularization (Ridge)</h4>
                        <p className="text-sm text-gray-600 mb-2">Adds a penalty proportional to the square of weights.</p>
                        <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                          <li>Shrinks weights toward zero</li>
                          <li>Works well when all features are useful</li>
                          <li>Hyperparameter: lambda (λ)</li>
                          <li>Common values: 0.001, 0.01, 0.1</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Elastic Net</h4>
                      <p className="text-gray-700">
                        Combines L1 and L2 regularization, getting the best of both worlds. Has two hyperparameters:
                      </p>
                      <ul className="text-sm text-gray-600 list-disc pl-4 mt-2">
                        <li>alpha: Overall regularization strength</li>
                        <li>l1_ratio: Balance between L1 and L2 (0 = pure L2, 1 = pure L1)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="text-sm text-green-700">
                        <strong>Tuning Tip:</strong> Start with a small regularization strength and increase it gradually while monitoring validation performance. Use cross-validation to find the optimal value.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'machine_learning' && activeMLParam === 'tree_depth' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Tree Depth and Related Parameters</h3>
                    <p className="text-gray-700 mb-4">
                      Decision trees, random forests, and gradient boosting machines all have hyperparameters that control tree complexity. These are crucial for preventing overfitting.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Key Tree Hyperparameters:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          <span className="font-medium">max_depth</span>
                          <p className="text-sm mt-1">Maximum depth of the tree. Smaller values prevent overfitting.</p>
                          <p className="text-xs text-gray-500">Common values: 3-10 for boosting, 10-30 for random forests</p>
                        </li>
                        <li>
                          <span className="font-medium">min_samples_split</span>
                          <p className="text-sm mt-1">Minimum samples required to split an internal node.</p>
                          <p className="text-xs text-gray-500">Common values: 2-20</p>
                        </li>
                        <li>
                          <span className="font-medium">min_samples_leaf</span>
                          <p className="text-sm mt-1">Minimum samples required in a leaf node.</p>
                          <p className="text-xs text-gray-500">Common values: 1-10</p>
                        </li>
                        <li>
                          <span className="font-medium">max_features</span>
                          <p className="text-sm mt-1">Number of features to consider when looking for the best split.</p>
                          <p className="text-xs text-gray-500">Common values: sqrt, log2, or fraction of features</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Impact of Tree Depth:</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Shallow trees: Higher bias, lower variance (may underfit)</li>
                        <li>Deep trees: Lower bias, higher variance (may overfit)</li>
                        <li>Ensemble methods (random forests, boosting) can use deeper trees</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="text-sm text-yellow-700">
                        <strong>Best Practice:</strong> For gradient boosting, use shallower trees (3-8 levels) and more of them. For random forests, deeper trees often work better (10-20 levels).
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'machine_learning' && activeMLParam === 'k_neighbors' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">k in k-Nearest Neighbors</h3>
                    <p className="text-gray-700 mb-4">
                      In k-Nearest Neighbors (k-NN) algorithms, the value of k determines how many neighbors influence the classification or regression result.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">How k Affects the Model:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-red-50 p-3 rounded">
                          <h5 className="font-medium text-red-800 mb-1">Small k (e.g., k=1 or k=3)</h5>
                          <ul className="text-xs text-red-700 list-disc pl-4">
                            <li>More flexible decision boundary</li>
                            <li>Captures local patterns</li>
                            <li>Higher variance (may overfit)</li>
                            <li>More sensitive to outliers</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-medium text-blue-800 mb-1">Medium k (e.g., k=10 or k=20)</h5>
                          <ul className="text-xs text-blue-700 list-disc pl-4">
                            <li>Balanced decision boundary</li>
                            <li>Good for most datasets</li>
                            <li>Moderate variance/bias trade-off</li>
                            <li>Starting point for tuning</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded">
                          <h5 className="font-medium text-green-800 mb-1">Large k (e.g., k=50 or more)</h5>
                          <ul className="text-xs text-green-700 list-disc pl-4">
                            <li>Smoother decision boundary</li>
                            <li>Reduces variance but increases bias</li>
                            <li>Less sensitive to noise</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeSection === 'machine_learning' && activeMLParam === 'kernel' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Kernel &amp; Kernel Parameters</h3>
                    <p className="text-gray-700 mb-4">
                      Kernel methods enable non-linear classification by implicitly mapping inputs into high-dimensional feature spaces. Common kernel choices include linear, polynomial, and RBF (Gaussian) kernels.
                    </p>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Common Kernels:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>
                          <strong>Linear Kernel:</strong> Suitable for linearly separable data.
                        </li>
                        <li>
                          <strong>Polynomial Kernel:</strong> Captures interactions up to a specified degree.
                        </li>
                        <li>
                          <strong>RBF Kernel:</strong> Maps data into infinite-dimensional space, effective for non-linear separation.
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Tip:</strong> Always normalize or scale your data when using kernel methods to improve performance.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'machine_learning' && activeMLParam === 'clusters' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Number of Clusters</h3>
                    <p className="text-gray-700 mb-4">
                      In clustering algorithms like K-Means, the number of clusters (k) is a crucial hyperparameter that defines how the data will be partitioned. Choosing the right number of clusters is essential for meaningful results.
                    </p>
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Determining k:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>
                          <strong>Elbow Method:</strong> Plot the explained variance as a function of k and look for a bend in the curve.
                        </li>
                        <li>
                          <strong>Silhouette Score:</strong> Measures how similar an object is to its own cluster compared to other clusters.
                        </li>
                        <li>
                          <strong>Domain Knowledge:</strong> Leverage prior knowledge about the data to select a meaningful number of clusters.
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="text-sm text-green-700">
                        <strong>Note:</strong> There is no one-size-fits-all value for k. Experiment with different values and validate with your specific use case.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'reinforcement_learning' && activeRLTopic === 'value_based' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Value-Based Methods</h3>
                    <p className="text-gray-700 mb-4">
                      Value-based methods learn to estimate the value (expected future reward) of states or actions. 
                      These methods are fundamental to many RL algorithms.
                    </p>

                    {rlInformation[0].algorithms.map((algo, index) => (
                      <div key={index} className="mb-6 border-b pb-6">
                        <h4 className="font-medium text-gray-800 mb-2">{algo.name}</h4>
                        <p className="text-gray-600 mb-3">{algo.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-gray-700 mb-2">Key Parameters:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {algo.key_parameters.map((param, idx) => (
                              <div key={idx} className="bg-white p-3 rounded shadow-sm">
                                <span className="font-medium text-green-700">{param.name}</span>
                                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Typical: {param.typical_values}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {algo.use_cases.map((use, idx) => (
                            <span key={idx} className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Implementation Tip:</strong> Start with simpler environments and gradually increase complexity. 
                        Use experience replay to improve sample efficiency and stability.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'reinforcement_learning' && activeRLTopic === 'policy_based' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Policy-Based Methods</h3>
                    <p className="text-gray-700 mb-4">
                      Policy-based methods learn the optimal policy directly without estimating the value function.
                      These methods are often used in continuous control tasks.
                    </p>

                    {rlInformation[1].algorithms.map((algo, index) => (
                      <div key={index} className="mb-6 border-b pb-6">
                        <h4 className="font-medium text-gray-800 mb-2">{algo.name}</h4>
                        <p className="text-gray-600 mb-3">{algo.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-gray-700 mb-2">Key Parameters:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {algo.key_parameters.map((param, idx) => (
                              <div key={idx} className="bg-white p-3 rounded shadow-sm">
                                <span className="font-medium text-green-700">{param.name}</span>
                                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Typical: {param.typical_values}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Implementation Tip:</strong> For continuous control tasks, consider using Trust Region Policy Optimization (TRPO) or Proximal Policy Optimization (PPO).
                      </p>
                    </div>
                  </div>
                )}
                {activeSection === 'reinforcement_learning' && activeRLTopic === 'model_based' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Model-Based Methods</h3>
                    <p className="text-gray-700 mb-4">
                      Model-based RL methods learn a model of the environment's dynamics to enable planning and more efficient learning.
                      These methods often achieve better sample efficiency than model-free approaches.
                    </p>

                    {rlInformation[2].algorithms.map((algo, index) => (
                      <div key={index} className="mb-6 border-b pb-6">
                        <h4 className="font-medium text-gray-800 mb-2">{algo.name}</h4>
                        <p className="text-gray-600 mb-3">{algo.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-gray-700 mb-2">Key Parameters:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {algo.key_parameters.map((param, idx) => (
                              <div key={idx} className="bg-white p-3 rounded shadow-sm">
                                <span className="font-medium text-green-700">{param.name}</span>
                                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Typical: {param.typical_values}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add training visualization */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Training Progress</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trainingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="episode" label={{ value: 'Episode', position: 'insideBottom', offset: -5 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="reward" stroke="#82ca9d" name="Average Reward" />
                            <Line type="monotone" dataKey="value_loss" stroke="#8884d8" name="Value Loss" />
                            <Line type="monotone" dataKey="policy_loss" stroke="#ffc658" name="Policy Loss" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Add implementation example */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-2">Implementation Example</h4>
                      <RLCodeExamples algorithm="dqn" />
                    </div>
                  </div>
                )}
                {activeSection === 'reinforcement_learning' && activeRLTopic === 'multi_agent' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Multi-Agent Methods</h3>
                    <p className="text-gray-700 mb-4">
                      Multi-agent RL methods handle interactions between multiple learning agents.
                      These methods are often used in scenarios with complex environments or multiple objectives.
                    </p>

                    {rlInformation[3].algorithms.map((algo, index) => (
                      <div key={index} className="mb-6 border-b pb-6">
                        <h4 className="font-medium text-gray-800 mb-2">{algo.name}</h4>
                        <p className="text-gray-600 mb-3">{algo.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-gray-700 mb-2">Key Parameters:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {algo.key_parameters.map((param, idx) => (
                              <div key={idx} className="bg-white p-3 rounded shadow-sm">
                                <span className="font-medium text-green-700">{param.name}</span>
                                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Typical: {param.typical_values}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Implementation Tip:</strong> For multi-agent scenarios, consider using decentralized execution with centralized training (MADDPG) or value factorization (QMIX).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HyperparameterTutorial;
