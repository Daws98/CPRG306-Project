import { useState, useEffect } from "react";

export default function CardName({ card, handleGetCard }) {
  const [guesses, setGuesses] = useState([]);
  const [result, setResult] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [showCardName, setShowCardName] = useState(false);

  useEffect(() => {
    if (card) {
      initializeGame();
    }
  }, [card]);

  const initializeGame = () => {
    const cleanedCardName = card.name.toLowerCase();
    const formattedGuesses = cleanedCardName.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
        return "_";
      } else if (char === " " || char === "'") {
        return char;
      }
      return "";
    });

    setGuesses(formattedGuesses);
    setResult("");
    setRemainingAttempts(5);
    setGuessedLetters([]);
    setIncorrectGuesses([]);
    setShowCardName(false);
  };

  const handleLetterClick = (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    if (!card) {
      return;
    }
    const cleanedCardName = card.name.toLowerCase().replace(/[\s']/g, ""); // Remove spaces and apostrophes
    if (!guessedLetters.includes(lowerCaseLetter)) {
      setGuessedLetters([...guessedLetters, lowerCaseLetter]);
      if (cleanedCardName.includes(lowerCaseLetter)) {
        const newGuesses = [...guesses];
        for (let i = 0; i < card.name.length; i++) {
          if (
            card.name[i].toLowerCase() === lowerCaseLetter ||
            card.name[i] === " " ||
            card.name[i] === "'"
          ) {
            newGuesses[i] = card.name[i].toUpperCase();
          }
        }
        setGuesses(newGuesses);
        if (newGuesses.join("") === card.name.toUpperCase()) {
          setResult("Congratulations! You guessed it right!");
          setShowCardName(true);
          setTimeout(() => {
            handleGetCard(); // Reset the game after a delay
          }, 2000);
        }
      } else {
        setRemainingAttempts((prevAttempts) => prevAttempts - 1);
        if (remainingAttempts === 1) {
          setResult("Game over! You're out of attempts.");
          setShowCardName(true);
          setTimeout(() => {
            handleGetCard(); // Reset the game after a delay
          }, 2000);
        } else {
          setResult("Incorrect guess!");
        }
      }
    } else {
      setResult("You've already guessed this letter.");
    }
  };

  const renderHangmanWord = () => {
    return (
      <div className="hangman-word">
        {guesses.map((letter, index) => (
          <span key={index} className="mr-1 hangman-letter">
            {letter}
          </span>
        ))}
      </div>
    );
  };

  const renderAlphabet = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return (
      <div
        className="alphabet"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {alphabet.split("").map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            className="letter-button"
            disabled={
              guessedLetters.includes(letter.toLowerCase()) || showCardName
            }
            style={{
              backgroundColor: guessedLetters.includes(letter.toLowerCase())
                ? card.name.toLowerCase().includes(letter)
                  ? "#4CAF50"
                  : "#FF0000"
                : "#1E293B",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
            }}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    );
  };

  const renderIncorrectGuesses = () => {
    return null;
  };
  return (
    <div className="min-h-96 min-w-12 max-alphabet">
      <h1 className="font-bold p-4 py-2 px-4 mint-text text-center text-5xl">
        Guess the Name
      </h1>
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="mt-4 embiggen">{renderHangmanWord()}</div>
        <div className="mt-4 text-2xl">{renderAlphabet()}</div>
        <p className="text-black text-center mt-4">{result}</p>
        <p className="text-black text-center mt-2">
          Remaining Attempts: {remainingAttempts}
        </p>
        {showCardName && (
          <div className="mt-2">
            <p className="text-black text-center">
              The correct name is: {name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
