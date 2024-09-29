import React from "react";
import { CgCardSpades } from "react-icons/cg";

interface FooterProps {
  fetchCards: () => Promise<void>;
  move: number;
}

const Footer: React.FC<FooterProps> = ({ fetchCards, move }) => {
  const handleClickNewGame = async () => {
    const response = await fetch("http://localhost:8080/game/start-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    fetchCards();
  };

  return (
    <div className="  relative bottom-0 bg-black bg-opacity-50 w-full">
      <div className="flex justify-between items-center p-2 max-w-[1200px] mx-auto">
        <button
          onClick={handleClickNewGame}
          className="flex justify-center items-center gap-2 border-white border-2 px-6 py-2 rounded-lg bg-slate-800 hover:scale-105 duration-500 ease-in-out"
        >
          <CgCardSpades className="text-white w-[30px] h-[30px]" />
          <span className="font-bold text-white text-lg">New Game</span>
        </button>
        <button className="flex justify-center items-center gap-2 border-white border-2 px-8 py-2 rounded-lg bg-slate-800 hover:scale-105 duration-500 ease-in-out">
          <span className="text-white font-bold text-xl">Score</span>
          <span className="font-bold text-white text-xl">0</span>
        </button>
        <button className="flex justify-center items-center gap-2 border-white border-2 px-8 py-2 rounded-lg bg-slate-800 hover:scale-105 duration-500 ease-in-out">
          <span className="text-white font-bold text-xl">Moves</span>
          <span className="font-bold text-white text-xl">{move}</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
