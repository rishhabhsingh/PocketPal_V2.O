"use client";

export default function CalendarPreview() {
  return (
    <div className="bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-white p-5 rounded-xl shadow-lg transition hover:scale-[1.01] duration-300">
      <h2 className="text-lg font-bold mb-3">📅 Study Calendar</h2>
      <div className="text-sm italic">
        <p>📘 DBMS Revision — Aug 7</p>
        <p>📝 AI Test — Aug 10</p>
        <p>📖 Practice Leetcode — Daily 2 Questions</p>
      </div>
    </div>
  );
}
