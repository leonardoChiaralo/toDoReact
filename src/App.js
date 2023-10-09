import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos.length > 0) return;
    list();
  }, [todos]);

  const [showAdd, setShowAdd] = useState(false);

  const list = async () => {
    try {
      const response = await axios.get("/list");
      console.log(response);
      setTodos(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const showContainer = () => {
    setShowAdd(!showAdd);
  };

  const addTodo = async (text) => {
    const newTodo = {
      text,
      isCompleted: false,
    };
    try {
      await axios.post("/", newTodo);
    } catch (err) {
      console.error(err);
    }

    setTodos([]);
  };

  const removeTodo = async (todos) => {
    try {
      await axios.delete(`/list/${todos._id}`, { method: "DELETE" });
      todos.remove();
    } catch (err) {
      console.error(err);
    }

    setTodos([]);
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
              key={todo._id}
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
