
import React, { useState, useEffect } from 'react';

interface StoryDisplayProps {
  text: string;
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ text, isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isLoading && text) {
      setDisplayedText(''); // Reset on new text
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
        }
      }, 20); // Typewriter speed

      return () => clearInterval(interval);
    }
  }, [text, isLoading]);

  if (isLoading) {
    return <p className="text-lg text-gray-400 animate-pulse">Awaiting transmission from the other side...</p>;
  }

  return <p className="text-lg text-gray-300 whitespace-pre-line leading-relaxed">{displayedText}<span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1"></span></p>;
};

export default StoryDisplay;
