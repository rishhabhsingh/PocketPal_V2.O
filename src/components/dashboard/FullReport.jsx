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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detailed Report</DialogTitle>
          <DialogDescription>
            Here's your complete income/expense breakdown.
          </DialogDescription>
        </DialogHeader>

        <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">{aiInsight}</p>

        <DialogClose asChild>
          <Button className="mt-4" variant="outline">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
