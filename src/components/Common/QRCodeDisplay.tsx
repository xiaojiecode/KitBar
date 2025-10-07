import React from 'react';
import SecondaryButton from './SecondaryButton';

interface QRCodeDisplayProps {
  qrCodeData: string;
  onDownload: () => void;
  className?: string;
  downloadText?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCodeData,
  onDownload,
  className = '',
  downloadText = '下载二维码'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-input dark:bg-input-dark rounded-lg mb-6 border border-border dark:border-border-dark animate-fade-in animate-scale-in ${className}`}>
      <div className="bg-white p-6 rounded-lg mb-6 dark:bg-gray-700 shadow-flat">
        {/* 实际应用中这里应该是一个真实的二维码图片 */}
        <div className="w-64 h-64 bg-white dark:bg-gray-700 flex items-center justify-center border border-border dark:border-border-dark animate-spring">
          <span className="text-gray-600 dark:text-gray-400 text-sm">二维码图片 ({qrCodeData})</span>
        </div>
      </div>
      <SecondaryButton onClick={onDownload}>
        {downloadText}
      </SecondaryButton>
    </div>
  );
};

export default QRCodeDisplay;