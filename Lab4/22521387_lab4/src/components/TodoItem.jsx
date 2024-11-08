import React from 'react';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="flex items-center justify-between p-2 border-b ">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />
      <span className={`${todo.completed ? 'line-through' : ''}`}>{todo.todo}</span>
      <button onClick={() => onDelete(todo.id)} className="text-red-600 bg-red-300">Delete</button>
    </div>
  );
}

export default TodoItem;
