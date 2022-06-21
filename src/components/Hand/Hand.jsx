import { useState, useEffect, useContext } from "react";
import { connectHand, createHand, drawCards, getAllCardInHand } from "../../services/handApi";
import { getAllCards, shuffle } from "../../services/cardApi";
import { gameContext } from "../../contexts/gameContext";
import { userContext } from "../../contexts/userContext";
import { myGameData } from "../../services/playerApi";
import Card from "../Card/Card";
import "./Hand.css";

const Hand = () => {
  const { me, game, setMe, id } = useContext(gameContext);
  const { user } = useContext(userContext);

  const [hand, setHand] = useState([]);
  const [cards, setCards] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [finalCards, setFinalCards] = useState([]);

  // Je récupère toutes les cartes
  useEffect(() => {
    getAllCards().then((data) => setCards(data));
  }, []);

  // Je les mélanges
  useEffect(() => {
    const shuffleCards = shuffle(cards);

    setShuffled(shuffleCards);
  }, [cards]);

  // Je n'en garde que 7 et m'en défausse de 3
  useEffect(() => {
    const h = shuffled.splice(0, 7);
    setFinalCards(h);
  }, [shuffled]);

  // Cartes en main en cours de partie

  useEffect(() => {
    getAllCardInHand(me.hand).then((data) => {
      setHand(data);
    });
  }, [me]);

  // Fonction pour piocher au début de partie
  const draw = () => {
    createHand(game.id).then(({ data }) => {
      connectHand(me.id, data.data.id)
        .then(() => {
          for (const card of finalCards) {
            drawCards(data.data.id, card.id, me.id);
          }
        })
        .then(() => {
          myGameData(id, user.id).then(({ data }) => {
            setMe(data[0]);
          });
        });
    });
  };

  return (
    <div className="Hand">
      {me.hand !== null ? (
        game.current_player.id === me.id ? (
          // Notre tour
          hand.map((item) => <Card key={item.id} card={item.card} />)
        ) : (
          // Pas notre tour
          hand.map((item) => <Card key={item.id} card={item.card} />)
        )
      ) : (
        <button onClick={draw}>Piocher</button>
      )}
    </div>
  );
};

export default Hand;
