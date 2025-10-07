import React from 'react';

interface ImageSelectorProps {
  hasSelected: boolean;
  onSelectClick: () => void;
  className?: string;
  buttonText?: string;
  emptyText?: string;
  selectedText?: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  hasSelected,
  onSelectClick,
  className = '',
  buttonText = '选择图片',
  emptyText = '预览区域',
  selectedText = '已选择'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-input dark:bg-input-dark border border-border dark:border-border-dark rounded-lg mb-6 transition-all duration-300 ease-in-out hover:shadow-flat-md ${className}`}>
      <button 
        className="px-4 py-3 bg-secondary hover:bg-secondary/90 rounded-lg text-white font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 mb-4"
        onClick={onSelectClick}
      >
        {buttonText}
      </button>
      <div className="w-64 h-64 bg-white dark:bg-gray-700 flex items-center justify-center border border-border dark:border-border-dark rounded-lg transition-all duration-500 ease-out animate-spring">
        {hasSelected ? (
          <span className="text-text-primary dark:text-text-light text-sm">{selectedText}</span>
        ) : (
          <span className="text-text-secondary dark:text-text-muted text-sm">{emptyText}</span>
        )}
      </div>
    </div>
  );
};

export default ImageSelector;