import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { TiDeleteOutline } from "react-icons/ti";
import { addPlayer, createGame, deleteGame, deletePlayer, findGamePlayer } from "../../services/gameApi";
import { allMyGames } from "../../services/playerApi";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(userContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    allMyGames(user.id).then((data) => setGames(data.data));
  }, [user.id]);

  const handleCreateGame = () => {
    createGame().then((data) => {
      addPlayer({
        directus_users_id: user.id,
        game_id: data.data.data.id,
      }).then(() => allMyGames(user.id).then((data) => setGames(data.data)));
    });
  };

  const handleDelete = (id) => {
    findGamePlayer(id, user.id).then(({ data }) => {
      deletePlayer(data.data[0].id).then(() =>
        deleteGame(id).then(() => allMyGames(user.id).then((data) => setGames(data.data)))
      );
    });
  };

  return (
    <div className="Profile">
      <h1>Profil de {user?.pseudo}</h1>
      <div className="myGames">
        <h2>Mes Parties</h2>
        <div>
          {games.length !== 0 &&
            games.map((g) => (
              <div className="game" key={g.game_id}>
                <div className="container">
                  <Link to={`/player/game/${g.game_id}`}>
                    <span>{g.game_id}</span>
                  </Link>
                  <TiDeleteOutline className="delete rotate-45" onClick={() => handleDelete(g.game_id)} />
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
      <button className="create" onClick={handleCreateGame}>
        Créer une Partie
      </button>
    </div>
  );
};

export default Profile;
