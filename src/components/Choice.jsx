import React from "react";
import clear_dark from "../assets/clear_dark.png";
import clear_light from "../assets/clear_light.png";
import { useTheme } from "../context/ThemeContext";

export default function Choice({ isOpen, onClose, onSelect }) {
  const { darkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className="relative z-10
                   w-[90%] max-w-md
                   rounded-xl
                   bg-white/90 dark:bg-[#364e59]/90
                   backdrop-blur-2px
                   p-6
                   text-gray-800 dark:text-white
                   shadow-xl"
      >
        <img
          src={darkMode ? clear_dark : clear_light}
          alt="close"
          className="absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6
                     cursor-pointer opacity-70 hover:opacity-100"
          onClick={onClose}
        />

        <h2 className="text-lg font-bold mb-4 text-center text-[#2f434d] dark:text-[#F8FAFC]">
          What do you want to add?
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onSelect("expense")}
            className="flex-1 py-2 rounded-lg
            bg-[#40C057] dark:bg-[#40C057]
            text-white
            hover:bg-[#37B24D] dark:hover:bg-[#37B24D]
            transform transition duration-300 hover:scale-95"
          >
            Add Expense
          </button>

          <button
            onClick={() => onSelect("habit")}
            className="flex-1 py-2 rounded-lg
            bg-[#40C057] dark:bg-[#40C057]
            text-white
            hover:bg-[#37B24D] dark:hover:bg-[#37B24D]
            transform transition duration-300 hover:scale-95"
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
