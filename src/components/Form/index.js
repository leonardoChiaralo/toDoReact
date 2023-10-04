import { useState } from "react";
import "./Form.css";

const Form = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [isVisible, setIsVsisible] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
    setIsVsisible(false);
  };

  const handleCancel = () => {
    setIsVsisible(false);
  };

  return (
    <section className="form" style={{ display: isVisible ? "block" : "none" }}>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Text your task here!"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default Form;
