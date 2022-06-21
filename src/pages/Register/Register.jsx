import { useState } from "react";
import { newUser } from "../../services/userApi";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const player = { email: email, pseudo: pseudo, password: password };

      newUser(player).then(() => {
        setMessage("Vous êtes bien inscrit en tant que nouveau Joueur Félicitations");
        setError("");
        setPseudo("");
        setEmail("");
        setPassword("");
      });
    } else setError("All fields are required");
  };

  return (
    <div className="Register">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input type="text" value={email} placeholder="Mail" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" value={pseudo} placeholder="Pseudo" onChange={(e) => setPseudo(e.target.value)} />
        <input type="password" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Inscription</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
