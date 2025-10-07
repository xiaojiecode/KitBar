import React, { useState } from 'react';
import { base58Encode } from '../../utils/base58';
import ToolPage from '../Common/ToolPage';
import TextInputField from '../Common/TextInputField';
import PrimaryButton from '../Common/PrimaryButton';
import ErrorDisplay from '../Common/ErrorDisplay';
import ResultDisplay from '../Common/ResultDisplay';

const Base58EncodePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    setError(null);
    try {
      const encoded = base58Encode(input);
      setOutput(encoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : '编码失败');
      setOutput('');
    }
  };

  return (
    <ToolPage title="Base58 编码">
      <TextInputField
        label="输入文本"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入要编码的文本..."
      />

      <div className="mb-6">
        <PrimaryButton onClick={handleEncode}>
          编码
        </PrimaryButton>
      </div>

      {error && <ErrorDisplay message={error} />}

      <ResultDisplay
        label="编码结果"
        value={output}
        placeholder="等待编码..."
      />
    </ToolPage>
  );
};

export default Base58EncodePage;
