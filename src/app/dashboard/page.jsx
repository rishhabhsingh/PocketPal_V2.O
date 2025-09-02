"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Transaction from "@/components/dashboard/Transaction";
import Header from "@/components/ui/Header";
import ProductivityPanel from "@/components/dashboard/ProductivityPanel";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import DetailedReport from "@/components/dashboard/DetailedReport";
import RemindersCard from "@/components/dashboard/RemindersCard";
import CalendarPreview from "@/components/dashboard/CalendarPreview";
import AddTaskForm from "@/components/dashboard/AddTaskForm";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const getTransactions = async () => {
    try {
      // Dummy transaction data for demo
      const data = [
        { id: 1, type: 'Income', category: 'Scholarship', amount: 5000, date: '2025-08-01' },
        { id: 2, type: 'Expense', category: 'Books', amount: 1200, date: '2025-08-02' },
        { id: 3, type: 'Expense', category: 'Snacks', amount: 350, date: '2025-08-03' },
      ];
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(true), 400);
    getTransactions();
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />

      {/* Full Page Container */}
      <div className="flex flex-col lg:flex-row gap-6 bg-gray-50 dark:bg-black min-h-screen p-4">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <Sidebar transactions={transactions} />
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300">
              🎒 PocketPal++ Dashboard
            </h1>

            {/* Section 1: Financial Overview */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">💸 Financial Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailedReport />
                <Transaction
                  transactions={transactions}
                  loading={loading}
                  showSkeleton={showSkeleton}
                  getTransactions={getTransactions}
                />
              </div>
              <TransactionsTable />
            </section>

            {/* Section 2: Productivity */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">📅 Productivity Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RemindersCard />
                <CalendarPreview />
                <AddTaskForm />
              </div>
              <ProductivityPanel />
            </section>
          </motion.div>
        </main>
      </div>
    </>
  );
}
