import { useState, useContext } from "react";
import { userContext } from "../../contexts/userContext.js";
import { login, me } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const { setUser, setIsAuthenticated, setRefresh } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      login(email, password)
        .then(({ data }) => {
          api.defaults.headers.common["authorization"] = `Bearer ${data?.data.access_token}`;
          setRefresh(data?.data.refresh_token);
        })
        .then(() => {
          me().then(({ data }) => {
            setUser(data.data);
            setIsAuthenticated(true);
            navigate(`/player/profile`);
          });
        });
    } else {
      setError("Veuillez entrez l'email et le mot de passe");
    }
  };

  return (
    <div className="Login">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input type="text" value={email} placeholder="Mail" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se Connecter</button>
      </form>
    </div>
  );
};

export default Login;
