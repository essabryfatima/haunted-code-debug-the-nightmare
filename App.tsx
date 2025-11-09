
import React, { useState, useCallback } from 'react';
import { GameState } from './types';
import { LEVELS } from './gameData';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { generateGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [outroText, setOutroText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startGame = useCallback(() => {
    setCurrentLevelIndex(0);
    setGameState(GameState.PLAYING);
  }, []);

  const advanceLevel = useCallback(async () => {
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < LEVELS.length) {
      setGameState(GameState.LEVEL_TRANSITION);
      // Short delay to show transition
      setTimeout(() => {
          setCurrentLevelIndex(nextLevelIndex);
          setGameState(GameState.PLAYING);
      }, 2000);
    } else {
      setIsLoading(true);
      setGameState(GameState.END);
      const finalPrompt = LEVELS[currentLevelIndex].successPrompt;
      const generatedOutro = await generateGeminiResponse(finalPrompt);
      setOutroText(generatedOutro);
      setIsLoading(false);
    }
  }, [currentLevelIndex]);

  const restartGame = useCallback(() => {
      setOutroText('');
      setGameState(GameState.START);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.START:
        return <StartScreen onStart={startGame} />;
      case GameState.PLAYING:
        return <GameScreen key={currentLevelIndex} level={LEVELS[currentLevelIndex]} onComplete={advanceLevel} />;
      case GameState.LEVEL_TRANSITION:
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black">
                <div className="text-cyan-400 text-2xl animate-pulse">DOOR UNLOCKED... DESCENDING DEEPER...</div>
            </div>
        );
      case GameState.END:
        return <EndScreen outroText={outroText} onRestart={restartGame} isLoading={isLoading} />;
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(31,41,55,0.7),rgba(17,24,39,0))] font-mono text-gray-300">
      {renderContent()}
    </div>
  );
};

export default App;
