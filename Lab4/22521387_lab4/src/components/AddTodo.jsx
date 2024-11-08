// AddTodo.jsx
import React, { useState } from 'react';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Add new todo"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Add</button>
    </form>
  );
}

export default AddTodo;
