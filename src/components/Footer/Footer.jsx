import "./Footer.css";

const Footer = ({ game }) => {
  return (
    <footer>
      <span>Tour N° : {game.turn}</span>
      <span>Phase : {game.phase}</span>
    </footer>
  );
};

export default Footer;
