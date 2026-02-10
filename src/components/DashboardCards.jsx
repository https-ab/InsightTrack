import React from "react";
import { FaWallet, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export default function DashboardCards({todayExpense, monthlyExpense, totalHabits}) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="rounded-xl bg-[#40C057] text-white shadow
                flex flex-col items-center justify-center
                h-32 w-full
                transform transition duration-300 hover:scale-95 hover:shadow-lg">
          <FaWallet className="text-2xl mb-2" />
          <p className="text-lg opacity-80">Today’s Expense</p>
          <p className="mt-1 text-xl font-bold">₹{todayExpense}</p>
        </div>

        <div className="rounded-xl bg-[#40C057] text-white shadow
                flex flex-col items-center justify-center
                h-32 w-full
                transform transition duration-300 hover:scale-95 hover:shadow-lg">
          <FaCalendarAlt className="text-2xl mb-2" />
          <p className="text-lg opacity-80">This Month</p>
          <p className="mt-1 text-xl font-bold">₹{monthlyExpense}</p>
        </div>

        <div className="rounded-xl bg-[#40C057] text-white shadow
                flex flex-col items-center justify-center
                h-32 w-full
                transform transition duration-300 hover:scale-95 hover:shadow-lg">
          <FaCheckCircle className="text-2xl mb-2" />
          <p className="text-lg opacity-80">Active Habits</p>
          <p className="mt-1 text-xl font-bold">{totalHabits}</p>
        </div>

      </div>
    </div>
  );
}
