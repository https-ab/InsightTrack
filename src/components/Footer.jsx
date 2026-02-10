import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#364e59] text-[#2f434d] dark:text-gray-300 mt-16 pt-12 pb-8 px-6 shadow-inner">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* --- About / Branding --- */}
        <div>
          <h3 className="text-2xl font-bold mb-3 text-[#2f434d] dark:text-white">
            InsightTrack
          </h3>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            Track your expenses and habits seamlessly. Stay consistent, stay productive!
          </p>
        </div>

        {/* --- Navigation --- */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm sm:text-base opacity-85">
            <li>
              <a href="/" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/expenses" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                Expenses
              </a>
            </li>
            <li>
              <a href="/habits" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                Habits
              </a>
            </li>
          </ul>
        </div>

        {/* --- Contact / Social --- */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm sm:text-base opacity-85">
            <li>
              Email: <a href="mailto:anushkab20021130@gmail.com" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                anushkab20021130@gmail.com
              </a>
            </li>
            <li>
              Phone: <a href="tel:+918806149238" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                +91 XXXXXXXXXX
              </a>
            </li>
            <li className="flex space-x-4 mt-2">
              <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                LinkedIn
              </a>
              <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 dark:hover:text-green-400 transition-colors">
                Instagram
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* --- Bottom Bar --- */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-600 pt-4 text-center text-sm sm:text-base opacity-80">
        &copy; {year} InsightTrack. All rights reserved.
      </div>
    </footer>
  );
}
