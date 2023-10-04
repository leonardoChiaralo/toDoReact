import { useState } from "react";
import "./Form.css";

const Form = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Text your task here!"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default Form;
