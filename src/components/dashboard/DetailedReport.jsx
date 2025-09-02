import React from 'react';

const DetailedReport = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-900 rounded-xl shadow-lg p-6 transition hover:scale-[1.01] duration-300">
      <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">📄 Financial Summary Report</h2>
      <ul className="space-y-3 text-gray-700 dark:text-gray-200">
        <li>✅ Your spending this week is 15% lower than the previous week.</li>
        <li>📈 You spent most on Books and Food.</li>
        <li>🧠 AI Tip: Set a weekly cap for Snacks & Coffee to avoid leakage.</li>
        <li>💰 Savings Potential: ₹1500/month if you skip unnecessary purchases.</li>
      </ul>
    </div>
  );
};

export default DetailedReport;
