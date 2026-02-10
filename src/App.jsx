import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HelpBox from "./components/HelpBox";
import Dashboard from "./pages/Dashboard";
import Fab from "./components/Fab";
import Choice from "./components/Choice";
import ExpenseForm from "./components/ExpenseForm";
import HabitForm from "./components/HabitForm";
import AllHabits from "./pages/AllHabits";
import AllExpenses from "./pages/AllExpenses";
import { calculateWeeklyStreak } from "./utils/streak";
import BackupActions from "./components/BackupActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";


export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isHabitOpen, setIsHabitOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingHabit, setEditingHabit] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // ---------- LOAD FROM LOCAL STORAGE ----------
 // load first
// useEffect(() => {
//   const savedExpenses = localStorage.getItem("expenses");
//   const savedHabits = localStorage.getItem("habits");

//   if (savedExpenses) {
//     try { setExpenses(JSON.parse(savedExpenses)); } catch {}
//   }
//   if (savedHabits) {
//     try { setHabits(JSON.parse(savedHabits)); } catch {}
//   }

//   setLoaded(true);   // 👈 IMPORTANT
// }, []);

// ---------- LOAD FROM LOCAL STORAGE (STRONG VERSION) ----------

useEffect(() => {
  const savedExpenses = localStorage.getItem("expenses");
  const savedHabits = localStorage.getItem("habits");

  try {
    setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);
  } catch {
    setExpenses([]);
  }

  try {
    setHabits(savedHabits ? JSON.parse(savedHabits) : []);
  } catch {
    setHabits([]);
  }

  setLoaded(true);
}, []);
  

  const fabBtn = () => setChoiceOpen(true);
  const closeChoice = () => setChoiceOpen(false);

  const handleChoice = (choice) => {
    closeChoice();
    if (choice === "expense") setIsExpenseOpen(true);
    if (choice === "habit") setIsHabitOpen(true);
  };

  // ---------- ADD / UPDATE EXPENSE ----------
  const handleAddExpense = (expense) => {
    const cleanExpense = { ...expense, amount: Number(expense.amount) };
  
    setExpenses(prev => {
      const updated = prev.some(e => e.id === cleanExpense.id)
        ? prev.map(e => e.id === cleanExpense.id ? cleanExpense : e)
        : [...prev, cleanExpense];
  
      localStorage.setItem("expenses", JSON.stringify(updated));
      return updated;
    });
  
    setEditingExpense(null);
    toast.success("Expense saved successfully 💸");
  };
  

  // ---------- ADD / UPDATE HABIT ----------
  const handleAddHabit = (habit) => {
    const cleanHabit = {
      ...habit,
      frequency: Number(habit.frequency),
      completedDates: habit.completedDates ?? [],
      dailyStreak: 0,          
      streakStarted: false    
    };
    
  
    setHabits(prev => {
      const updated = prev.some(h => h.id === cleanHabit.id)
        ? prev.map(h => h.id === cleanHabit.id ? cleanHabit : h)
        : [...prev, cleanHabit];
  
      localStorage.setItem("habits", JSON.stringify(updated));
      return updated;
    });
  
    setEditingHabit(null);
    toast.success("Habit added successfully 🔥");
  };
  
  

  // ---------- MANUAL MARK DONE FOR STREAK ----------
  const markHabitDone = (habitId) => {
    const today = new Date().toISOString().slice(0, 10);
  
    setHabits(prev => {
      const updated = prev.map(habit => {
        if (habit.id !== habitId) return habit;
  
        // If already marked today, do nothing
        if (habit.completedDates?.includes(today)) return habit;
  
        const newCompletedDates = [
          ...(habit.completedDates || []),
          today
        ];
  
        const newStreak = calculateWeeklyStreak({
          ...habit,
          completedDates: newCompletedDates
        }) ?? 1;
  
        return {
          ...habit,
          completedDates: newCompletedDates,
          streakStarted: true,
          dailyStreak: newStreak,
          lastCompletedDate: today
        };
      });
  
      localStorage.setItem("habits", JSON.stringify(updated));
      return updated;
    });
  };
  
  


const deleteExpense = id => {
  setExpenses(prev => {
    const updated = prev.filter(e => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updated));
    return updated;
  });

  toast.error("Expense deleted ❌");
};

    

const deleteHabit = id => {
  setHabits(prev => {
    const updated = prev.filter(h => h.id !== id);
    localStorage.setItem("habits", JSON.stringify(updated));
    return updated;
  });

  toast.error("Habit removed 🗑️");
};

  const today = new Date().toISOString().slice(0, 10);

  const todayExpense = expenses
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const monthKey = today.slice(0, 7);

  const monthlyExpense = expenses
    .filter(e => e.date?.startsWith(monthKey))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalHabits = habits.length;

  const filteredExpenses = expenses.filter(e =>
    String(e.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(e.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(e.notes || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHabits = habits.filter(h =>
    String(h.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(h.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#2f434d] pt-20">
      <Header onHelpClick={() => setShowHelp(true)} />

      <div className="w-full flex justify-center mt-6">
        <SearchBar value={searchTerm} onChange={val => setSearchTerm(val)} />
      </div>

      <Fab onClick={fabBtn} />
      <Choice isOpen={choiceOpen} onClose={closeChoice} onSelect={handleChoice} />

      <ExpenseForm
        isOpen={isExpenseOpen}
        onClose={() => {
          setIsExpenseOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={handleAddExpense}
        initialData={editingExpense}
      />

      <HabitForm
        isOpen={isHabitOpen}
        onClose={() => {
          setIsHabitOpen(false);
          setEditingHabit(null);
        }}
        onSubmit={handleAddHabit}
        initialData={editingHabit}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
            expenses={filteredExpenses ?? []}
              habits={filteredHabits}
              todayExpense={todayExpense}
              monthlyExpense={monthlyExpense}
              totalHabits={totalHabits}
              onEditExpense={(id) => {
                const found = expenses.find(e => e.id === id);
                setEditingExpense(found);
                setIsExpenseOpen(true);
              }}
              onEditHabit={(id) => {
                const found = habits.find(h => h.id === id);
                setEditingHabit(found);
                setIsHabitOpen(true);
              }}
              onDeleteExpense={deleteExpense}
              onDeleteHabit={deleteHabit}
              searchTerm={searchTerm}
              markHabitDone={markHabitDone}
            />
          }
        />

        <Route
          path="/expenses"
          element={
            <AllExpenses
            expenses={filteredExpenses ?? []}
              searchTerm={searchTerm}
              onEdit={(id) => {
                const found = expenses.find(e => e.id === id);
                setEditingExpense(found);
                setIsExpenseOpen(true);
              }}
              onDelete={deleteExpense}
            />
          }
        />

        <Route
          path="/habits"
          element={
            <AllHabits
  habits={filteredHabits}
  searchTerm={searchTerm}
  onEdit={(id) => {
    const found = habits.find(h => h.id === id);
    setEditingHabit(found);
    setIsHabitOpen(true);
  }}
  onDelete={deleteHabit}
  markHabitDone={markHabitDone}
/>

          }
        />
      </Routes>

      <BackupActions
  expenses={expenses}
  habits={habits}
  setExpenses={setExpenses}
  setHabits={setHabits}
/>


      {showHelp && <HelpBox onClose={() => setShowHelp(false)} />}

      <ToastContainer 
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  theme="colored"
/>

<Footer />

    </div>
  );
}
