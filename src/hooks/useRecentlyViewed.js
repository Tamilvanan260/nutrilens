// useRecentlyViewed.js — manages recently viewed foods in localStorage (max 5)

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'nutrilens_recently_viewed';
const MAX_ITEMS = 5;

function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [recentSlugs, setRecentSlugs] = useState(() => getRecentlyViewed());

  const addToRecent = useCallback((slug) => {
    setRecentSlugs(prev => {
      const filtered = prev.filter(s => s !== slug);
      const next = [slug, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recentSlugs, addToRecent };
}
