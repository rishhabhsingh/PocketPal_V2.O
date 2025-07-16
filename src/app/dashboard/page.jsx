"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Transaction from "@/components/dashboard/Transaction";
import Header from "@/components/ui/Header";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const getTransactions = async () => {
    try {
      const res = await fetch("/api/get-transaction");
      const data = await res.json();

      if (res.ok) setTransactions(data.transaction);
      else console.error(data.error);
    } catch (err) {
      console.error("Error fetching transactions", err);
    } finally {
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, 400);

    getTransactions();

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)] gap-4 p-2 sm:p-4">
        <div className="lg:flex-[1] w-full lg:w-auto mb-4 lg:mb-0">
          <Sidebar transactions={transactions} />
        </div>
        <div className="lg:flex-[2] w-full lg:w-auto">
          <Transaction
            transactions={transactions}
            loading={loading}
            showSkeleton={showSkeleton}
            getTransactions={getTransactions}
          />
        </div>
      </div>
    </>
  );
}
