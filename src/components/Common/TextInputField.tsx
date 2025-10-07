import React from 'react';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  className?: string;
  rows?: number;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className = '',
  rows = 8 // 默认8行高度，约等于h-32
}) => {
  return (
    <div className={`mb-6 space-y-2 animate-fade-in-up-delay-100 ${className}`}>
      <label className="block text-sm font-medium text-text-secondary dark:text-text-muted">{label}</label>
      <textarea
        rows={rows}
        className="w-full p-4 bg-input dark:bg-input-dark border border-border dark:border-border-dark rounded-lg text-text-primary dark:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-in-out focus:shadow-flat-md"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInputField;