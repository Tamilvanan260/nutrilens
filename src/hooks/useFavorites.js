// useFavorites.js — manages favorite foods in localStorage

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'nutrilens_favorites';

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => getFavorites());

  const toggleFavorite = useCallback((slug) => {
    setFavorites(prev => {
      let next;
      if (prev.includes(slug)) {
        next = prev.filter(s => s !== slug);
      } else {
        next = [...prev, slug];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((slug) => favorites.includes(slug), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
