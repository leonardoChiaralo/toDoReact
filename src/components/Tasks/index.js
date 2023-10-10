import "./Tasks.css";

const Tasks = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className="content">
        <p>{todo.text}</p>
      </div>

      <div>
        <button className="complete" onClick={() => completeTodo(todo._id)}>
          Complete
        </button>
        <button className="remove" onClick={() => removeTodo(todo._id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Tasks;
