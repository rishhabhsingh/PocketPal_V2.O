"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

export default function AddTransaction({ onAddSuccess }) {
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investment",
    "Gift",
    "Other Income",
  ];

  const expenseCategories = [
    "Food",
    "Rent",
    "Travel",
    "Entertainment",
    "Shopping",
    "Health",
    "Bills & Utilities",
    "Education",
    "Other Expenses",
  ];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "type" && { category: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/add-transaction", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Transaction Added Successfully");
        setOpen(false);

        setForm({
          title: "",
          amount: "",
          type: "expense",
          date: "",
          category: "",
        });

        if (onAddSuccess) {
          onAddSuccess();
        }
      } else {
        console.error("Error saving transaction:", data.error);
        toast.error("Error While Adding Transaction");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaPlus className="text-2xl cursor-pointer bg-blue-100 p-2 rounded-full hover:shadow-md" />
      </DialogTrigger>

      <DialogContent className="w-full max-w-xs sm:max-w-[425px] p-2 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Add a transaction to your list to get analysis.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Rent, Groceries"
                value={form.title}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <select
                name="type"
                id="type"
                value={form.type}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="">Select a category</option>
                {(form.type === "income"
                  ? incomeCategories
                  : expenseCategories
                ).map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !form.date ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? (
                      format(form.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-xs p-0">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => {
                      if (date) {
                        setForm((prev) => ({ ...prev, date }));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-auto">Add Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
