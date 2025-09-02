"use client";
import { useState } from "react";

export default function AddTaskForm() {
  const [task, setTask] = useState("");

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    alert("✅ Task saved (not really, this is a mock)");
    setTask("");
  };

  return (
    <div className="bg-green-50 dark:bg-green-900 text-green-900 dark:text-white p-5 rounded-xl shadow-lg transition hover:scale-[1.01] duration-300">
      <h2 className="text-lg font-bold mb-3">➕ Add Task (Fake)</h2>
      <form onSubmit={handleFakeSubmit} className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 p-2 rounded border border-green-300 dark:border-green-600 bg-white dark:bg-gray-800"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
