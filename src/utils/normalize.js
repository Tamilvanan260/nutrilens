/**
 * normalize — maps CSV rows (with varying column names across categories)
 * to a unified food schema. Missing values become null (displayed as "Not available").
 */

import { slugify } from './slugify.js';

// Category image folder mapping
const CATEGORY_FOLDER = {
  Fruits: 'fruits',
  Vegetables: 'vegetables',
  'Nuts & Seeds': 'nuts-seeds',
  'Dairy & Milk Products': 'dairy',
  'Meat & Seafood': 'meat-seafood',
};

// Category emoji
export const CATEGORY_EMOJI = {
  Fruits: '🍎',
  Vegetables: '🥕',
  'Nuts & Seeds': '🌰',
  'Dairy & Milk Products': '🥛',
  'Meat & Seafood': '🍗',
};

// Category CSS class
export const CATEGORY_CLASS = {
  Fruits: 'cat-fruits',
  Vegetables: 'cat-vegetables',
  'Nuts & Seeds': 'cat-nuts',
  'Dairy & Milk Products': 'cat-dairy',
  'Meat & Seafood': 'cat-meat',
};

/**
 * Parse a CSV numeric value.
 * Returns the number, or null if missing/non-numeric.
 */
function parseNum(val) {
  if (val === undefined || val === null || val === '' || val === 'N/A' || val === 'n/a') return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

/**
 * Format a numeric value with unit for display.
 * Returns "Not available" if null.
 */
export function formatNutrient(value, unit = '') {
  if (value === null || value === undefined) return 'Not available';
  return `${value}${unit ? ' ' + unit : ''}`;
}

/**
 * Split a semicolon/period-separated string into an array of clean items.
 */
function splitList(str) {
  if (!str) return [];
  // Split on semicolons, or capitalize-sentence boundaries
  return str
    .split(/;|\.\s+(?=[A-Z])/)
    .map(s => s.trim())
    .filter(s => s.length > 2);
}

/**
 * Build image path from food slug and category.
 */
function buildImagePath(slug, category) {
  const folder = CATEGORY_FOLDER[category] || 'misc';
  const base = import.meta.env.BASE_URL; // '/' in dev, '/nutrilens/' in production
  return `${base}images/${folder}/${slug}.png`;
}

/**
 * Helper to extract key vitamin fields from CSV row
 */
function extractKeyVitamin(row) {
  const kv = (row['Key_Vitamin'] || '').trim();
  const kvVal = (row['Key_Vitamin_Value'] || '').trim();
  const kvUnit = (row['Key_Vitamin_Unit'] || '').trim();
  const kvExp = (row['Vitamin_Explanation'] || '').trim();

  return {
    key_vitamin: kv || null,
    key_vitamin_value: kvVal || null,
    key_vitamin_unit: kvUnit || null,
    vitamin_explanation: kvExp || null,
  };
}

/**
 * Normalize a fruits CSV row → unified food object
 */
function normalizeFruit(row) {
  const name = (row['Food_Item'] || '').trim();
  const slug = slugify(name);
  const category = 'Fruits';
  const vit = extractKeyVitamin(row);
  return {
    id: `fruits-${slug}`,
    slug,
    category,
    categoryEmoji: CATEGORY_EMOJI[category],
    categoryClass: CATEGORY_CLASS[category],
    food_name: name,
    scientific_name: (row['Scientific_Name'] || '').trim() || null,
    ifct_code: (row['IFCT_Code'] || '').trim() || null,
    image: buildImagePath(slug, category),
    calories:      parseNum(row['Calories_kcal']),
    protein:       parseNum(row['Protein_g']),
    fat:           parseNum(row['Fat_g']),
    carbohydrates: parseNum(row['Carbohydrates_g']),
    fiber:         parseNum(row['Fiber_g']),
    calcium:       parseNum(row['Calcium_mg']),
    iron:          parseNum(row['Iron_mg']),
    vitamin_c:     parseNum(row['Vitamin_C_mg']),
    potassium:     parseNum(row['Potassium_mg']),
    magnesium:     null,
    vitamin_e:     null,
    health_benefits: splitList(row['health_benefits'] || row['Health_Benefits'] || ''),
    health_benefits_raw: (row['health_benefits'] || row['Health_Benefits'] || '').trim(),
    intake_methods: splitList(row['intake_methods'] || row['Intake_Methods'] || ''),
    intake_methods_raw: (row['intake_methods'] || row['Intake_Methods'] || '').trim(),
    ...vit,
  };
}

/**
 * Normalize a vegetables CSV row → unified food object
 */
function normalizeVegetable(row) {
  const name = (row['Food_Item'] || '').trim();
  const slug = slugify(name);
  const category = 'Vegetables';
  const vit = extractKeyVitamin(row);
  return {
    id: `vegetables-${slug}`,
    slug,
    category,
    categoryEmoji: CATEGORY_EMOJI[category],
    categoryClass: CATEGORY_CLASS[category],
    food_name: name,
    scientific_name: (row['Scientific_Name'] || '').trim() || null,
    ifct_code: (row['IFCT_Code'] || '').trim() || null,
    image: buildImagePath(slug, category),
    calories:      parseNum(row['Calories_kcal']),
    protein:       parseNum(row['Protein_g']),
    fat:           parseNum(row['Fat_g']),
    carbohydrates: parseNum(row['Carbohydrates_g']),
    fiber:         parseNum(row['Fiber_g']),
    calcium:       parseNum(row['Calcium_mg']),
    iron:          parseNum(row['Iron_mg']),
    vitamin_c:     parseNum(row['Vitamin_C_mg']),
    potassium:     parseNum(row['Potassium_mg']),
    magnesium:     null,
    vitamin_e:     null,
    health_benefits: splitList(row['health_benefits'] || row['Health_Benefits'] || ''),
    health_benefits_raw: (row['health_benefits'] || row['Health_Benefits'] || '').trim(),
    intake_methods: splitList(row['intake_methods'] || row['Intake_Methods'] || ''),
    intake_methods_raw: (row['intake_methods'] || row['Intake_Methods'] || '').trim(),
    ...vit,
  };
}

/**
 * Normalize a nuts & seeds CSV row → unified food object
 */
function normalizeNut(row) {
  const name = (row['Food_Item'] || '').trim();
  const slug = slugify(name);
  const category = 'Nuts & Seeds';
  const vit = extractKeyVitamin(row);
  return {
    id: `nuts-${slug}`,
    slug,
    category,
    categoryEmoji: CATEGORY_EMOJI[category],
    categoryClass: CATEGORY_CLASS[category],
    food_name: name,
    scientific_name: (row['Scientific_Name'] || '').trim() || null,
    ifct_code: (row['IFCT_Code'] || '').trim() || null,
    image: buildImagePath(slug, category),
    calories:      parseNum(row['Calories_kcal']),
    protein:       parseNum(row['Protein_g']),
    fat:           parseNum(row['Fat_g']),
    carbohydrates: parseNum(row['Carbohydrates_g']),
    fiber:         parseNum(row['Fiber_g']),
    calcium:       parseNum(row['Calcium_mg']),
    iron:          parseNum(row['Iron_mg']),
    vitamin_c:     null,                             // not in nuts CSV
    potassium:     null,                             // not in nuts CSV
    magnesium:     parseNum(row['Magnesium_mg']),
    vitamin_e:     parseNum(row['Vitamin_E_mg']),
    health_benefits: splitList(row['health_benefits'] || row['Health_Benefits'] || ''),
    health_benefits_raw: (row['health_benefits'] || row['Health_Benefits'] || '').trim(),
    intake_methods: splitList(row['intake_methods'] || row['Intake_Methods'] || ''),
    intake_methods_raw: (row['intake_methods'] || row['Intake_Methods'] || '').trim(),
    ...vit,
  };
}

/**
 * Normalize a dairy CSV row → unified food object
 */
function normalizeDairy(row) {
  const name = (row['Food_Item'] || '').trim();
  const slug = slugify(name);
  const category = 'Dairy & Milk Products';
  const vit = extractKeyVitamin(row);
  return {
    id: `dairy-${slug}`,
    slug,
    category,
    categoryEmoji: CATEGORY_EMOJI[category],
    categoryClass: CATEGORY_CLASS[category],
    food_name: name,
    scientific_name: null,                           // not in dairy CSV
    ifct_code: null,
    image: buildImagePath(slug, category),
    calories:      parseNum(row['Calories_kcal']),
    protein:       parseNum(row['Protein_g']),
    fat:           parseNum(row['Fat_g']),
    carbohydrates: parseNum(row['Carbohydrates_g']),
    fiber:         null,                             // not in dairy CSV
    calcium:       parseNum(row['Calcium_mg']),
    iron:          parseNum(row['Iron_mg']),
    vitamin_c:     parseNum(row['Vitamin_C_mg']),
    potassium:     null,                             // not in dairy CSV
    magnesium:     null,
    vitamin_e:     null,
    health_benefits: splitList(row['health_benefits'] || row['Health_Benefits'] || ''),
    health_benefits_raw: (row['health_benefits'] || row['Health_Benefits'] || '').trim(),
    intake_methods: splitList(row['intake_methods'] || row['Intake_Methods'] || ''),
    intake_methods_raw: (row['intake_methods'] || row['Intake_Methods'] || '').trim(),
    ...vit,
  };
}

/**
 * Normalize a meat & seafood CSV row → unified food object
 */
function normalizeMeat(row) {
  const name = (row['Food_Item'] || '').trim();
  const slug = slugify(name);
  const category = 'Meat & Seafood';
  const vit = extractKeyVitamin(row);
  return {
    id: `meat-${slug}`,
    slug,
    category,
    categoryEmoji: CATEGORY_EMOJI[category],
    categoryClass: CATEGORY_CLASS[category],
    food_name: name,
    type: (row['Type'] || '').trim() || null,
    scientific_name: (row['Scientific_Name'] || '').trim() || null,
    ifct_code: (row['IFCT_Code'] || '').trim() || null,
    image: buildImagePath(slug, category),
    calories:      parseNum(row['Calories_kcal']),
    protein:       parseNum(row['Protein_g']),
    fat:           parseNum(row['Fat_g']),
    carbohydrates: parseNum(row['Carbohydrates_g']),
    fiber:         parseNum(row['Fiber_g']),
    calcium:       parseNum(row['Calcium_mg']),
    iron:          parseNum(row['Iron_mg']),
    vitamin_c:     parseNum(row['Vitamin_C_mg']),
    potassium:     parseNum(row['Potassium_mg']),
    magnesium:     parseNum(row['Magnesium_mg']),
    vitamin_e:     parseNum(row['Vitamin_E_mg']),
    health_benefits: splitList(row['health_benefits'] || row['Health_Benefits'] || ''),
    health_benefits_raw: (row['health_benefits'] || row['Health_Benefits'] || '').trim(),
    intake_methods: splitList(row['intake_methods'] || row['Intake_Methods'] || ''),
    intake_methods_raw: (row['intake_methods'] || row['Intake_Methods'] || '').trim(),
    ...vit,
  };
}

export { normalizeFruit, normalizeVegetable, normalizeNut, normalizeDairy, normalizeMeat };
