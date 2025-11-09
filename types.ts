
export enum GameState {
  START,
  PLAYING,
  LEVEL_TRANSITION,
  END,
}

export interface PuzzleOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Level {
  id: number;
  title: string;
  storyPrompt: string;
  code: string;
  options: PuzzleOption[];
  hintPrompt: string;
  successPrompt: string;
}
