import "./Radio.css";

const Radio = ({ value, group, label }) => {
  return (
    <div className="Radio">
      <input type="radio" name={group} id={value} value={value} />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default Radio;
