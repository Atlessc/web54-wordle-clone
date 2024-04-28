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
    const evaluatedGuess: Array<{ letter: string; status: 'correct' | 'present' | 'absent' }> = guess.split('').map((letter, index) => {
      const isInCorrectPosition = letter === currentWord[index];
        let status: 'correct' | 'present' | 'absent';  // Explicitly defining the type of status

        if (letter === currentWord[index]) {
            status = 'correct';
        } else if (currentWord.includes(letter)) {
            status = currentWord[index] === letter ? 'correct' : 'present';
        } else {
            status = 'absent';
        }
                // Update letter statuses for keyboard visual feedback
                setLetterStatuses(prevStatuses => ({
                  ...prevStatuses,
                  [letter]: prevStatuses[letter] === 'correct' || isInCorrectPosition ? 'correct' : status
              }));

        return { letter, status };
    });

    setGuesses([...guesses, evaluatedGuess]);

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
