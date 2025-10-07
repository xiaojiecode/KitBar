import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowType } from '../../App';

const QRCodeDecodePage: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { isToolWindow } = useWindowType();

  const handleDecode = () => {
    // 这里是二维码解码的模拟实现
    // 实际应用中应该使用真正的二维码解码库
    setOutput('Decoded content: ' + input);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        {!isToolWindow && (
          <button
            className="mr-4 p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-800 dark:text-gray-200"
            onClick={handleBack}
            aria-label="返回"
          >
            ←
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">二维码解码</h1>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-lg text-white font-medium transition-colors mb-4">
            选择二维码图片
          </button>
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm">二维码预览区域</span>
          </div>
        </div>
        
        <div className="mb-6">
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            onClick={handleDecode}
          >
            解码
          </button>
        </div>

        {output && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">解码结果</label>
            <div 
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 h-32 overflow-auto"
            >
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeDecodePage;