// FilterBar.jsx — category filter chips and sort dropdown

const SORT_OPTIONS = [
  { value: 'az',         label: '🔤 A – Z' },
  { value: 'za',         label: '🔤 Z – A' },
  { value: 'vitamin_c',  label: '🍊 Highest Vitamin C' },
  { value: 'protein',    label: '💪 Highest Protein' },
  { value: 'fiber',      label: '🌿 Highest Fiber' },
  { value: 'calcium',    label: '🦴 Highest Calcium' },
  { value: 'iron',       label: '🩸 Highest Iron' },
  { value: 'calories',   label: '🔥 Lowest Calories' },
];

const CATEGORY_FILTERS = [
  { value: 'all',                     label: '🌍 All' },
  { value: 'Fruits',                   label: '🍎 Fruits' },
  { value: 'Vegetables',               label: '🥕 Vegetables' },
  { value: 'Nuts & Seeds',             label: '🌰 Nuts & Seeds' },
  { value: 'Dairy & Milk Products',    label: '🥛 Dairy' },
];

export default function FilterBar({
  activeCategory = 'all',
  onCategoryChange,
  sortBy = 'az',
  onSortChange,
  showCategories = true,
}) {
  return (
    <div className="filter-bar" role="search" aria-label="Filter and sort foods">
      {showCategories && (
        <div className="filter-chips" role="group" aria-label="Filter by category">
          {CATEGORY_FILTERS.map(cat => (
            <button
              key={cat.value}
              className={`filter-chip ${activeCategory === cat.value ? 'active' : ''}`}
              onClick={() => onCategoryChange && onCategoryChange(cat.value)}
              aria-pressed={activeCategory === cat.value}
              id={`filter-${cat.value.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange && onSortChange(e.target.value)}
        aria-label="Sort foods by"
        id="sort-foods-select"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
