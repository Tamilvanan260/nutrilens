// AppContext.jsx — global state for all foods, favorites, recently viewed

import { createContext, useContext, useState, useEffect } from 'react';
import { loadAllFoods } from '../services/dataLoader.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recentSlugs, addToRecent } = useRecentlyViewed();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    loadAllFoods()
      .then(foods => {
        setAllFoods(foods);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load food data');
        setLoading(false);
      });
  }, []);

  // Get recent food objects (in order)
  const recentFoods = recentSlugs
    .map(slug => allFoods.find(f => f.slug === slug))
    .filter(Boolean);

  // Get favorite food objects
  const favoriteFoods = favorites
    .map(slug => allFoods.find(f => f.slug === slug))
    .filter(Boolean);

  return (
    <AppContext.Provider value={{
      allFoods,
      loading,
      error,
      favorites,
      favoriteFoods,
      toggleFavorite,
      isFavorite,
      recentFoods,
      addToRecent,
      searchOpen,
      setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
