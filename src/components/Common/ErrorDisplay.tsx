import React from 'react';

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, className = '' }) => {
  return (
    <div className={`mb-6 p-4 bg-danger/10 dark:bg-danger/20 border border-danger/20 dark:border-danger/30 rounded-lg text-danger animate-fade-in-down animate-pulse-slow ${className}`}>
      {message}
    </div>
  );
};

export default ErrorDisplay;