'use client';

import { useState } from 'react';

export const Tabs = ({ children, className = '', defaultValue }: { children: React.ReactNode, className?: string, defaultValue: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return <div className={className}>{childrenWithProps}</div>;
};

export const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-b border-gray-200 mb-4">{children}</div>
);

export const TabsTrigger = ({ children, value, activeTab, setActiveTab }: { 
  children: React.ReactNode, 
  value: string,
  activeTab?: string,
  setActiveTab?: (value: string) => void 
}) => (
  <button 
    className={`px-4 py-2 ${activeTab === value ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeTab }: { 
  children: React.ReactNode, 
  value: string,
  activeTab?: string 
}) => (
  activeTab === value ? <div>{children}</div> : null
); 