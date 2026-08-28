/**
 * slugify — converts food names to URL/filename-safe slugs
 * Examples:
 *   "Amla / Indian Gooseberry" → "amla"
 *   "Cow Milk"                 → "cow-milk"
 *   "Bitter Gourd / Pavakkai"  → "bitter-gourd"
 *   "Peanut / Groundnut"       → "peanut"
 */

// Primary name is the part before the first " / "
export function slugify(name) {
  if (!name) return '';

  // Explicit slug mapping for multi-part food names
  const customSlugs = {
    'Chicken (Skinless)': 'chicken-skinless',
    'Mutton / Goat Meat': 'mutton-goat-meat',
    'Vanjaram / Seer Fish (King Mackerel)': 'vanjaram-seer-fish',
    'Sankara / Red Snapper': 'sankara-red-snapper',
    'Nethili / Anchovy': 'nethili-anchovy',
    'Mathi / Sardine': 'mathi-sardine',
    'Vavval / White Pomfret': 'vavval-white-pomfret',
    'Prawn / Eral': 'prawn-eral',
    'Goat Blood / Ratham': 'goat-blood-ratham',
    'Dates (Dry)': 'dates-dry',
  };

  if (customSlugs[name]) return customSlugs[name];

  const primary = name.split('/')[0].trim();
  return primary
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // remove non-alphanumeric
    .trim()
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');        // trim leading/trailing hyphens
}

// Convert slug back to displayable name (for title)
export function displayName(food) {
  if (!food) return '';
  // Return Food_Item as-is; split at "/" for cleaner display
  return food.Food_Item || food.food_name || '';
}
