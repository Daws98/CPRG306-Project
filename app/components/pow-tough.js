import { useState, useEffect } from "react";

export default function PowTough({ card, handleGetCard }) {
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [powerGuess, setPowerGuess] = useState(0);
  const [toughnessGuess, setToughnessGuess] = useState(0);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    if (!card) {
      initializeGame();
    }
  }, []);
  const initializeGame = () => {
    handleGetCard();
    setPowerGuess(0);
    setRemainingAttempts(3);
    setToughnessGuess(0);
    setResult("");
    setShowResult(false);
  };

  const checkGuess = () => {
    // Decrement remainingAttempts
    setRemainingAttempts(remainingAttempts - 1);
    const powerResult =
      powerGuess > card.power
        ? "Too High"
        : powerGuess < card.power
        ? "Too Low"
        : "Correct";
    const toughnessResult =
      toughnessGuess > card.toughness
        ? "Too High"
        : toughnessGuess < card.toughness
        ? "Too Low"
        : "Correct";
    setResult(`Power: ${powerResult}, Toughness: ${toughnessResult}`);
    // Check if both guesses are correct
    if (powerResult === "Correct" && toughnessResult === "Correct") {
      setShowResult(true);
    }

    // Check if remainingAttempts has hit 0
    if (remainingAttempts === 0) {
      initializeGame();
    }
  };

  return (
    <div className="min-h-96 min-w-12">
      <h1 className="font-bold p-4 py-2 px-4 mint-text text-center text-5xl">
        Guess the Power/Toughness
      </h1>
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="mt-4">
          <input
            className="text-black text-xl text-center w-20 h-8 mr-1 border-2 border-slate-800 rounded-xl"
            type="number"
            min="0"
            value={powerGuess}
            onChange={(e) => setPowerGuess(e.target.value)}
            placeholder="Guess Power"
          />
          /
          <input
            className="text-black text-xl text-center w-20 h-8 ml-1 border-2 border-slate-800 rounded-xl"
            type="number"
            min="0"
            value={toughnessGuess}
            onChange={(e) => setToughnessGuess(e.target.value)}
            placeholder="Guess Toughness"
          />
        </div>
        {!showResult && remainingAttempts > 0 && (
          <div className="flex flex-col justify-center">
            <button
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mt-4"
              onClick={checkGuess}
            >
              Check Guess
            </button>
            <p className="text-black text-center mt-4">
              Remaining Attempts: {remainingAttempts}
            </p>
          </div>
        )}

        {(showResult || remainingAttempts === 0) && (
          <button
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mt-4"
            onClick={initializeGame}
          >
            Next Card
          </button>
        )}
        <p className="text-black text-center mt-4">{result}</p>

        {(showResult || remainingAttempts === 0) && (
          <div className="flex justify-center pow-tough-box mt-4 rounded-lg text-l font-bold">
            <div className="absolute thin-black-line"></div>
            <p className="text-black text-center ">{card.power}</p>
            <p className="text-black text-center ml-1 mr-1">/</p>
            <p className="text-black text-center">{card.toughness}</p>
            <div className="absolute thin-white-line"></div>
          </div>
        )}
      </div>
    </div>
  );
}
