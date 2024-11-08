import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: title,
          completed: false,
          userId: 5,
        }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-300">TODO LIST</h1>
      <TodoList todos={todos} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />

      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        Add Todo
      </button>
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-400 p-4 rounded shadow-lg w-80">
            <h2 className="text-xl mb-4">Add Todo</h2>
            <AddTodo onAdd={addTodo} />
            <button
              onClick={() => setShowAddForm(false)}
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
