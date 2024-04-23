import React, { useState, useEffect } from "react";
import Image from "next/image";

const manaImages = {
  B: "/images/swamp.png",
  R: "/images/mountain.png",
  G: "/images/forest.png",
  U: "/images/island.png",
  W: "/images/plains.png",
  C: "/images/colorless.png",
};

export default function ManaValue({
  manaCost,
  selectedGameType,
  handleManaClick,
  loadNewCard,
}) {
  const [selectedManaCounts, setSelectedManaCounts] = useState({}); // State to track number of selected mana for each type
  const [feedback, setFeedback] = useState(""); // State to provide feedback to the user
  const [attemptsRemaining, setAttemptsRemaining] = useState(5); // State to track remaining attempts

  useEffect(() => {
    if (manaCost) {
      const chars = Array.from(manaCost.replace(/{|}/g, "_"));
      setSelectedManaCounts({});
      setAttemptsRemaining(5); // Reset attempts on new card load
    }
  }, [manaCost]);

  // Handle mana click
  const handleManaTypeClick = (manaType) => {
    setSelectedManaCounts((prevCounts) => ({
      ...prevCounts,
      [manaType]: (prevCounts[manaType] || 0) + 1,
    }));
  };

  // Reset selected mana counts
  const resetManaCounts = () => {
    setSelectedManaCounts({});
  };

  // Check the user's guess against the actual mana cost
  const checkGuess = () => {
    let correct = true;
    // Check colorless mana guess
    const colorlessManaCount = parseInt(
      manaCost.match(/\{\d+\}/g)?.[0].slice(1, -1) || 0
    );
    const userColorlessManaCount = selectedManaCounts["C"] || 0;
    if (userColorlessManaCount !== colorlessManaCount) {
      if (userColorlessManaCount > colorlessManaCount) {
        setFeedback("Your colorless mana guess is too high.");
      } else {
        setFeedback("Your colorless mana guess is too low.");
      }
      correct = false;
    }
    // Check selected mana counts
    for (const [manaType, count] of Object.entries(selectedManaCounts)) {
      if (manaType !== "C") {
        const expectedCount = manaCost.split(manaType).length - 1;
        if (count !== expectedCount) {
          setFeedback(`Incorrect number of ${manaType} mana.`);
          correct = false;
        }
      }
    }
    // If all checks pass, display success message and load a new card
    if (correct) {
      setFeedback("Congratulations! You guessed it right!");
      loadNewCard();
    } else {
      // Decrease attempts if the guess is incorrect
      setAttemptsRemaining((prevAttempts) => prevAttempts - 1);
      // Check if attempts are expired and load a new card
      if (attemptsRemaining === 1) {
        setFeedback("Out of attempts. Loading a new card.");
        setTimeout(() => {
          loadNewCard();
        }, 2000); // Wait for 2 seconds before loading a new card
      }
    }
  };

  return (
    <div className="min-h-96 min-w-12">
      <h1 className="font-bold p-4 py-2 px-4 mint-text text-center text-5xl">
        Guess the Mana Value
      </h1>
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="mana-value">
          <div className="mana-buttons">
            {/* Buttons for selecting mana types */}
            {Object.entries(manaImages).map(([manaType, manaImage]) => (
              <div key={manaType} className="mana-button-container min-w-16">
                <div className="flex flex-col justify-between">
                  <button
                    className="mana-button"
                    onClick={() => handleManaTypeClick(manaType)}
                  >
                    <Image
                      className="pip"
                      src={manaImage}
                      alt={`${manaType} Mana`}
                      width={40}
                      height={40}
                    />
                  </button>
                </div>
                {/* Display mana count */}
                <div className="mana-count mint-text text-3xl">
                  {selectedManaCounts[manaType] || 0}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center text-center">
            {/* Feedback for the user */}
            <div className="feedback">{feedback}</div>
            {/* Buttons container */}
            <div className="buttons-container">
              {/* Button to check the guess */}
              <button
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mr-4"
                onClick={checkGuess}
              >
                Check Guess
              </button>
              {/* Button to reset mana counts */}
              <button
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl ml-4"
                onClick={resetManaCounts}
              >
                Reset Mana
              </button>
            </div>
            {/* Display remaining attempts */}
            <div className="attempts-remaining">
              Attempts Remaining: {attemptsRemaining}
            </div>
          </div>
          <style jsx>{`
            .mana-value {
              display: flex;
              flex-direction: column;
              align-items: center;
              color: black; /* Set text color to black */
            }
            .mana-buttons {
              display: flex;
              flex-direction: row; /* Align buttons in a horizontal row */
              flex-wrap: wrap; /* Wrap buttons to next line if needed */
              justify-content: center; /* Center align buttons horizontally */
              margin-bottom: 10px;
            }
            .mana-button-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 10px;
              justify-content: space-between;
            }
            .mana-button {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              margin-bottom: 5px;
              border: none;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: bold;
            }
            .colorless-button {
              background-color: #ccc;
              min-width: 50px;
              min-height: 50px;
            }
            .mana-count {
              margin-top: 5px;
              font-size: 18px;
              font-weight: bold-900;
            }
            .feedback {
              margin-top: 2px;
              font-weight: bold;
            }
            .buttons-container {
              display: flex;
              justify-content: center;
              margin: 10px 0 10px 0;
            }

            .check-button {
              background-color: #007bff;
              color: white;
            }
            .reset-button {
              background-color: #dc3545;
              color: white;
            }
            .attempts-remaining {
              margin-top: 4px;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
