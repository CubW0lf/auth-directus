import Carte from "../Card/Card";
import "./Board.css";

const Board = ({ board }) => {
  return (
    <div className="Board">
      {board.map((carte) => (
        <div key={carte.id}>
          <span>{carte.player.pseudo}</span>
          {carte.hidden === 0 ? <Carte card={carte.card} /> : <p>Retourné</p>}
        </div>
      ))}
    </div>
  );
};

export default Board;
