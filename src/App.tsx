import { useState } from "react";
import Card from "./components/Card";

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

  function explore() {
    if (!deck[0].revealed) {
      if (!deck[1].revealed) {
        setDeck(
          deck.map((card, index) =>
            index < 2 ? { ...card, revealed: true } : card
          )
        );
      } else {
        setDeck(
          deck.map((card, index) =>
            index < 1 ? { ...card, revealed: true } : card
          )
        );
      }
    }
  }

  function startGame() {
    setGameEnd(false);
  }

  console.log(deck);
  return (
    <div>
      {gameEnd && (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
          <h1>Loot the loop card game</h1>
          <button
            onClick={() => {
              shuffleCards();
              startGame();
            }}
          >
            Start the game
          </button>
        </div>
      )}
      {!gameEnd && (
        <div className="flex flex-col gap-20">
          <div>
            <h2>Temple:</h2>
            <div className="flex p-5 w-86 overflow-hidden overflow-x-scroll border">
              {deck.map((card, index) => (
                <Card
                  key={card.suit + card.value}
                  suit={card.suit}
                  value={card.value}
                  revealed={card.revealed}
                  position={index + 1}
                />
              ))}
            </div>
            <button onClick={() => explore()}>
              Look around(reveal top card/s)
            </button>
            <button>Explore(move x-amount forward in deck)</button>
            <button>Mark path(move top card to notes)</button>
            <button>
              Return to marked path(return card from notes to top)
            </button>
          </div>
          <div className="flex justify-around">
            <div>
              <h2>Notes (3 spaces):</h2>
            </div>
            <div>
              <h2>Score Pile:</h2>
              <div>Trinkets:</div>
              <div>Jewels:</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
