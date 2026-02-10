import React, { useState, useEffect } from "react";
import habitImg from "../assets/habit.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";

export default function HabitForm({ isOpen, onClose, onSubmit, initialData }) {
  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [trackDaily, setTrackDaily] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setFrequency(initialData.frequency?.toString() || "");
      setCategory(initialData.category || "");
      setNotes(initialData.notes || "");
      setTrackDaily(initialData.trackDaily || false);
    }
  }, [initialData]);

  function handleSubmit() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Habit name is required";
    if (!frequency || Number(frequency) < 1 || Number(frequency) > 7)
      newErrors.frequency = "Frequency must be between 1 and 7";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const habitData = {
      id: initialData?.id ?? Date.now(),
      name: name.trim(),
      frequency: Number(frequency),
      category: category || "General",
      notes: notes.trim() || null,
      trackDaily: Number(frequency) === 7 ? trackDaily : false,
      weeklyProgress: 0,
      dailyStreak: Number(frequency) === 7 && trackDaily ? 0 : null,
      createdAt: initialData?.createdAt || new Date(),
    };

    if (!name || !category) {
      alert("Cannot save empty habit");
      return;
    }
    

    onSubmit(habitData);

    // Reset form
    setName("");
    setFrequency("");
    setCategory("");
    setNotes("");
    setShowNotes(false);
    setTrackDaily(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-10 w-[90%] max-w-3xl rounded-2xl bg-white/70 dark:bg-[#364e59]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
          <div className="hidden sm:flex sm:col-span-2 justify-center">
            <img src={habitImg} alt="Habit" className="w-56 h-56 object-contain" />
          </div>

          <div className="sm:col-span-3 w-full max-w-lg mx-auto text-gray-800 dark:text-white">
            <h2 className="text-lg font-bold mb-4 text-[#2f434d] dark:text-[#F8FAFC]">
              {initialData ? "Edit Habit" : "Add Habit"}
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">
                  Habit Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Morning Walk"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block mb-1">
                  Times per week <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64] focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 3"
                />
                {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
              </div>

              {frequency === "7" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Track Daily Streak</span>
                  <button
                    type="button"
                    onClick={() => setTrackDaily(!trackDaily)}
                    className={`w-12 h-6 rounded-full transition ${trackDaily ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full transform transition ${trackDaily ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              )}

              <div>
                <label className="block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#4a5a64]"
                >
                  <option value="">General</option>
                  <option value="Health">Health</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Learning">Learning</option>
                  <option value="Mindfullness">Mindfullness</option>
                  <option value="Productivity">Productivity</option>
                </select>
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
                  {initialData ? "Update" : "Add Habit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
