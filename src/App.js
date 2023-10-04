import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Form from "./components/Form";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Teste 1",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Teste 2",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Teste 3",
      isCompleted: false,
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);

  const showContainer = () => {
    setShowAdd(!showAdd);
  };

  const addTodo = (text) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        isCompleted: false,
      },
    ];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <Header />
      <section className="tasks">
        <h2>Your Tasks</h2>

        <div>
          {todos.map((todo) => (
            <Tasks
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
        </div>
      </section>
      <section className="addBtn">
        <input type="button" value="Add Task" onClick={showContainer} />
        {showAdd && <Form addTodo={addTodo} />}
      </section>
    </div>
  );
}

export default App;
