import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import day_and_night from "../assets/day_and_night.png";
import help_icon from "../assets/help_icon.png";
import help_icon_dark from "../assets/help_icon_dark.png";

export default function Header({ onHelpClick }) {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Expenses", path: "/expenses" },
    { name: "Habits", path: "/habits" },
  ];

  return (

    <header className="fixed top-0 left-0 w-full bg-white dark:bg-[#364e59] shadow-md z-50">
  <div className=" px-6 py-4 flex justify-between items-center">
    {/* Header content */}
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        <img src={logo} alt="logo" className="w-6 h-6 sm:w-10 sm:h-10" />
        <h1 className="text-xl sm:text-3xl font-bold text-[#364e59] dark:text-white">
          InsightTrack
        </h1>
      </div>

      {/* Center: Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-sm sm:text-base font-medium mx-auto">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-green-500"
                : "text-gray-700 dark:text-white hover:text-green-500"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Right: Icons + Hamburger */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Theme toggle */}
        <img
          src={day_and_night}
          alt="Toggle Theme"
          onClick={toggleTheme}
          className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
          title="Toggle Theme"
        />

        {/* Help icon */}
        <img
          src={darkMode ? help_icon_dark : help_icon}
          alt="Help"
          title="Help"
          onClick={onHelpClick}
          className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer transition-transform duration-200 hover:scale-110"
        />

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`block h-0.5 w-full bg-gray-700 dark:bg-white transform transition duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-gray-700 dark:bg-white transition duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-gray-700 dark:bg-white transform transition duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
  <div className="absolute top-full left-0 w-full bg-white dark:bg-[#364e59] shadow-md border-t border-gray-200 dark:border-[#364e59] flex flex-col md:hidden z-50 transition-all duration-200 ease-out">
    {navLinks.map((link) => (
      <NavLink
        key={link.name}
        to={link.path}
        onClick={() => setMobileMenuOpen(false)}
        className={({ isActive }) =>
          `px-4 py-3 text-lg font-medium ${
            isActive
              ? "text-green-500"
              : "text-gray-700 dark:text-white hover:text-green-500"
          }`
        }
      >
        {link.name}
      </NavLink>
    ))}
  </div>
)}

  </div>
</header>

    
  );
}
