import './GameBoard.css';

// TODO: update to allow for mobile view

interface GameBoardProps {
  wordLength: number;
  guesses: Array<Array<{ letter: string, status: 'correct' | 'present' | 'absent' }>>;
  currentGuess: string;
  numOfGuesses: number;
}

const GameBoard = ({ wordLength, guesses, currentGuess, numOfGuesses }: GameBoardProps) => {
  return (
    <div className="game-board">
      {Array.from({ length: numOfGuesses }).map((_, guessIndex) => (
        <div key={guessIndex} className="guess-row">
          {Array.from({ length: wordLength }).map((__, letterIndex) => {
            const isCurrentGuessRow = guessIndex === guesses.length;
            let letter = '';
            let status = '';

            if (isCurrentGuessRow) {
              letter = currentGuess[letterIndex] || '';
            } else {
              const guess = guesses[guessIndex];
              const letterObj = guess && guess[letterIndex];
              letter = letterObj ? letterObj.letter : '';
              status = letterObj ? letterObj.status : '';
            }

            return (
              <div key={letterIndex} className={`letter-box ${status}`}>
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
