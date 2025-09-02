import React from 'react';

const dummyTransactions = [
  { id: 1, type: 'Income', category: 'Scholarship', amount: 6000, date: '2025-08-01' },
  { id: 2, type: 'Expense', category: 'Books', amount: 1200, date: '2025-08-02' },
  { id: 3, type: 'Expense', category: 'Snacks', amount: 350, date: '2025-08-03' },
  { id: 4, type: 'Income', category: 'Part-Time Job', amount: 3000, date: '2025-08-04' },
];

const TransactionsTable = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition hover:shadow-xl hover:scale-[1.01] duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📒 Recent Transactions</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 text-left">Date</th>
            <th className="py-2 text-left">Type</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {dummyTransactions.map(txn => (
            <tr key={txn.id} className="border-b border-gray-100">
              <td className="py-2">{txn.date}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-white text-xs ${txn.type === 'Income' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {txn.type}
                </span>
              </td>
              <td className="py-2">{txn.category}</td>
              <td className="py-2 font-semibold text-right text-gray-800 dark:text-white">₹ {txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
