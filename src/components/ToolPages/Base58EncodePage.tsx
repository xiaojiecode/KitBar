import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowType } from '../../App';

const Base58EncodePage: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { isToolWindow } = useWindowType();

  const handleEncode = () => {
    // 这里是Base58编码的模拟实现
    // 实际应用中应该使用真正的Base58编码库
    setOutput('Encoded: ' + input);
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Base58 编码</h1>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">输入文本</label>
        <textarea
          className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 h-32"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要编码的文本..."
        />
      </div>

      <div className="mb-6">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          onClick={handleEncode}
        >
          编码
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">编码结果</label>
        <div 
          className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 h-32 overflow-auto"
        >
          {output || '等待编码...'}
        </div>
      </div>
    </div>
  );
};

export default Base58EncodePage;