import HomePageBackground from "../../assets/homePageBackground.png";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HomePageBackground}) center/cover no-repeat`,
      }}
      className="h-screen flex flex-col gap-5 justify-center items-center"
    >
      <h1 className="text-white font-semibold text-4xl">
        Sharpen Your Skills with Spider Solitaire
      </h1>
      <button
        onClick={() => navigate("/game")}
        className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          Start Game
        </span>
      </button>
    </div>
  );
};

export default StartGame;
