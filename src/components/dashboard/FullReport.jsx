"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function FullReport({ transactions, children }) {
  const [aiInsight, setAiInsight] = useState("Loading AI insight...");

  useEffect(() => {
    const fetchInsight = async () => {
      if (!transactions || transactions.length === 0) {
        setAiInsight("Add some transactions to get insights.");
        return;
      }

      try {
        const res = await fetch("/api/ai-insight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactions: transactions,
            mode: "full",
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
  }, [transactions]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xs sm:max-w-lg p-2 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Detailed Report</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Here's your complete income/expense breakdown.
          </DialogDescription>
        </DialogHeader>
        <p className="mt-2 text-gray-600 text-xs sm:text-sm whitespace-pre-line break-words">{aiInsight}</p>
        <DialogClose asChild>
          <Button className="mt-4 w-full sm:w-auto" variant="outline">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
