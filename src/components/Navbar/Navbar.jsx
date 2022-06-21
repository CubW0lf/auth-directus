import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import Logged from "../Logged/Logged";
import NotLogged from "../NotLogged/NotLogged";
import { disconnect } from "../../services/userApi";
import "./Navbar.css";

const Navbar = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, refresh } = useContext(userContext);

  const logout = () => {
    disconnect(refresh);
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <nav className="Navbar">
      <h1>
        <Link to="/">Oriflamme</Link>
      </h1>
      {isAuthenticated ? <Logged logout={logout} /> : <NotLogged />}
    </nav>
  );
};

export default Navbar;
