import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <div className="mt-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default TodoList;
