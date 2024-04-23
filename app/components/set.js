import React, { useState, useEffect } from "react";

export default function SetName({ setCode, handleGetSet }) {
  const [guesses, setGuesses] = useState([]);
  const [result, setResult] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showSetName, setShowSetName] = useState(false);
  const [isCorrectSet, setIsCorrectSet] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [setCode]);

  const initializeGame = () => {
    if (!setCode) {
      return;
    }
    const formattedGuesses = setCode.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
        return "_";
      } else if (
        char === " " ||
        char === "'" ||
        char === ":" ||
        char === "." ||
        char === ","
      ) {
        return char;
      }
      return "";
    });
    setGuesses(formattedGuesses);
    setResult("");
    setRemainingAttempts(5);
    setGuessedLetters([]);
    setShowSetName(false);
    setIsCorrectSet(false);
  };

  const handleLetterClick = (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    if (!setCode) {
      return;
    }
    if (!guessedLetters.includes(lowerCaseLetter)) {
      setGuessedLetters([...guessedLetters, lowerCaseLetter]);
      if (setCode.toLowerCase().includes(lowerCaseLetter)) {
        const newGuesses = [...guesses];
        for (let i = 0; i < setCode.length; i++) {
          if (setCode[i].toLowerCase() === lowerCaseLetter) {
            newGuesses[i] = setCode[i].toUpperCase();
          }
        }
        setGuesses(newGuesses);
        if (newGuesses.join("") === setCode.toUpperCase()) {
          setResult("Congratulations! You guessed it right!");
          setShowSetName(true);
          setIsCorrectSet(true);
          setTimeout(() => {
            handleGetSet();
          }, 2000);
        }
      } else {
        setRemainingAttempts((prevAttempts) => prevAttempts - 1);
        if (remainingAttempts === 1) {
          setResult("Game over! You're out of attempts.");
          setShowSetName(true);
          setTimeout(() => {
            handleGetSet();
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
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
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
              guessedLetters.includes(letter.toLowerCase()) || showSetName
            }
            style={{
              backgroundColor: guessedLetters.includes(letter.toLowerCase())
                ? setCode.toLowerCase().includes(letter)
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

  return (
    <div className="min-h-96 min-w-12 max-alphabet">
      <h1 className="font-bold p-4 py-2 px-4 mint-text text-center text-5xl">
        Guess the Set
      </h1>
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="mt-4 embiggen">{renderHangmanWord()}</div>
        <div className="mt-4 text-2xl">{renderAlphabet()}</div>
        <p className="text-black text-center mt-4">{result}</p>
        <p className="text-black text-center mt-2">
          Remaining Attempts: {remainingAttempts}
        </p>
        {showSetName && (
          <div className="mt-4">
            <p className="text-black text-center">
              {isCorrectSet ? (
                <>
                  Congratulations! You guessed the correct set:{" "}
                  {setCode.toUpperCase()}
                </>
              ) : (
                <>The correct set code is: {setCode.toUpperCase()}</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
