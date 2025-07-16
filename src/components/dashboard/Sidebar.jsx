"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import ExpensePieChart from "./Expensechartpie";
import FullReport from "./FullReport";

function filterByTime(transactions, filter) {
  const now = new Date();

  return transactions.filter((t) => {
    const txDate = new Date(t.date);

    if (filter === "day") {
      return txDate.toDateString() === now.toDateString();
    }

    if (filter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return txDate >= oneWeekAgo;
    }

    if (filter === "month") {
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    }

    // Default case: "all"
    return true;
  });
}

export default function Sidebar({ transactions = [] }) {
  const [filter, setFilter] = useState("month");
  const [aiInsight, setAiInsight] = useState("Loading AI insight...");

  const filteredTransactions = useMemo(
    () => filterByTime(transactions, filter),
    [transactions, filter]
  );

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  useEffect(() => {
    const fetchInsight = async () => {
      if (filteredTransactions.length === 0) {
        setAiInsight("Add some transactions to get insights.");
        return;
      }

      try {
        const res = await fetch("/api/ai-insight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactions: filteredTransactions,
            mode: "one-liner",
          }),
        });

        const data = await res.json();
        setAiInsight(data.output || "No insight available.");
      } catch (err) {
        console.error("Insight Error:", err);
        setAiInsight("Failed to load insight.");
      }
    };

    fetchInsight();
  }, [filteredTransactions]);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md w-full max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-center">Expense Breakdown</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none w-full sm:w-auto mt-2 sm:mt-0"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
      <div className="mb-6 w-full flex justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <ExpensePieChart transactions={filteredTransactions} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between text-center mb-4 gap-2">
        <div className="flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600">Income</h3>
          <p className="text-green-600 font-semibold text-base sm:text-lg">₹{totalIncome}</p>
        </div>
        <div className="flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600">Expense</h3>
          <p className="text-red-600 font-semibold text-base sm:text-lg">₹{totalExpense}</p>
        </div>
      </div>
      <div className="text-center mb-6">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600">Net Balance</h3>
        <p
          className={`text-lg sm:text-xl font-bold ${
            netBalance >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          ₹{netBalance}
        </p>
      </div>
      <p className="font-bold text-gray-700 mb-4 break-words text-sm sm:text-base">
        💡 {aiInsight}
      </p>
      <div className="flex justify-center mt-4">
        <FullReport transactions={filteredTransactions}>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm shadow-lg transition duration-200 tracking-wide w-full sm:w-auto">
            View Full Report
          </Button>
        </FullReport>
      </div>
    </div>
  );
}
