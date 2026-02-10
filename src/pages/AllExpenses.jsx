// pages/AllExpenses.jsx
import React from "react";
import trash from "../assets/trash.png";
import pencil from "../assets/pencil.png";
import HighlightText from "../components/HighlightText";

export default function AllExpenses({ expenses, onEdit, onDelete, searchTerm }) {
  const normalizedSearch = searchTerm?.toLowerCase() || "";

  const filteredExpenses = expenses.filter((expense) =>
    expense.title?.toLowerCase().includes(normalizedSearch) ||
    expense.category?.toLowerCase().includes(normalizedSearch) ||
    expense.notes?.toLowerCase().includes(normalizedSearch)
  );

  const recentExpenses = [...filteredExpenses].reverse();

  return (
    <div className="px-4 sm:px-6 lg:px-10 mt-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-[#2f434d] dark:text-white mb-4 text-left">
          All Expenses
        </h2>

        {recentExpenses.length === 0 ? (
          <p className="text-md opacity-80 text-[#4B5563] dark:text-gray-300 text-center">
            {searchTerm
              ? "No expenses match your search."
              : "No expenses added yet."}
          </p>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="relative rounded-lg p-4 bg-[#40C057] dark:bg-[#40C057]"
              >
                {/* Edit/Delete */}
                <img
                  src={pencil}
                  alt="edit"
                  onClick={() => onEdit(expense.id)}
                  className="absolute top-3 right-10 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer opacity-80 hover:opacity-100"
                />
                <img
                  src={trash}
                  alt="delete"
                  onClick={() => onDelete(expense.id)}
                  className="absolute top-3 right-3 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer opacity-80 hover:opacity-100"
                />

                {/* Title */}
                <p className="font-bold text-lg sm:text-xl text-[#F8FAFC]">
                  <HighlightText text={expense.title} highlight={searchTerm} />
                </p>

                {/* Category & Amount */}
                <p className="text-md text-[#F8FAFC] mt-1">
                  ₹{expense.amount} •{" "}
                  <HighlightText text={expense.category} highlight={searchTerm} />
                </p>

                {/* Date */}
                <p className="text-sm opacity-60 text-[#F8FAFC]">
                  {expense.date ? new Date(expense.date).toLocaleDateString() : "-"}
                </p>

                {/* Notes */}
                {expense.notes && (
                  <p className="mt-2 text-sm italic opacity-80 text-[#F8FAFC]">
                    “<HighlightText text={expense.notes} highlight={searchTerm} />”
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
