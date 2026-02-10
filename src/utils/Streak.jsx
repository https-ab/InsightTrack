export function calculateWeeklyStreak(habit) {
  const { completedDates = [], frequency, trackDaily } = habit;

  // Only calculate streak for daily habits with frequency = 7
  if (frequency !== 7 || !trackDaily) return null;

  let streak = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.toISOString().slice(0, 10);

    if (completedDates.includes(day)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
