import React, { useState, useEffect } from "react";
import expense from "../assets/expense.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";

export default function ExpenseForm({ isOpen, onClose, onSubmit, initialData }) {
  const today = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setAmount(initialData.amount || "");
      setCategory(initialData.category || "");
      setDate(
        typeof initialData.date === "string"
          ? initialData.date
          : today
      );
      
      setNotes(initialData.notes || "");
    }
  }, [initialData]);

  if (!isOpen) return null;

  function handleSubmit() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is Required";
    if (!amount || Number(amount) <= 0) newErrors.amount = "Amount must be positive";
    if (!category.trim()) newErrors.category = "Category is Required";
    if (!date) newErrors.date = "Date is Required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const expenseData = {
      id: initialData?.id ?? Date.now(),
      title,
      amount: Number(amount),   
      category,
      date,
      notes: notes || "",      
    };
    

    if (!title || !amount || !category || !date) {
      alert("Cannot save empty expense");
      return;
    }    

    onSubmit(expenseData);

    // reset form
    setTitle("");
    setAmount("");
    setCategory("");
    setDate(today);
    setNotes("");
    setShowNotes(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-10 w-[90%] max-w-3xl rounded-2xl bg-white/70 dark:bg-[#364e59]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
          <div className="hidden sm:flex sm:col-span-2 justify-center">
            <img src={expense} alt="expense" className="w-56 h-56 object-contain" />
          </div>

          <div className="sm:col-span-3 w-full max-w-md mx-auto text-gray-800 dark:text-white">
            <h2 className="text-lg font-bold mb-4 text-center sm:text-left text-[#2f434d] dark:text-[#F8FAFC]">
              {initialData ? "Edit Expense" : "Add Expense"}
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Grocery"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block mb-1">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 50"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Health">Health</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel">Travel</option>
                  <option value="Rent">Rent</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                <button type="button" onClick={() => setDate(today)} className="mt-1 text-sm text-green-500 hover:underline">
                  Current
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowNotes(!showNotes)}
                  className="flex items-center gap-2 text-sm text-green-500 hover:underline mb-1"
                >
                  <img src={showNotes ? minus : plus} alt="plus" className="w-4 h-4" />
                  {showNotes ? "Hide Notes" : "Add Notes (Optional)"}
                </button>
                {showNotes && (
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Extra Details (Optional)"
                    rows={2}
                  />
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition transform duration-300 hover:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 rounded-lg bg-[#40C057] dark:bg-[#40C057] text-white hover:bg-[#37B24D] dark:hover:bg-[#37B24D] transform transition duration-300 hover:scale-95"
                >
                  {initialData ? "Update" : "Add Expense"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
