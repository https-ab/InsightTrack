import React from "react";
import trash from "../assets/trash.png";
import HighlightText from "./HighlightText";
import pencil from "../assets/pencil.png";

export default function Expenses({ expenses, onDelete, onEdit, searchTerm, showTitle = true }) {
  const normalizedSearch = searchTerm?.toLowerCase() || "";

  const filteredExpenses = expenses.filter((expense) =>
    expense.title?.toLowerCase().includes(normalizedSearch) ||
    expense.category?.toLowerCase().includes(normalizedSearch) ||
    expense.notes?.toLowerCase().includes(normalizedSearch)
  );

  const recentExpenses = [...filteredExpenses].reverse().slice(0, 3);

  return (
    <div
      className="flex-1 rounded-xl p-4 shadow-lg shadow-black/10 dark:shadow-black/40
                 bg-white/80 dark:bg-[#364e59]/80 backdrop-blur"
    >
      {/* <h3 className="text-lg font-semibold mb-4 text-[#2f434d] dark:text-[#F8FAFC]">
        Recent Expenses
      </h3> */}

      {expenses.length === 0 && (
        <p className="text-md opacity-80 text-[#4B5563] dark:text-gray-300">
          {searchTerm
      ? "No expenses match your search."
      : "Every rupee has a story, add the first one."}
        </p>
      )}

      {/* Expenses exist but search found nothing */}
      {expenses.length > 0 && recentExpenses.length === 0 && (
        <p className="text-md opacity-80 text-[#4B5563] dark:text-gray-300">
          No matches found. Try a different keyword 🔍
        </p>
      )}

      {recentExpenses.length > 0 && (
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="relative rounded-lg p-3
                         bg-[#40C057] dark:bg-[#40C057]"
            >

<img
                src={pencil}
                alt="edit"
                onClick={() => onEdit(expense.id)}
                className="absolute top-3 right-10 w-3 h-3 sm:w-4 sm:h-4
                           cursor-pointer opacity-70 hover:opacity-100"
              />

              <img
                src={trash}
                alt="delete"
                onClick={() => onDelete(expense.id)}
                className="absolute top-3 right-3 w-3 h-3 sm:w-4 sm:h-4
                           cursor-pointer opacity-70 hover:opacity-100"
              />

<p className="font-medium text-lg text-[#F8FAFC]">
  <HighlightText
    text={expense.title}
    highlight={searchTerm}
  />
</p>


<p className="text-md text-[#F8FAFC]">
  ₹{expense.amount} •{" "}
  <HighlightText
    text={expense.category}
    highlight={searchTerm}
  />
</p>


              <p className="text-sm opacity-60 text-[#F8FAFC]">
                {expense.date
                  ? new Date(expense.date).toLocaleDateString()
                  : "-"}
              </p>

              {expense.notes && (
  <p className="mt-2 text-sm italic opacity-80">
    “<HighlightText
      text={expense.notes}
      highlight={searchTerm}
    />”
  </p>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
