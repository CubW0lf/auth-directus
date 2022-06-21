import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";

const NotLogged = () => {
  return (
    <ul>
      <li>
        <Link to="/register">
          <div className="flex-row">
            <span>Inscription</span>
            <BsPlusCircle />
          </div>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <div className="flex-row">
            <span>Connexion</span>
            <AiOutlineLogin />
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default NotLogged;
