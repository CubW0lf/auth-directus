import { useContext, useEffect, useState } from "react";
import Radio from "../../components/Radio/Radio";
import { getAllFamilies } from "../../services/familyApi";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { chooseFamily, myGameData } from "../../services/playerApi";
import { findAllPlayersFromGame, findGame, modifyGame } from "../../services/gameApi";
import { gameContext } from "../../contexts/gameContext";
import { userContext } from "../../contexts/userContext";
import "./GamePending.css";
import assets from "../../services/assets";

const GamePending = () => {
  const { game, players, me, id, setMe, setPlayers, setGame } = useContext(gameContext);
  const { user } = useContext(userContext);

  const [families, setFamilies] = useState([]);
  const [family, setFamily] = useState("");

  useEffect(() => {
    getAllFamilies().then((data) => {
      setFamilies(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    chooseFamily(me.id, family)
      .then(() =>
        findAllPlayersFromGame(id).then(({ data }) => {
          setPlayers(data);
        })
      )
      .then(() => myGameData(id, user.id))
      .then(({ data }) => {
        setMe(data[0]);
      });
  };

  const startGame = () => {
    modifyGame(game.id, { status: "IN_PROGRESS" })
      .then(() => findGame(id))
      .then((data) => setGame(data));
  };

  return (
    <div className="GamePending">
      <h1>Partie {game.id}</h1>
      <p>En attente de joueurs</p>
      <div className="players">
        <h2>Joueurs de la Partie</h2>
        <table>
          <thead>
            <tr>
              <th>Pseudo</th>
              <th>Famille</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr className="player" key={p.id}>
                <td>{p.directus_users_id.pseudo}</td>
                <td>
                  {p.family !== null ? (
                    <AiTwotoneCheckCircle className="family" style={{ color: p.family.color }} />
                  ) : p.directus_users_id.id === user.id ? (
                    "Choisissez une Famille"
                  ) : (
                    "En attente"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {players.length > 2 && players.every((p) => p.family !== null) ? (
          <button onClick={startGame}>Lancer la Partie</button>
        ) : (
          <p>Il faut être au moins 3 joueurs qui ont choisi leur famille pour commencer une partie</p>
        )}
        {me.family === null && (
          <form className="family-choice flex-row" onChange={(e) => setFamily(e.target.value)} onSubmit={handleSubmit}>
            {families.map((f) => (
              <Radio key={f.id} value={f.id} group="family" label={<img src={`${assets}/${f.image}`} alt="" />} />
            ))}
            <button type="submit">Choisir</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GamePending;
