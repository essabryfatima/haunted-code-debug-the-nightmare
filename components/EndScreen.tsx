
import React from 'react';
import { SkullIcon } from './icons/SkullIcon';
import StoryDisplay from './StoryDisplay';

interface EndScreenProps {
  outroText: string;
  onRestart: () => void;
  isLoading: boolean;
}

const EndScreen: React.FC<EndScreenProps> = ({ outroText, onRestart, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="relative z-10 space-y-8 max-w-3xl">
        <div className="text-red-500">
          <SkullIcon className="w-24 h-24 mx-auto animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 tracking-wider">
          You Escaped... ?
        </h1>
        
        <div className="text-left text-lg md:text-xl text-gray-300 leading-relaxed bg-gray-800/50 p-6 rounded-md border border-gray-700">
            <StoryDisplay text={outroText} isLoading={isLoading} />
        </div>

        {!isLoading && (
            <button
            onClick={onRestart}
            className="px-8 py-4 bg-gray-700 text-cyan-300 font-bold text-xl rounded-md hover:bg-gray-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
            Return to the Nightmare
            </button>
        )}
      </div>
    </div>
  );
};

export default EndScreen;
