import React, { useState } from 'react';
import { generateQRCode } from '../../utils/qrcode';
import ToolPage from '../Common/ToolPage';
import TextInputField from '../Common/TextInputField';
import PrimaryButton from '../Common/PrimaryButton';
import ErrorDisplay from '../Common/ErrorDisplay';
import QRCodeDisplay from '../Common/QRCodeDisplay';

const QRCodeEncodePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    setError(null);
    if (!input.trim()) {
      setError('请输入要生成二维码的内容');
      return;
    }
    try {
      const qrCode = generateQRCode({ text: input });
      setQrCodeData(qrCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成二维码失败');
    }
  };

  const handleDownload = () => {
    // 实际应用中这里应该有下载二维码的逻辑
    console.log('下载二维码:', qrCodeData);
  };

  return (
    <ToolPage title="生成二维码">
      <TextInputField
        label="输入内容"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入要生成二维码的内容..."
      />

      <div className="mb-6">
        <PrimaryButton onClick={handleGenerate}>
          生成
        </PrimaryButton>
      </div>

      {error && <ErrorDisplay message={error} />}

      {qrCodeData && (
        <QRCodeDisplay
          qrCodeData={qrCodeData}
          onDownload={handleDownload}
        />
      )}
    </ToolPage>
  );
};

export default QRCodeEncodePage;