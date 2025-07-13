"use client";

import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import AddTransaction from "./AddTransaction.jsx";
import { toast } from "sonner";
import DeleteTransactionDialog from "@/components/dashboard/DeleteTransaction.jsx";

export default function Transaction({ transactions, loading, getTransactions, showSkeleton }) {
  const [selectedTxn, setSelectedTxn] = useState(null);
  const deletedTxnRef = useRef(null);

  const handleDelete = async () => {
    try {
      const txn = selectedTxn;
      deletedTxnRef.current = txn;
      setSelectedTxn(null);

      const res = await fetch(`/api/delete-transaction/${txn._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      
      toast.success("Transaction deleted", {
        action: {
          label: "Undo",
          onClick: async () => {
            const undoRes = await fetch(`/api/add-transaction`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: txn.title,
                amount: txn.amount,
                type: txn.type,
                date: txn.date,
                category: txn.category,
                userId: txn.userId,
              }),
            });

            if (!undoRes.ok) {
              toast.error("Failed to undo delete");
            } else {
              toast.success("Transaction restored");
              getTransactions();
            }
          },
        },
      });

      getTransactions(); 
    } catch (err) {
      toast.error("Error deleting transaction");
      console.error(err);
    }
  };

  return (
    <div className="px-4 py-4 bg-white">
      <h2 className="font-bold text-2xl flex justify-center mb-4">Transactions</h2>

      <div className="flex justify-end mb-4">
        <AddTransaction onAddSuccess={getTransactions} />
      </div>

      {loading ? (
        showSkeleton ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl bg-white shadow p-4"
              >
                <div className="skeleton w-1/3 h-4 mb-2"></div>
                <div className="skeleton w-1/4 h-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-10">
            <span className="loading loading-dots loading-xl text-primary"></span>
          </div>
        )
      ) : transactions?.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div>
          {transactions?.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl bg-white shadow-md p-4 mb-3 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{item.amount}
                  </span>

                  <DeleteTransactionDialog
                    item={item}
                    trigger={
                      <button onClick={() => setSelectedTxn(item)}>
                        <FaTrash className="text-red-500 hover:text-red-700 text-md" />
                      </button>
                    }
                    onConfirm={handleDelete}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
