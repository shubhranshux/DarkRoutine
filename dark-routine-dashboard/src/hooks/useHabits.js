import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Helper to get user-specific storage key
const getUserKey = (baseKey, userId) => `${baseKey}_${userId || 'guest'}`;

const defaultRoutines = [
  {
    id: 'morning',
    name: 'Morning Ritual',
    color: 'hsl(47, 91%, 52%)',
    enabled: true,
    order: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'evening',
    name: 'Evening Wind-down',
    color: 'hsl(200, 70%, 50%)',
    enabled: true,
    order: 1,
    createdAt: new Date().toISOString(),
  },
];

const defaultHabits = [
  { id: '1', name: 'Meditate', emoji: '🧘', routineId: 'morning', createdAt: new Date().toISOString() },
  { id: '2', name: 'Exercise', emoji: '💪', routineId: 'morning', createdAt: new Date().toISOString() },
  { id: '3', name: 'Read', emoji: '📚', routineId: 'evening', createdAt: new Date().toISOString() },
  { id: '4', name: 'Journal', emoji: '✍️', routineId: 'evening', createdAt: new Date().toISOString() },
  { id: '5', name: 'Hydrate', emoji: '💧', routineId: 'morning', createdAt: new Date().toISOString() },
  { id: '6', name: 'Cold Shower', emoji: '🚿', routineId: 'morning', createdAt: new Date().toISOString() },
];

export function useHabits() {
  const { user } = useAuth();
  const userId = user?.id;
  
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get user-specific keys
  const habitsKey = getUserKey('darkroutine_habits', userId);
  const completionsKey = getUserKey('darkroutine_completions', userId);
  const routinesKey = getUserKey('darkroutine_routines', userId);

  // Load from localStorage when user changes
  useEffect(() => {
    const storedHabits = localStorage.getItem(habitsKey);
    const storedCompletions = localStorage.getItem(completionsKey);
    const storedRoutines = localStorage.getItem(routinesKey);

    setHabits(storedHabits ? JSON.parse(storedHabits) : defaultHabits);
    setCompletions(storedCompletions ? JSON.parse(storedCompletions) : []);
    setRoutines(storedRoutines ? JSON.parse(storedRoutines) : defaultRoutines);
    setIsLoaded(true);
  }, [habitsKey, completionsKey, routinesKey]);

  // Save habits to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(habitsKey, JSON.stringify(habits));
    }
  }, [habits, isLoaded, habitsKey]);

  // Save completions to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(completionsKey, JSON.stringify(completions));
    }
  }, [completions, isLoaded, completionsKey]);

  // Save routines to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(routinesKey, JSON.stringify(routines));
    }
  }, [routines, isLoaded, routinesKey]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const addHabit = useCallback((name, emoji, routineId, scheduledDays, isRecurring) => {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      emoji,
      routineId,
      createdAt: new Date().toISOString(),
      scheduledDays: scheduledDays || [0, 1, 2, 3, 4, 5, 6],
      isRecurring: isRecurring ?? true,
    };
    setHabits(prev => [...prev, newHabit]);
    return newHabit;
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    setCompletions(prev => prev.filter(c => c.habitId !== id));
  }, []);

  const toggleCompletion = useCallback((habitId, date) => {
    const dateStr = formatDate(date);
    setCompletions(prev => {
      const existing = prev.find(c => c.habitId === habitId && c.date === dateStr);
      if (existing) {
        return prev.filter(c => !(c.habitId === habitId && c.date === dateStr));
      }
      return [...prev, { habitId, date: dateStr, completed: true }];
    });
  }, []);

  const isCompleted = useCallback((habitId, date) => {
    const dateStr = formatDate(date);
    return completions.some(c => c.habitId === habitId && c.date === dateStr && c.completed);
  }, [completions]);

  const getCompletionStats = useCallback((date) => {
    const dateStr = formatDate(date);
    const enabledRoutineIds = routines.filter(r => r.enabled).map(r => r.id);
    const activeHabits = habits.filter(h => enabledRoutineIds.includes(h.routineId));
    const completed = completions.filter(
      c => c.date === dateStr && c.completed && activeHabits.some(h => h.id === c.habitId)
    );
    return {
      completed: completed.length,
      total: activeHabits.length,
      percentage: activeHabits.length > 0 ? Math.round((completed.length / activeHabits.length) * 100) : 0,
    };
  }, [habits, completions, routines]);

  const getStreak = useCallback((habitId) => {
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = formatDate(currentDate);
      const isComplete = completions.some(c => c.habitId === habitId && c.date === dateStr && c.completed);
      
      if (!isComplete && currentDate < today) break;
      if (isComplete) streak++;
      
      currentDate.setDate(currentDate.getDate() - 1);
      if (streak === 0 && !isComplete) break;
      if (currentDate < new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)) break;
    }

    return streak;
  }, [completions]);

  const toggleRoutine = useCallback((routineId) => {
    setRoutines(prev =>
      prev.map(r => (r.id === routineId ? { ...r, enabled: !r.enabled } : r))
    );
  }, []);

  const addRoutine = useCallback((name, color) => {
    const newRoutine = {
      id: crypto.randomUUID(),
      name,
      color,
      enabled: true,
      order: routines.length,
      createdAt: new Date().toISOString(),
    };
    setRoutines(prev => [...prev, newRoutine]);
    return newRoutine;
  }, [routines.length]);

  return {
    habits,
    completions,
    routines,
    isLoaded,
    addHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getCompletionStats,
    getStreak,
    toggleRoutine,
    addRoutine,
  };
}
