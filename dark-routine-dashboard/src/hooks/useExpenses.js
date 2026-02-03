import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Helper to get user-specific storage key
const getUserKey = (userId) => `darkroutine_expenses_${userId || 'guest'}`;

export function useExpenses() {
  const { user } = useAuth();
  const userId = user?.id;
  const storageKey = getUserKey(userId);
  
  const [expenses, setExpenses] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage when user changes
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setExpenses(JSON.parse(stored));
    } else {
      setExpenses({});
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(expenses));
    }
  }, [expenses, isLoaded, storageKey]);

  const getDateKey = (date) => date.toISOString().split('T')[0];

  const addExpense = useCallback((amount, description, date = new Date()) => {
    const dateKey = getDateKey(date);
    const newExpense = {
      id: crypto.randomUUID(),
      amount,
      description,
      date: dateKey,
    };

    setExpenses(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newExpense],
    }));
  }, []);

  const deleteExpense = useCallback((id, date) => {
    const dateKey = getDateKey(date);
    setExpenses(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(e => e.id !== id),
    }));
  }, []);

  const getExpensesForDate = useCallback((date) => {
    const dateKey = getDateKey(date);
    return expenses[dateKey] || [];
  }, [expenses]);

  const getTotalForDate = useCallback((date) => {
    const dayExpenses = getExpensesForDate(date);
    return dayExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [getExpensesForDate]);

  const getMonthlyTotal = useCallback((year, month) => {
    let total = 0;
    Object.entries(expenses).forEach(([dateKey, dayExpenses]) => {
      const d = new Date(dateKey);
      if (d.getFullYear() === year && d.getMonth() === month) {
        total += dayExpenses.reduce((sum, e) => sum + e.amount, 0);
      }
    });
    return total;
  }, [expenses]);

  return {
    expenses,
    isLoaded,
    addExpense,
    deleteExpense,
    getExpensesForDate,
    getTotalForDate,
    getMonthlyTotal,
  };
}
