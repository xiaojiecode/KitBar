import React, { useState } from 'react';
import { base58Decode } from '../../utils/base58';
import ToolPage from '../Common/ToolPage';
import TextInputField from '../Common/TextInputField';
import PrimaryButton from '../Common/PrimaryButton';
import ErrorDisplay from '../Common/ErrorDisplay';
import ResultDisplay from '../Common/ResultDisplay';

const Base58DecodePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);
    try {
      const decoded = base58Decode(input);
      setOutput(decoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : '解码失败，输入可能不是有效的Base58编码');
      setOutput('');
    }
  };

  return (
    <ToolPage title="Base58 解码">
      <TextInputField
        label="输入Base58编码"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入要解码的Base58编码..."
      />

      <div className="mb-6">
        <PrimaryButton onClick={handleDecode}>
          解码
        </PrimaryButton>
      </div>

      {error && <ErrorDisplay message={error} />}

      <ResultDisplay
        label="解码结果"
        value={output}
        placeholder="等待解码..."
      />
    </ToolPage>
  );
};

export default Base58DecodePage;