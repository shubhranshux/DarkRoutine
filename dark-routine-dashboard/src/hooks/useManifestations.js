import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Helper to get user-specific storage key
const getUserKey = (userId) => `darkroutine_manifestations_${userId || 'guest'}`;

export function useManifestations() {
  const { user } = useAuth();
  const userId = user?.id;
  const storageKey = getUserKey(userId);
  
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage when user changes
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      setItems([]);
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, isLoaded, storageKey]);

  const addManifestation = useCallback((text) => {
    const newItem = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
      achieved: false,
    };
    setItems(prev => [newItem, ...prev]);
  }, []);

  const deleteManifestation = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const toggleAchieved = useCallback((id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, achieved: !item.achieved } : item
    ));
  }, []);

  const updateManifestation = useCallback((id, text) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, text } : item
    ));
  }, []);

  return {
    items,
    isLoaded,
    addManifestation,
    deleteManifestation,
    toggleAchieved,
    updateManifestation,
  };
}
