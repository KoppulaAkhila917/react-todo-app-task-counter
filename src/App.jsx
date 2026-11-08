
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    const value = input.trim();
    if (!value) return;

    if (editId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId
            ? {
                ...todo,
                task: value,
                count: todo.count + 1,
              }
            : todo
        )
      );

      setEditId(null);
      setInput("");
      return;
    }

    const match = value.match(/^(.*?)(?:\s+(\d+))?$/);

    const taskName = match[1].trim();
    const quantity = match[2] ? Number(match[2]) : 1;

    if (!taskName || quantity < 1) return;

    const newTodos = Array.from(
      { length: quantity },
      () => ({
        id: crypto.randomUUID(),
        task: taskName,
        count: 0,
      })
    );

    setTodos((prev) => [...prev, ...newTodos]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (todo) => {
    setInput(todo.task);
    setEditId(todo.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>What's the Plan for Today?</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Add a todo (e.g. Make Food 3)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={addTodo}>
            {editId !== null ? "Update Todo" : "Add Todo"}
          </button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-item" key={todo.id}>
              <span>
                {todo.task} (Updated {todo.count} times)
              </span>

              <div className="actions">
                <button
                  className="delete"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete"
                >
                  ✖
                </button>

                <button
                  className="edit"
                  onClick={() => editTodo(todo)}
                  title="Edit"
                >
                  ✎
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
