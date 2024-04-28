import { useState, useEffect } from 'react';
import Keyboard from '../components/SharedComponents/Keyboard/Keyboard';
import GameBoard from '../components/SharedComponents/GameBoard/GameBoard';
import Modal from '../components/SharedComponents/Modal/Modal';
import wordsList from '../data/wordList.json';

const DailyChallengePage = () => {
  const [currentWord, setCurrentWord] = useState('');
  const wordLength = currentWord.length;
  const [currentGuess, setCurrentGuess] = useState('');

  const [guesses, setGuesses] = useState<Array<Array<{ letter: string; status: 'correct' | 'present' | 'absent' }>>>([]);
  const [letterStatuses, setLetterStatuses] = useState<{ [key: string]: 'correct' | 'present' | 'absent' }>({});
  const numOfGuesses = 6;
  const [gameStatus, setGameStatus] = useState<'won' | 'lost' | 'playing'>('playing');

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.words.length);
    setCurrentWord(wordsList.words[randomIndex]);
  };
  useEffect(() => {
    // Function to pick a random word
    if (currentWord === '') {
      pickRandomWord();  // Pick a word when the component mounts
    }

  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Backspace') {
        handleKeyInput('backspace');
      } else if (key === 'Enter') {
        handleKeyInput('enter');
      } else if (key.length === 1 && key.match(/[a-z]/i)) { 
        handleKeyInput(key.toLowerCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess, guesses]); 

  const handleKeyInput = (key: string) => {
    if (key === 'backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (key === 'enter') {
      if (currentGuess.length === wordLength && guesses.length < 6) {
        evaluateGuess(currentGuess);
        setCurrentGuess('');
      }
    } else if (currentGuess.length < wordLength) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const evaluateGuess = (guess: string) => {
    // Initialize count of each letter in the target word
    const targetFrequency: { [key: string]: number } = {};
    currentWord.split('').forEach(letter => {
      targetFrequency[letter] = (targetFrequency[letter] || 0) + 1;
    });
  
    const evaluatedGuess: Array<{ letter: string; status: 'correct' | 'present' | 'absent' }> = [];
  
    // First pass to assign correct status and reduce frequency count
    guess.split('').forEach((letter, index) => {
      if (letter === currentWord[index]) {
        evaluatedGuess.push({ letter, status: 'correct' });
        targetFrequency[letter] -= 1; // Use up one occurrence of the letter
      } else {
        evaluatedGuess.push({ letter, status: 'absent' }); // Temporarily mark as absent
      }
    });
  
    // Second pass to update absent to present if applicable
    evaluatedGuess.forEach((item) => {
      if (item.status === 'absent' && targetFrequency[item.letter] > 0) {
        item.status = 'present';
        targetFrequency[item.letter] -= 1; // Use up one occurrence of the letter
      }
    });
  
    // Update state with the results of this guess
    setGuesses(prevGuesses => [...prevGuesses, evaluatedGuess]);
  
    // Update letter statuses for the keyboard visual feedback
    const newLetterStatuses: { [key: string]: 'correct' | 'present' | 'absent' } = {};
    evaluatedGuess.forEach(({ letter, status }) => {
      // Only update the status if it is more significant than what's already recorded
      const currentStatus = letterStatuses[letter];
      if (status === 'correct' || (status === 'present' && currentStatus !== 'correct')) {
        newLetterStatuses[letter] = status;
      } else if (!currentStatus) {
        newLetterStatuses[letter] = 'absent';
      }
    });
  
    setLetterStatuses(prevStatuses => ({ ...prevStatuses, ...newLetterStatuses }));
  
    // Check if the game is won or lost
    if (evaluatedGuess.every(({ status }) => status === 'correct')) {
      setGameStatus('won');
    } else if (guesses.length + 1 === numOfGuesses) {
      setGameStatus('lost');
    }
  };
  

const handleNewGame = () => {
  setCurrentGuess('');
  setGuesses([]);
  setGameStatus('playing');
  setLetterStatuses({});
  pickRandomWord();
}

  return (
    <div>
      <h1>Daily Challenge</h1>
      <GameBoard wordLength={wordLength} guesses={guesses} currentGuess={currentGuess} numOfGuesses={numOfGuesses} />
      <Keyboard onKeyPress={handleKeyInput} letterStatuses={letterStatuses} isDisabled={gameStatus === 'won' || gameStatus === 'lost'} />
      {gameStatus === 'won' && 
        <Modal isOpen={gameStatus === 'won'} onClose={() => handleNewGame()}>
          <h2>Congratulations! You've won!</h2>
          <button onClick={handleNewGame}>Play Again</button>
        </Modal>
      }
      {gameStatus === 'lost' &&
        <Modal isOpen={gameStatus === 'lost'} onClose={() => handleNewGame()}>
          <h2>Game Over! The word was {currentWord}</h2>
          <button onClick={handleNewGame}>Play Again</button>
        </Modal>
      }
    </div>
  );
};

export default DailyChallengePage;
