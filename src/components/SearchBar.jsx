import React from "react";
import search_light from "../assets/search_light.png";
import search_dark from "../assets/search_dark.png";
import clear_light from "../assets/clear_light.png";
import clear_dark from "../assets/clear_dark.png";
import { useTheme } from "../context/ThemeContext";

export default function SearchBar({ value, onChange }) {
  const { darkMode } = useTheme();

  return (
    <div className="relative w-full max-w-[280px]">
      <img
        src={darkMode ? search_dark : search_light}
        alt="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search expenses or habits…"
        className="w-full pl-10 pr-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600
          bg-white dark:bg-[#4a5a64] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300
          focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {value && (
        <img
        src={darkMode ? clear_dark : clear_light}
          alt="clear"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer opacity-60 hover:opacity-100"
        />
      )}
    </div>
  );
}