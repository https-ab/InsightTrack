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

export default function Habits({
  habits = [],
  onEdit,
  onDelete,
  searchTerm = "",
  markHabitDone,
}) {
  const normalizedSearch = searchTerm.toLowerCase();
  const today = new Date().toISOString().slice(0, 10);

  const filteredHabits = habits.filter(
    (h) =>
      h.name?.toLowerCase().includes(normalizedSearch) ||
      h.category?.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex-1 rounded-xl p-4 shadow-lg shadow-black/10 dark:shadow-black/40 bg-white/80 dark:bg-[#364e59]/80 backdrop-blur">
      {filteredHabits.length === 0 ? (
        <p className="text-md opacity-80 text-[#4B5563] dark:text-gray-300 text-center">
          {searchTerm
            ? "No habits match your search."
            : "Consistency beats motivation. Add a habit."}
        </p>
      ) : (
        <div className="space-y-3">
          {[...filteredHabits].reverse().map((habit) => {
            const cardColor =
              CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.General;

            const completedDates = habit.completedDates || [];
            const doneToday = completedDates.includes(today);
            const canTrackStreak = habit.frequency === 7 && habit.trackDaily;

            const streakValue =
              canTrackStreak ? calculateWeeklyStreak(habit) ?? 0 : 0;

            return (
              <div
                key={habit.id}
                className="relative rounded-xl p-4 shadow-lg shadow-black/10 dark:shadow-black/40"
                style={{ backgroundColor: cardColor }}
              >
                {/* Edit */}
                <img
                  src={pencil}
                  alt="edit"
                  onClick={() => onEdit(habit.id)}
                  className="absolute top-3 right-10 w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
                />

                {/* Delete */}
                <img
                  src={trash}
                  alt="delete"
                  onClick={() => onDelete(habit.id)}
                  className="absolute top-3 right-3 w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
                />

                {/* Fire icon */}
                {canTrackStreak && !doneToday && (
                  <img
                    src={streakIcon}
                    alt="mark done"
                    title="Mark today done"
                    onClick={() => markHabitDone(habit.id)}
                    className="absolute top-2.5 right-16 w-5 h-5 cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-200"
                  />
                )}

                {doneToday && canTrackStreak && (
                  <img
                    src={streakIcon}
                    alt="done today"
                    className="absolute top-2.5 right-16 w-5 h-5 opacity-30 pointer-events-none"
                  />
                )}

                {/* Habit Name */}
                <p className="font-medium text-[#F8FAFC] text-lg">
                  <HighlightText text={habit.name} highlight={searchTerm} />
                </p>

                {/* Category */}
                {habit.category && (
                  <span className="inline-block mt-1 mb-2 px-2 py-0.5 text-sm rounded-full bg-black/10 dark:bg-white/10 text-[#F8FAFC]">
                    <HighlightText
                      text={habit.category}
                      highlight={searchTerm}
                    />
                  </span>
                )}

{habit.notes && (
  <p className="text-sm text-[#F8FAFC] opacity-90 mt-1">
    📝 {habit.notes}
  </p>
)}


                {/* ✅ FIXED STREAK LINE — LEFT streak, RIGHT status */}
                {canTrackStreak && (
                  <div className="flex justify-between items-center mt-1 text-[#F8FAFC]">
                    <p className="text-md">
                      🔥 Streak: {streakValue}{" "}
                      {streakValue === 1 ? "day" : "days"}
                    </p>

                    {doneToday ? (
                      <span className="text-[#F8FAFC] text-xs">
                        ✔️ Today done
                      </span>
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
      )}
    </div>
  );
}
