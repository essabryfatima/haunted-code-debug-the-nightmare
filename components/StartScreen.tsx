
import React from 'react';
import { GhostIcon } from './icons/GhostIcon';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10 space-y-8">
        <div className="text-cyan-400 animate-pulse">
          <GhostIcon className="w-24 h-24 mx-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-red-500 tracking-wider">
          Haunted Code
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
          You are a programmer trapped in a machine haunted by buggy code. To escape, you must debug the nightmare. Each fix brings you closer to freedom... or deeper into the madness.
        </p>
        <button
          onClick={onStart}
          className="px-8 py-4 bg-cyan-500 text-gray-900 font-bold text-xl rounded-md shadow-[0_0_15px_rgba(6,182,212,0.8)] hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,1)] transition-all duration-300 transform hover:scale-105"
        >
          Enter the Nightmare
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
