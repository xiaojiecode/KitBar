import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      className={`px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-white font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 animate-fade-in-up-delay-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;