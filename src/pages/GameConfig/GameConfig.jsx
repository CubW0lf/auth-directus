import { useContext } from "react";
import { gameContext } from "../../contexts/gameContext";
import { createBoard } from "../../services/boardApi";
import { findGame, modifyGame } from "../../services/gameApi";
import "./GameConfig.css";

const GameConfig = () => {
  const { game, setGame, id } = useContext(gameContext);

  const handleVisibility = () => {
    createBoard(game.id)
      .then(() => modifyGame(game.id, { status: "PENDING" }))
      .then(() => findGame(id))
      .then((data) => setGame(data));
  };

  return (
    <div className="GameConfig">
      <button onClick={handleVisibility}>Rendre la partie accessible</button>
    </div>
  );
};

export default GameConfig;
