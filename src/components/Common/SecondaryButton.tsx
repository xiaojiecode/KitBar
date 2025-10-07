import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      className={`px-6 py-3 bg-secondary hover:bg-secondary/90 rounded-lg text-white font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;