import React from "react";
import Expenses from "../components/Expenses";
import Habits from "../components/Habits";
import DashboardCards from "../components/DashboardCards";
import streak from "../assets/fire.png";

export default function Dashboard({
  expenses,
  habits,
  todayExpense,
  monthlyExpense,
  totalHabits,
  onEditExpense,
  onEditHabit,
  onDeleteExpense,
  onDeleteHabit,
  searchTerm,
  markHabitDone, // ✅ NEW
}) {
  // recent 3 items
  const recentExpenses = [...expenses].sort((a, b) => b.id - a.id).slice(0, 3);
  const recentHabits = [...habits].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* DashboardCards centered */}
      <div className="flex justify-center mt-6">
        <DashboardCards
          todayExpense={todayExpense}
          monthlyExpense={monthlyExpense}
          totalHabits={totalHabits}
          className="text-gray-800 dark:text-white" // dark theme text
        />
      </div>

      {/* Recent items side by side */}
      <div className="px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row gap-6">
        {/* Recent Expenses */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 text-[#2f434d] dark:text-[#F8FAFC]">
            Recent Expenses
          </h2>
          <Expenses
            expenses={recentExpenses}
            onEdit={onEditExpense}
            onDelete={onDeleteExpense}
            searchTerm={searchTerm} // pass searchTerm for HighlightText
          />
        </div>

        {/* Recent Habits */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 text-[#2f434d] dark:text-[#F8FAFC]">
            Recent Habits
          </h2>
          <Habits
            habits={recentHabits}
            onEdit={onEditHabit}
            onDelete={onDeleteHabit}
            searchTerm={searchTerm}
            markHabitDone={markHabitDone} // ✅ pass through
            showStreak={true}
          />
        </div>
      </div>
    </div>
  );
}
