
import React, { useState, useEffect, useCallback } from 'react';
import type { Level, PuzzleOption } from '../types';
import { generateGeminiResponse } from '../services/geminiService';
import StoryDisplay from './StoryDisplay';
import CodeBlock from './CodeBlock';
import HintDisplay from './HintDisplay';
import { CodeIcon } from './icons/CodeIcon';

interface GameScreenProps {
  level: Level;
  onComplete: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onComplete }) => {
  const [story, setStory] = useState('');
  const [isLoadingStory, setIsLoadingStory] = useState(true);
  const [selectedOption, setSelectedOption] = useState<PuzzleOption | null>(null);
  const [feedback, setFeedback] = useState('');

  const fetchStory = useCallback(async () => {
    setIsLoadingStory(true);
    const generatedStory = await generateGeminiResponse(level.storyPrompt);
    setStory(generatedStory);
    setIsLoadingStory(false);
  }, [level.storyPrompt]);

  useEffect(() => {
    fetchStory();
    setSelectedOption(null);
    setFeedback('');
  }, [level, fetchStory]);

  const handleOptionSelect = (option: PuzzleOption) => {
    if (feedback) return; // Don't allow changing answer after submission
    setSelectedOption(option);
  };
  
  const handleSubmit = async () => {
    if (!selectedOption) {
      setFeedback('You must choose a path...');
      return;
    }

    if (selectedOption.isCorrect) {
      setFeedback('Correct. The entity has been appeased... for now.');
      const successText = await generateGeminiResponse(level.successPrompt);
      setStory(prev => prev + "\n\n" + successText);
      setTimeout(() => {
        onComplete();
      }, 5000); // Wait for user to read success message
    } else {
      setFeedback('Incorrect. The machine groans in protest. Try again.');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen flex flex-col justify-center">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg shadow-lg shadow-cyan-500/10 p-6 space-y-6">
        <header className="flex items-center justify-between border-b border-gray-700 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-red-500">{level.title}</h1>
          <CodeIcon className="w-8 h-8 text-cyan-400" />
        </header>
        
        <section>
          <StoryDisplay text={story} isLoading={isLoadingStory} />
        </section>

        <section>
          <CodeBlock code={level.code} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg text-cyan-400">Choose the fix:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {level.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                disabled={!!feedback}
                className={`p-3 text-left border-2 rounded-md transition-all duration-200 w-full ${
                  selectedOption?.id === option.id 
                  ? 'bg-cyan-500/30 border-cyan-400' 
                  : 'bg-gray-900/50 border-gray-700 hover:border-cyan-500'
                } ${feedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <pre><code className="text-sm">{option.text}</code></pre>
              </button>
            ))}
          </div>
        </section>
        
        <footer className="pt-4 flex flex-col md:flex-row items-center gap-4">
          <button 
            onClick={handleSubmit} 
            disabled={!selectedOption || !!feedback}
            className="w-full md:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-md shadow-[0_0_10px_rgba(220,38,38,0.7)] hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300"
          >
            Apply Fix
          </button>
          <div className="flex-grow text-center md:text-left">
            {feedback && <p className={`text-lg ${selectedOption?.isCorrect ? 'text-green-400' : 'text-yellow-400'} animate-pulse`}>{feedback}</p>}
          </div>
          <HintDisplay hintPrompt={level.hintPrompt} />
        </footer>
      </div>
    </div>
  );
};

export default GameScreen;
