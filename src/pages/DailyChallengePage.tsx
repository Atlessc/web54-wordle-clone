import { useState, useEffect, useRef } from 'react';
import Keyboard from '../components/SharedComponents/Keyboard/Keyboard';
import GameBoard from '../components/SharedComponents/GameBoard/GameBoard';
import Modal from '../components/SharedComponents/Modal/Modal';
import wordsList from '../data/wordList.json';

// TODO: update to allow for mobile view



const DailyChallengePage = () => {
  const inputRef = useRef<HTMLDivElement>(null);

  const [currentWord, setCurrentWord] = useState('');
  const wordLength = currentWord.length;
  const [currentGuess, setCurrentGuess] = useState('');
  const numOfGuesses = 8;

  const [guesses, setGuesses] = useState<Array<Array<{ letter: string; status: 'correct' | 'present' | 'absent' }>>>([]);
  const [letterStatuses, setLetterStatuses] = useState<{ [key: string]: 'correct' | 'present' | 'absent' }>({});
  const [gameStatus, setGameStatus] = useState<'won' | 'lost' | 'playing'>('playing');
  const [viewportWidth, setViewportWidth] = useState<number>();
  const [viewportType, setViewportType] = useState<'Desktop' | 'Mobile' | ''>('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setViewportType("Mobile");
      } else if (window.innerWidth <= 1024) {
        setViewportType("Desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.words.length);
    setCurrentWord(wordsList.words[randomIndex]);
  };

  useEffect(() => {

    if (currentWord == '') {
      pickRandomWord();
    }

    inputRef.current?.focus();

    const handleViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    if (viewportWidth && viewportWidth < 768) {
      setViewportType('Mobile');
    } else if (viewportWidth && viewportWidth >= 768) {
      setViewportType('Desktop');
    }

    handleViewportWidth(); // Call the method on mount

    window.addEventListener('resize', handleViewportWidth); // Add event listener for resize

    return () => {
      window.removeEventListener('resize', handleViewportWidth); // Clean up the event listener on unmount
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyInput(event.key, e);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyInput = (key: string, event: KeyboardEvent) => {
    if (key === 'Enter' || key === 'Backspace') {
        event?.preventDefault();
    }
    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < wordLength) {
        setCurrentGuess(prevGuess => prevGuess + key.toLowerCase());
    } else if (key === 'Backspace' && currentGuess.length > 0) {
        setCurrentGuess(prevGuess => prevGuess.slice(0, -1));
    } else if (key === 'Enter' && currentGuess.length === wordLength) {
        if (guesses.length < numOfGuesses) {
            evaluateGuess(currentGuess);
            setCurrentGuess('');
        }
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
    <div tabIndex={0} ref={inputRef} onKeyDown={(e) => handleKeyInput(e.key, e)} style={{ outline: 'none' }}>
      {viewportType === 'Desktop' && <h1>Word In A Bottle: Mobile Mode</h1>}
      {viewportType === 'Mobile' && <h2>Word In A Bottle: Mobile Mode</h2>}
      <GameBoard wordLength={wordLength} guesses={guesses} currentGuess={currentGuess} numOfGuesses={numOfGuesses} />
      <Keyboard onKeyPress={(key) => handleKeyInput(key, e)} letterStatuses={letterStatuses} isDisabled={gameStatus === 'won' || gameStatus === 'lost'} viewportType={viewportType} />
      {gameStatus === 'won' && 
        <Modal isOpen={gameStatus === 'won'} onClose={() => handleNewGame()}>
          <h2>Congratulations! You've won!</h2>
          <p>The word was {currentWord}</p>
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
