import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import "./Logged.css";

const Logged = ({ logout }) => {
  const { user } = useContext(userContext);
  return (
    <ul>
      <li>
        <Link to="/player/profile">{user.pseudo}</Link>
      </li>
      <li className="logout" onClick={logout}>
        Déconnexion
      </li>
    </ul>
  );
};

export default Logged;
