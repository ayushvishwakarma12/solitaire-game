import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/home/Home";
import StartGame from "./component/startGame/StartGame";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
