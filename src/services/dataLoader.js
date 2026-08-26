/**
 * dataLoader.js
 * Fetches and parses all 4 CSV files using PapaParse.
 * Returns a single unified array of all food objects.
 * Caches the result so subsequent calls are instant.
 */

import Papa from 'papaparse';
import {
  normalizeFruit,
  normalizeVegetable,
  normalizeNut,
  normalizeDairy,
} from '../utils/normalize.js';

const BASE = import.meta.env.BASE_URL; // '/' in dev, '/nutrilens/' in production

const CSV_FILES = [
  { path: `${BASE}data/fruits.csv`,             normalize: normalizeFruit,     category: 'Fruits' },
  { path: `${BASE}data/vegetables.csv`,         normalize: normalizeVegetable, category: 'Vegetables' },
  { path: `${BASE}data/nuts_seeds.csv`,         normalize: normalizeNut,       category: 'Nuts & Seeds' },
  { path: `${BASE}data/dairy_milk_products.csv`,normalize: normalizeDairy,     category: 'Dairy & Milk Products' },
];

// Simple in-memory cache
let _cachedData = null;

/**
 * Parse a single CSV file from a URL.
 */
function parseCSV(url, normalizer) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const foods = results.data
          .map(row => {
            try { return normalizer(row); }
            catch (e) { console.warn('Row normalization failed:', row, e); return null; }
          })
          .filter(Boolean)
          .filter(f => f.food_name && f.food_name.length > 0);
        resolve(foods);
      },
      error: (err) => reject(err),
    });
  });
}

/**
 * Load all CSV files and return the unified food array.
 * Uses cache on repeat calls.
 */
export async function loadAllFoods() {
  if (_cachedData) return _cachedData;

  try {
    const results = await Promise.all(
      CSV_FILES.map(({ path, normalize }) => parseCSV(path, normalize))
    );
    _cachedData = results.flat();
    return _cachedData;
  } catch (err) {
    console.error('Error loading food data:', err);
    throw err;
  }
}

/**
 * Find a single food by slug from the cached data.
 */
export function findFoodBySlug(allFoods, slug) {
  return allFoods.find(f => f.slug === slug) || null;
}

/**
 * Get foods for a specific category.
 */
export function getFoodsByCategory(allFoods, category) {
  return allFoods.filter(f => f.category === category);
}

/**
 * Get category counts as an object.
 */
export function getCategoryCounts(allFoods) {
  return allFoods.reduce((acc, food) => {
    acc[food.category] = (acc[food.category] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Search foods by name, scientific name, or category (case-insensitive).
 */
export function searchFoods(allFoods, query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allFoods.filter(f =>
    f.food_name.toLowerCase().includes(q) ||
    (f.scientific_name && f.scientific_name.toLowerCase().includes(q)) ||
    f.category.toLowerCase().includes(q)
  ).slice(0, 12);
}

/**
 * Sort foods by a nutrient field (descending, nulls last).
 */
export function sortByNutrient(foods, field) {
  return [...foods].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av === null && bv === null) return 0;
    if (av === null) return 1;
    if (bv === null) return -1;
    return bv - av;
  });
}
