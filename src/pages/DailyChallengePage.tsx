import { useState } from 'react';
import Keyboard from '../components/SharedComponents/Keyboard/Keyboard';
import GameBoard from '../components/SharedComponents/GameBoard/GameBoard';

const DailyChallengePage = () => {
  const targetWord = "target";
  const wordLength = targetWord.length;
  const [currentGuess, setCurrentGuess] = useState('');

  const [guesses, setGuesses] = useState<Array<Array<{ letter: string; status: 'correct' | 'present' | 'absent' }>>>([]);
  const [letterStatuses, setLetterStatuses] = useState<{ [key: string]: 'correct' | 'present' | 'absent' }>({});

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
    const evaluatedGuess = guess.split('').map((letter, index) => {
      let status: 'correct' | 'present' | 'absent';
      if (letter === targetWord[index]) {
        status = 'correct';
      } else if (targetWord.includes(letter)) {
        status = targetWord[index] === letter ? 'correct' : 'present';
      } else {
        status = 'absent';
      }
      return { letter, status };
    });

    setGuesses([...guesses, evaluatedGuess]);

    // Update letter statuses:
    const newStatuses = { ...letterStatuses };
    evaluatedGuess.forEach(({ letter, status }) => {
      if (!newStatuses[letter] || newStatuses[letter] === 'present' && status === 'correct') {
        newStatuses[letter] = status;
      }
    });
    setLetterStatuses(newStatuses);
  };

  return (
    <div>
      <h1>Daily Challenge</h1>
      <GameBoard wordLength={wordLength} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard onKeyPress={handleKeyInput} letterStatuses={letterStatuses} />
    </div>
  );
};

export default DailyChallengePage;
