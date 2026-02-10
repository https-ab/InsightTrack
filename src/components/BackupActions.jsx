import React from "react";
import { useRef } from "react";
import importData from "../assets/import.png";
import exportData from "../assets/export.png";

export default function BackupActions({ expenses, habits, setExpenses, setHabits }) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const data = {
      expenses,
      habits,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insighttrack-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
  
        // 🔥 STRONG VALIDATION
        if (
          Array.isArray(importedData.expenses) &&
          Array.isArray(importedData.habits)
        ) {
          setExpenses(importedData.expenses);
          setHabits(importedData.habits);
  
          localStorage.setItem(
            "lastBackupImported",
            new Date().toISOString()
          );
  
          alert("Backup imported successfully ✅");
        } else {
          alert("Invalid backup structure ❌");
        }
      } catch {
        alert("Corrupt or unreadable backup file ❌");
      }
    };
  
    reader.readAsText(file);
  };
  
  

  return (
    <div
      className="
      fixed bottom-6 left-6
      flex items-center gap-2
      bg-[#40C057] dark:bg-[#40C057]
      px-4 py-3 rounded-full shadow-lg z-50
      "
    >
      {/* EXPORT BUTTON */}
      <img
        src={exportData}
        alt="Export"
        title="Export Data"
        onClick={handleExport}
        className="
          w-8 h-8
          cursor-pointer
          transition-transform duration-200
          hover:scale-110
          active:scale-95
        "
      />

<div className="h-10 w-[1px] bg-white/60 mx-1"></div>

      {/* IMPORT BUTTON */}
      <img
        src={importData}
        alt="Import"
        title="Import Data"
        onClick={handleImportClick}
        className="
          w-8 h-8
          cursor-pointer
          transition-transform duration-200
          hover:scale-110
          active:scale-95
        "
      />

      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}