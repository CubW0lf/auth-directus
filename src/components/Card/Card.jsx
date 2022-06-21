import assets from "../../services/assets";
import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="card-container">
      <img className={`Card`} src={`${assets}${card.image}`} alt={card.name} />
      <div className="description">
        <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
      </div>
    </div>
  );
};

export default Card;
