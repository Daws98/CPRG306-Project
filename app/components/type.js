import React, { useState, useEffect } from "react";

export default function Type({ card, handleGetCard }) {
  const [selectedType, setSelectedType] = useState(""); // State to store the selected type
  const [attempts, setAttempts] = useState(3); // State to track the remaining attempts
  const [result, setResult] = useState(""); // State to display the result

  // Array of possible card types
  const cardTypes = [
    "Artifact",
    "Creature",
    "Enchantment",
    "Land",
    "Instant",
    "Sorcery",
    "Multi-type symbol",
    "Planeswalker",
  ];

  // Function to handle the selection of card type
  const handleTypeSelection = (event) => {
    setSelectedType(event.target.value);
  };

  const handleGuess = () => {
    // Convert card type to lowercase for case-insensitive comparison
    const lowercaseCardType = card.type.toLowerCase();
    
    // Split selected type and card type into arrays of words
    const selectedTypeWords = selectedType.toLowerCase().split(' ');
    const cardTypeWords = lowercaseCardType.split(' ');
  
    // Check if any word in the selected type matches any word in the card type
    const isCorrectGuess = selectedTypeWords.some(selectedWord =>
      cardTypeWords.some(cardWord => cardWord.includes(selectedWord))
    );
  
    if (isCorrectGuess) {
      setResult("Congratulations! You guessed it right!");
      setTimeout(() => {
        handleGetCard(); // Fetch a new card after a delay
      }, 2000);
    } else {
      setAttempts((prevAttempts) => prevAttempts - 1);
      if (attempts === 1) {
        setResult(`Game over! The correct card type is ${card.type}.`);
        setTimeout(() => {
          handleGetCard(); // Fetch a new card after a delay
        }, 2000);
      } else {
        setResult("Incorrect guess! Please try again.");
      }
    }
  };

  // Reset state when a new card loads
  useEffect(() => {
    setSelectedType("");
    setAttempts(3);
    setResult("");
  }, [card]);

  return (
    <div className="min-h-96 min-w-12">
      <h1 className="font-bold p-4 py-2 px-4 mint-text text-center text-5xl">
        Guess the Card Type
      </h1>
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="mb-4">
          <select
            value={selectedType}
            onChange={handleTypeSelection}
            className="px-3 py-2 border rounded-md"
            style={{ color: "black" }} // Set text color to black
          >
            <option value="">Select a card type</option>
            {cardTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleGuess}
          disabled={!selectedType || attempts === 0}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mt-4"
        >
          Check Guess
        </button>
        <p className="mt-4 text-black">{result}</p>
        <p className="text-black">Remaining attempts: {attempts}</p>
      </div>
    </div>
  );
}