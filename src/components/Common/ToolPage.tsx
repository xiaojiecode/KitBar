import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowType } from '../../App';

interface ToolPageProps {
  title: string;
  children: React.ReactNode;
}

const ToolPage: React.FC<ToolPageProps> = ({ title, children }) => {
  const navigate = useNavigate();
  const { isToolWindow } = useWindowType();
  const [isVisible, setIsVisible] = useState(false);

  // 当组件挂载时触发动画
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen w-full bg-background dark:bg-background-dark overflow-y-auto`}>
      <div className={`w-full p-4 sm:p-6 lg:p-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-card-dark rounded-lg shadow-flat p-4 sm:p-6 transition-all duration-300">
            <div className="flex items-center mb-6">
              {!isToolWindow && (
                <button
                  className="mr-4 p-2 bg-input dark:bg-input-dark rounded-full transition-all duration-300 ease-in-out text-text-primary dark:text-text-light hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 hover:rotate-6"
                  onClick={handleBack}
                  aria-label="返回"
                >
                  ←
                </button>
              )}
              <h1 className="text-2xl font-bold text-text-primary dark:text-text-light animate-fade-in-down">{title}</h1>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;