import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gameContext } from "../../contexts/gameContext.js";
import Board from "../../components/Board/Board";
import Hand from "../../components/Hand/Hand";
import Ranking from "../../components/Ranking/Ranking";
import Turn from "../../components/Turn/Turn";
import { userContext } from "../../contexts/userContext";
import { getAllItemsOnBoard } from "../../services/boardApi";
import { findGame, modifyGame } from "../../services/gameApi";
import { myGameData } from "../../services/playerApi";
import { findAllPlayersFromGame } from "../../services/gameApi";
import GameConfig from "../GameConfig/GameConfig";
import GamePending from "../GamePending/GamePending";
import "./Game.css";

const Game = () => {
  const [game, setGame] = useState([]);
  const [board, setBoard] = useState([]);
  const [me, setMe] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allHand, setAllHand] = useState(false);

  const { id } = useParams("id");

  const { user } = useContext(userContext);

  useEffect(() => {
    findGame(id).then((data) => {
      setGame(data);
    });

    findAllPlayersFromGame(id).then(({ data }) => {
      setPlayers(data);
    });

    getAllItemsOnBoard(id).then((data) => {
      setBoard(data);
    });
  }, [id]);

  useEffect(() => {
    myGameData(id, user.id).then(({ data }) => {
      setMe(data[0]);
    });
  }, [user.id, id]);

  useEffect(() => {
    if (players.length !== 0) {
      setAllHand(players.every((p) => p.hand !== null));
    }
  }, [players]);

  useEffect(() => {
    allHand === true && modifyGame(id, { current_player: players[0] });
  }, [allHand, id, players]);

  return (
    <gameContext.Provider value={{ game, setGame, board, setBoard, me, setMe, players, setPlayers, id, allHand }}>
      {game.status === "CREATED" && <GameConfig />}
      {game.status === "PENDING" && <GamePending />}
      {game.status === "IN_PROGRESS" && (
        <div className="Game">
          <Ranking />
          <Board board={board} />
          <Turn game={game} />
          <Hand />
        </div>
      )}
    </gameContext.Provider>
  );
};

export default Game;
