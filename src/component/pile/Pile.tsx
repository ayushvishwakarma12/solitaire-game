import React, { useEffect, useState } from "react";
import backSideOfCard from "../../assets/backSideOfCard.png";

export interface cardData {
  values: number;
  imageUrl: string;
  faceUp: boolean;
}

export interface GameData {
  deck: [];
  foundation: [];
  moves: number;
  piles: cardData[][];
  score: number;
}

const Pile = () => {
  const [cards, setCards] = useState<cardData[][]>([]);
  const [deck, setDeck] = useState<cardData[][]>([]);

  useEffect(() => {
    async function getCards() {
      const response = await fetch("http://localhost:8080/game/game-state", {
        method: "GET",
      });
      const data: GameData = await response.json();

      setDeck(data.deck);
      setCards(data.piles);
    }
    getCards();
  }, []);

  console.log(deck);

  return (
    <div className=" max-w-[1300px] mx-auto py-5">
      {cards.length > 0 && (
        <div className="grid grid-cols-10 gap-2">
          {cards.map((pile, pileIndex) => {
            return (
              <div key={pileIndex} className="relative  h-[220px]">
                {pile.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    style={{
                      top: `${cardIndex * 30}px`, // Adjust this value to control the card overlap
                      left: "0", // Aligns the cards vertically; adjust if you want horizontal spacing
                    }}
                    className="absolute"
                  >
                    <img
                      className={`${
                        card.faceUp === true
                          ? "lg:ml-9 lg:mt-2"
                          : "lg:min-w-[195px]"
                      }`}
                      src={
                        card.faceUp === true ? card.imageUrl : backSideOfCard
                      }
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pile;
