import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Helper to get user-specific storage key
const getUserKey = (userId) => `darkroutine_wishlist_${userId || 'guest'}`;

export function useWishlist() {
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

  const addItem = useCallback((name, price, priority, link, notes) => {
    const newItem = {
      id: crypto.randomUUID(),
      name,
      price,
      priority,
      link,
      notes,
      createdAt: new Date().toISOString(),
      purchased: false,
    };
    setItems(prev => [newItem, ...prev]);
  }, []);

  const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const togglePurchased = useCallback((id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  }, []);

  const updatePriority = useCallback((id, priority) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, priority } : item
    ));
  }, []);

  const getTotalWishlistValue = useCallback(() => {
    return items.filter(i => !i.purchased).reduce((sum, i) => sum + i.price, 0);
  }, [items]);

  const getPurchasedTotal = useCallback(() => {
    return items.filter(i => i.purchased).reduce((sum, i) => sum + i.price, 0);
  }, [items]);

  return {
    items,
    isLoaded,
    addItem,
    deleteItem,
    togglePurchased,
    updatePriority,
    getTotalWishlistValue,
    getPurchasedTotal,
  };
}
