import background from "../../assets/background.jpg";
import Pile from "../pile/Pile";

const Home = () => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background}) center/cover no-repeat`,
      }}
      className="w-full h-screen"
    >
      <div>
        <Pile />
      </div>
    </div>
  );
};

export default Home;
