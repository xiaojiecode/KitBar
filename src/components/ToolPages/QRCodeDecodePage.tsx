import React, { useState } from 'react';
import { decodeQRCode } from '../../utils/qrcode';
import ToolPage from '../Common/ToolPage';
import PrimaryButton from '../Common/PrimaryButton';
import ErrorDisplay from '../Common/ErrorDisplay';
import ResultDisplay from '../Common/ResultDisplay';
import ImageSelector from '../Common/ImageSelector';

const QRCodeDecodePage: React.FC = () => {
  const [hasSelectedImage, setHasSelectedImage] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSelectImage = () => {
    // 模拟选择图片
    setHasSelectedImage(true);
    setError(null);
    setDecodedText('');
  };

  const handleDecode = () => {
    setError(null);
    try {
      // 模拟解码
      const decoded = decodeQRCode('QR_CODE_IMAGE_DATA');
      setDecodedText(decoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : '解码失败');
    }
  };

  return (
    <ToolPage title="二维码解码">
      <ImageSelector
        hasSelected={hasSelectedImage}
        onSelectClick={handleSelectImage}
        buttonText="选择二维码图片"
      />

      <div className="mb-6">
        <PrimaryButton 
          onClick={handleDecode}
          disabled={!hasSelectedImage}
        >
          解码
        </PrimaryButton>
      </div>

      {error && <ErrorDisplay message={error} />}

      {decodedText && (
        <ResultDisplay
          label="解码结果"
          value={decodedText}
        />
      )}
    </ToolPage>
  );
};

export default QRCodeDecodePage;