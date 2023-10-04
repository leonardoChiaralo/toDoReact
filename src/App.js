import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Form from "./components/Form";
import AddBtn from "./components/AddBtn";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      isCompleted: false,
    },
  ]);

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
      <AddBtn />
      <Form addTodo={addTodo} />
    </div>
  );
}

export default App;
