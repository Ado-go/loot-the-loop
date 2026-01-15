import { useState } from "react";
import Card from "./components/Card";

type card = {
  suit: string;
  value: string;
  revealed: boolean;
};

function App() {
  const [deck, setDeck] = useState<card[]>([]);
  const [gameEnd, setGameEnd] = useState(true);
  const [explored, setExplored] = useState(false);
  const [markedPaths, setMarkedPaths] = useState<card[]>([]);
  const [trinkets, setTrinkets] = useState<card[]>([]);
  const [jewels, setJewels] = useState<card[]>([]);

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

  function resetGame() {
    setDeck([]);
    setMarkedPaths([]);
    setTrinkets([]);
    setJewels([]);
    shuffleCards();
  }

  function lookAround() {
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

  function explore(value: number) {
    setExplored(true);
    setDeck((prev) => {
      const toBottom = prev.slice(0, value);
      const newTop = prev.slice(value, deck.length);
      return [...newTop, ...toBottom];
    });
  }

  function markPath() {
    setMarkedPaths((prev) => {
      return [...prev, { ...deck[0] }];
    });
    setDeck((prev) => {
      return prev.slice(1, prev.length);
    });
  }

  function returnToMarkedPath(position: number) {
    setDeck((prev) => {
      return [{ ...markedPaths[position] }, ...prev];
    });
    setMarkedPaths((prev) => {
      if (position === 0) {
        return prev.slice(1, prev.length);
      } else if (position === 1) {
        return [{ ...prev[0] }, ...prev.slice(position + 1, prev.length)];
      } else {
        return prev.slice(0, prev.length - 1);
      }
    });
  }

  function evaluateLandingOnCard() {
    if (["J", "Q", "K"].includes(deck[0].value)) {
      alert("You lose");
    } else if (deck[0].value === "A") {
      setJewels((prev) => [...prev, { ...deck[0] }]);
      setDeck((prev) => prev.slice(1, prev.length));
    } else if (deck[0].value === "Joker") {
      if (jewels.length === 4) {
        alert("You win");
      }
    } else {
      setTrinkets((prev) => [...prev, { ...deck[0] }]);
      setDeck((prev) => prev.slice(1, prev.length));
    }
  }

  if (explored && deck[0]?.revealed) {
    evaluateLandingOnCard();
  }

  return (
    <div>
      {gameEnd && (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
          <h1>Loot the loop card game</h1>
          <button
            onClick={() => {
              shuffleCards();
              setGameEnd(false);
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
            <div>
              <button
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={deck[0].revealed}
                onClick={() => lookAround()}
              >
                Look around(reveal top card/s)
              </button>
              <div>
                <button
                  disabled={
                    !deck[0].revealed ||
                    isNaN(parseInt(deck[0].value)) ||
                    deck[parseInt(deck[0].value)].revealed
                  }
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => explore(parseInt(deck[0].value))}
                >
                  explore with first card
                </button>
                <button
                  disabled={
                    !deck[1].revealed ||
                    isNaN(parseInt(deck[1].value)) ||
                    deck[parseInt(deck[1].value)].revealed
                  }
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => explore(parseInt(deck[1].value))}
                >
                  explore with second card
                </button>
              </div>
              <button
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  markedPaths.length === 3 ||
                  !deck[0].revealed ||
                  isNaN(parseInt(deck[0].value))
                }
                onClick={() => markPath()}
              >
                Mark path(move top card to notes)
              </button>
              <div>
                <button
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={markedPaths[0]?.value === undefined}
                  onClick={() => returnToMarkedPath(0)}
                >
                  Return to #1 path({markedPaths[0]?.value})
                </button>
                <button
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={markedPaths[1]?.value === undefined}
                  onClick={() => returnToMarkedPath(1)}
                >
                  Return to #2 path({markedPaths[1]?.value})
                </button>
                <button
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={markedPaths[2]?.value === undefined}
                  onClick={() => returnToMarkedPath(2)}
                >
                  Return to #3 path({markedPaths[2]?.value})
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div>
              <h2>Notes ({3 - markedPaths.length} free spaces):</h2>
              <div className="flex p-5 w-40 overflow-hidden border">
                {markedPaths.map((path, index) => (
                  <Card
                    key={path.suit + path.value}
                    suit={path.suit}
                    value={path.value}
                    revealed={path.revealed}
                    position={index + 1}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2>Score Pile:</h2>
              <div>
                <h3>Trinkets:</h3>
                <div className="flex p-5 w-40 overflow-hidden border">
                  {trinkets.map((trinket, index) => (
                    <Card
                      key={trinket.suit + trinket.value}
                      suit={trinket.suit}
                      value={trinket.value}
                      revealed={trinket.revealed}
                      position={index + 1}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3>Jewels:</h3>
                <div className="flex p-5 w-40 overflow-hidden border">
                  {jewels.map((jewel, index) => (
                    <Card
                      key={jewel.suit + jewel.value}
                      suit={jewel.suit}
                      value={jewel.value}
                      revealed={jewel.revealed}
                      position={index + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => resetGame()}>reset game</button>
        </div>
      )}
    </div>
  );
}

export default App;
