import React from "react";
import trash from "../assets/trash.png";
import pencil from "../assets/pencil.png";
import streakIcon from "../assets/fire.png";
import HighlightText from "../components/HighlightText";
import { calculateWeeklyStreak } from "../utils/streak";

const CATEGORY_COLORS = {
  General: "#BFC9D1",
  Health: "#40C057",
  Fitness: "#5B23FF",
  Learning: "#B13BFF",
  Productivity: "#FAB95B",
  Mindfullness: "#F075AE",
};

export default function AllHabits({
  habits = [],
  onDelete,
  onEdit,
  markHabitDone,
  searchTerm = "",
}) {
  const normalizedSearch = searchTerm.toLowerCase();
  const today = new Date().toISOString().slice(0, 10);

  const filteredHabits = habits.filter(
    (h) =>
      h.name?.toLowerCase().includes(normalizedSearch) ||
      h.category?.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-[#2f434d] dark:text-white">
        All Habits
      </h2>

      {filteredHabits.length === 0 && (
        <p className="text-md opacity-80 text-[#4B5563] dark:text-gray-300 text-center">
          {searchTerm
            ? "No habits match your search."
            : "No habits yet. Add one!"}
        </p>
      )}

      {filteredHabits.map((habit) => {
        const cardColor =
          CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.General;

        const completedDates = habit.completedDates || [];
        const doneToday = completedDates.includes(today);
        const canTrackStreak = habit.frequency === 7 && habit.trackDaily;

        const streakValue = canTrackStreak
          ? calculateWeeklyStreak(habit) ?? 0
          : 0;

        return (
          <div
            key={habit.id}
            className="relative rounded-xl p-4 shadow-lg shadow-black/10 dark:shadow-black/40"
            style={{ backgroundColor: cardColor }}
          >
            <img
              src={pencil}
              alt="edit"
              onClick={() => onEdit(habit.id)}
              className="absolute top-3 right-10 w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
            />

            <img
              src={trash}
              alt="delete"
              onClick={() => onDelete(habit.id)}
              className="absolute top-3 right-3 w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
            />

            <img
              src={streakIcon}
              alt="mark done"
              title={
                !canTrackStreak
                  ? "Streak inactive"
                  : doneToday
                  ? "Already marked today"
                  : "Mark today done"
              }
              onClick={() => {
                if (canTrackStreak && !doneToday) markHabitDone(habit.id);
              }}
              className={`absolute top-2.5 right-16 w-5 h-5 cursor-pointer transition-opacity duration-200 ${
                !canTrackStreak || doneToday
                  ? "opacity-30 pointer-events-none"
                  : "opacity-90 hover:opacity-100"
              }`}
            />

            <p className="font-medium text-lg text-[#F8FAFC]">
              <HighlightText text={habit.name} highlight={searchTerm} />
            </p>

            {habit.category && (
              <span className="inline-block mt-1 mb-2 px-2 py-0.5 text-sm rounded-full bg-black/10 dark:bg-white/10 text-[#F8FAFC]">
                <HighlightText text={habit.category} highlight={searchTerm} />
              </span>
            )}

            {habit.notes && (
              <p className="text-sm text-[#F8FAFC] opacity-90 mt-1">
                📝 {habit.notes}
              </p>
            )}

            {canTrackStreak && (
              <div className="flex justify-between items-center mt-1 text-[#F8FAFC]">
                <p className="text-md">
                  🔥 Streak: {streakValue}{" "}
                  {streakValue === 1 ? "day" : "days"}
                </p>

                {doneToday ? (
                  <span className="text-[#F8FAFC] text-xs">✔️ Today done</span>
                ) : (
                  <span className="text-yellow-300 font-medium text-xs">
                    ⏳ Not done today
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
