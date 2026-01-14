import { useState } from "react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState<
    { suit: string; value: string; revealed: boolean }[]
  >([]);
  const [gameEnd, setGameEnd] = useState(true);

  const suits = ["♠", "♥", "♦", "♣"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  function shuffleArray<T>(array: T[]) {
    for (let i = 0; i < array.length; i++) {
      const firtsCardPosition = Math.floor(Math.random() * array.length);
      const secondCardposition = Math.floor(Math.random() * array.length);
      const tmp = array[firtsCardPosition];
      array[firtsCardPosition] = array[secondCardposition];
      array[secondCardposition] = tmp;
    }
  }

  function shuffleCards() {
    const cards = suits.flatMap((suit) =>
      values.map((value) => ({ suit, value, revealed: false }))
    );
    cards.push({ suit: "exit", value: "Joker", revealed: false });

    shuffleArray(cards);
    setDeck(cards);
  }

  function startGame() {
    setGameEnd(false);
  }

  console.log(deck);
  return (
    <div>
      <h1>Loot the loop card game</h1>
      {gameEnd && (
        <button
          onClick={() => {
            shuffleCards();
            startGame();
          }}
        >
          Start the game
        </button>
      )}
      {!gameEnd && (
        <div>
          <div>Temple:</div>
          <div>Notes:</div>
          <div>Score Pile:</div>
        </div>
      )}
    </div>
  );
}

export default App;
