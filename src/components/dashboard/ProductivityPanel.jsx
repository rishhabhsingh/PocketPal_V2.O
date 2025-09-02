import React from 'react';

const ProductivityPanel = () => {
  const todos = [
    { id: 1, task: 'Finish DBMS assignment', done: false },
    { id: 2, task: 'Read 2 chapters of Math', done: true },
    { id: 3, task: 'Plan study calendar', done: false },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">📋 To-Do List</h2>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between">
            <span className={todo.done ? "line-through text-gray-400" : ""}>
              {todo.task}
            </span>
            <input type="checkbox" checked={todo.done} readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductivityPanel;
