import "./Input.css";

const Input = ({ name, onChange, type }) => {
  return <input type={type} name={name} id={name} onChange={onChange} />;
};

export default Input;
