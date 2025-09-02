"use client";

export default function RemindersCard() {
  const reminders = [
    { time: "9:00 AM", task: "Submit DBMS Assignment" },
    { time: "1:00 PM", task: "Team Meeting for Project" },
    { time: "7:30 PM", task: "Revise OOP Concepts" },
  ];

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 p-5 rounded-xl shadow-lg transition hover:scale-[1.01] duration-300">
      <h2 className="text-lg font-bold mb-3">🔔 Today’s Reminders</h2>
      <ul className="space-y-2 text-sm">
        {reminders.map((r, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{r.task}</span>
            <span className="text-xs">{r.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
