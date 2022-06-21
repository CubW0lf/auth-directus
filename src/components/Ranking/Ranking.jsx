import { useContext } from "react";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { gameContext } from "../../contexts/gameContext";
import { userContext } from "../../contexts/userContext";
import "./Ranking.css";

const Ranking = () => {
  const { players, game } = useContext(gameContext);
  const { user } = useContext(userContext);
  return (
    <div className="Ranking">
      <h2>Classement</h2>
      <div className="joueurs">
        {players.map((player) =>
          player.directus_users_id.id === user.id ? (
            <span className="rank" key={player.id}>
              <AiTwotoneCheckCircle className="family" style={{ color: player.family.color }} />
              {` Moi : ${player.points}`}
            </span>
          ) : (
            <span className="rank" key={player.id}>
              <AiTwotoneCheckCircle className="family" style={{ color: player.family.color }} />
              {` ${player.directus_users_id.pseudo} : ${player.points}`}
            </span>
          )
        )}
        <div className="infos flex-container">
          <h2>Infos</h2>
          <span>Tour N°: {game.turn}</span>
          <span>Phase: {game.phase}</span>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
