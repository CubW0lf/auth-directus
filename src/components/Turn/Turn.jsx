import "./Turn.css";

const Turn = ({ game }) => {
  return (
    <div className="Turn">
      <span>
        {game.current_player !== null
          ? `C'est à ${game.current_player?.directus_users_id.pseudo}`
          : "La Partie n'a pas encore commencé"}
      </span>
    </div>
  );
};

export default Turn;
