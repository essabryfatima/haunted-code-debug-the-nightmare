
import React, { useState, useCallback } from 'react';
import { generateGeminiResponse } from '../services/geminiService';

interface HintDisplayProps {
  hintPrompt: string;
}

const HintDisplay: React.FC<HintDisplayProps> = ({ hintPrompt }) => {
  const [hint, setHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getHint = useCallback(async () => {
    setIsLoading(true);
    const generatedHint = await generateGeminiResponse(hintPrompt);
    setHint(generatedHint);
    setIsLoading(false);
  }, [hintPrompt]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button 
        onClick={getHint} 
        disabled={isLoading || !!hint}
        className="px-4 py-2 border border-yellow-500/50 text-yellow-400 rounded-md hover:bg-yellow-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? 'Whispering...' : 'Ask for a Hint'}
      </button>
      {hint && <p className="text-sm text-yellow-300 text-center italic mt-2 p-2 bg-yellow-900/20 rounded-md">"{hint}"</p>}
    </div>
  );
};

export default HintDisplay;
