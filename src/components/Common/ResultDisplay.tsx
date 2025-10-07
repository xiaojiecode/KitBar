import React from 'react';

interface ResultDisplayProps {
  label: string;
  value: string;
  placeholder?: string;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  value,
  placeholder = '等待处理...',
  className = ''
}) => {
  return (
    <div className={`mb-6 space-y-2 animate-fade-in-up-delay-300 ${className}`}>
      <label className="block text-sm font-medium text-text-secondary dark:text-text-muted">{label}</label>
      <div 
        className="w-full p-4 bg-input dark:bg-input-dark border border-border dark:border-border-dark rounded-lg text-text-primary dark:text-text-light h-32 overflow-auto transition-all duration-300 ease-in-out"
      >
        {value || placeholder}
      </div>
    </div>
  );
};

export default ResultDisplay;