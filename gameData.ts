
import type { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "The Whispering Loop",
    storyPrompt: "You are a master storyteller of digital horror. Write a short, chilling paragraph (3-4 sentences) about a programmer waking up trapped in a haunted machine. The first challenge is an infinite loop that echoes like a ghost's whisper. The function is called `endlessWhisper`. The air grows colder with each repetition.",
    code: `function endlessWhisper(spirits) {
  let i = 0;
  while (i < spirits.length) {
    console.log("...help me...");
    
    // The loop never ends... a soul is trapped.
    // FIX THE CURSE HERE
  }
  console.log("The whispering stops.");
}`,
    options: [
      { id: 1, text: "i++;", isCorrect: true },
      { id: 2, text: "i--;", isCorrect: false },
      { id: 3, text: "continue;", isCorrect: false },
    ],
    hintPrompt: "You are a cryptic guide in a haunted game. The player is stuck on this JavaScript code: `function endlessWhisper(spirits) { let i = 0; while (i < spirits.length) { console.log('...'); } }`. The goal is to stop the infinite 'while' loop. Provide a short, one-sentence hint that points them to the missing piece of logic for loop progression. Make it sound spooky.",
    successPrompt: "The player just fixed an infinite loop. Write a short, triumphant but still scary paragraph about how stopping the endless whispers caused a ghostly shriek to fade, and a previously locked digital door creaks open, revealing a darker, more complex corridor of the haunted machine."
  },
  {
    id: 2,
    title: "The Call Stack Abyss",
    storyPrompt: "You are a master storyteller of digital horror. The player has entered a new room. Describe a recursive function, `descendIntoMadness`, that's calling itself endlessly, pulling the system's memory into a deep, dark abyss. The walls of this room are glitching, threatening to collapse the very reality of the machine.",
    code: `function descendIntoMadness(depth) {
  console.log("Deeper... deeper... at depth " + depth);
  
  // The descent must have an end.
  // ADD THE BASE CASE
  
  descendIntoMadness(depth + 1);
}

descendIntoMadness(0);`,
    options: [
      { id: 1, text: "if (depth > 10) { return; }", isCorrect: true },
      { id: 2, text: "if (depth < 0) { continue; }", isCorrect: false },
      { id: 3, text: "let depth = 0;", isCorrect: false },
    ],
    hintPrompt: "You are a cryptic guide in a haunted game. The player is stuck on this recursive JavaScript function: `function descendIntoMadness(depth) { console.log('...'); descendIntoMadness(depth + 1); }`. The goal is to prevent a stack overflow. Provide a short, one-sentence hint about what every recursive function needs to eventually stop. Make it sound ominous.",
    successPrompt: "The player just fixed a runaway recursion. Write a short, chilling paragraph describing how the glitching walls stabilized, and the deafening roar of the 'call stack abyss' silenced into a hum. A new path flickers into existence on a previously blank monitor."
  },
  {
    id: 3,
    title: "The Phantom Variable",
    storyPrompt: "You are a master storyteller of digital horror. The player is in the final chamber. A critical function, `unlockFinalDoor`, is failing silently. A 'phantom' variable is haunting the code, its value null when it should be an object. This is the final lock. The air is electric with anticipation and dread.",
    code: `function unlockFinalDoor(key) {
  // The key is null... a ghost in the machine.
  // It should be a real object to work.
  const lock = key.getLockId(); // ERROR: Cannot read properties of null
  
  if (lock === "ESCAPE") {
    console.log("You are free.");
  }
}

let masterKey = null;
// INITIALIZE THE KEY

unlockFinalDoor(masterKey);`,
    options: [
      { id: 1, text: "masterKey = { getLockId: () => 'ESCAPE' };", isCorrect: true },
      { id: 2, text: "masterKey = 'ESCAPE';", isCorrect: false },
      { id: 3, text: "masterKey = new Key();", isCorrect: false },
    ],
    hintPrompt: "You are a cryptic guide in a haunted game. The player is facing a null reference error in this JavaScript code: `function unlockFinalDoor(key) { const lock = key.getLockId(); } unlockFinalDoor(null);`. Provide a one-sentence hint about how to give the `masterKey` variable a value and structure that the function expects. Frame it like you're giving life to a phantom.",
    successPrompt: "The player has fixed the null reference and escaped. Write a concluding paragraph. Describe the final door dematerializing into pixels, revealing not the outside world, but the player's own reflection on the dark screen, with a faint, ghostly figure smiling behind them just before the monitor goes black. They have escaped the machine, but has the machine escaped them?"
  }
];
