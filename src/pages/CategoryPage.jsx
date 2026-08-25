// CategoryPage.jsx — shows all foods for a given category

import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import FoodCard from '../components/FoodCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const SLUG_TO_CATEGORY = {
  'fruits':      'Fruits',
  'vegetables':  'Vegetables',
  'nuts-seeds':  'Nuts & Seeds',
  'dairy':       'Dairy & Milk Products',
};

const CATEGORY_EMOJI = {
  Fruits: '🍎',
  Vegetables: '🥕',
  'Nuts & Seeds': '🌰',
  'Dairy & Milk Products': '🥛',
};

const CATEGORY_DESCRIPTION = {
  Fruits: 'Nature\'s sweetest gifts — packed with vitamins, antioxidants, and natural sugars.',
  Vegetables: 'Colorful powerhouses of minerals, dietary fiber, and protective phytochemicals.',
  'Nuts & Seeds': 'Calorie-dense, nutrient-rich snacks full of healthy fats and plant proteins.',
  'Dairy & Milk Products': 'Calcium-rich foods for bone strength, muscle repair, and probiotic health.',
};

function sortFoods(foods, sortBy) {
  const sorted = [...foods];
  switch (sortBy) {
    case 'az':        return sorted.sort((a, b) => a.food_name.localeCompare(b.food_name));
    case 'za':        return sorted.sort((a, b) => b.food_name.localeCompare(a.food_name));
    case 'calories':  return sorted.sort((a, b) => (a.calories ?? Infinity) - (b.calories ?? Infinity));
    default: {
      // Nutrient descending, nulls last
      return sorted.sort((a, b) => {
        const av = a[sortBy]; const bv = b[sortBy];
        if (av === null && bv === null) return 0;
        if (av === null) return 1;
        if (bv === null) return -1;
        return bv - av;
      });
    }
  }
}

export default function CategoryPage() {
  const { slug } = useParams();
  const { allFoods, loading } = useApp();
  const [sortBy, setSortBy] = useState('az');

  const category = SLUG_TO_CATEGORY[slug];

  const categoryFoods = useMemo(() => {
    if (!category) return [];
    return sortFoods(allFoods.filter(f => f.category === category), sortBy);
  }, [allFoods, category, sortBy]);

  if (loading) return <div className="page-wrapper"><div className="container"><LoadingSpinner /></div></div>;

  if (!category) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-emoji">🤔</span>
            <h2 className="empty-state-title">Category not found</h2>
            <p className="empty-state-text">That category doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Back */}
        <Link to="/" className="back-btn" aria-label="Back to home">
          ← Back to Home
        </Link>

        {/* Header */}
        <header className="page-header" aria-labelledby="category-page-title">
          <span className="page-header-emoji" aria-hidden="true">{CATEGORY_EMOJI[category]}</span>
          <h1 className="page-header-title" id="category-page-title">{category}</h1>
          <p className="page-header-sub">{CATEGORY_DESCRIPTION[category]}</p>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginTop: '8px', fontWeight: 600 }}>
            {categoryFoods.length} foods
          </p>
        </header>

        {/* Filter / Sort bar (no category chips in category page — already filtered) */}
        <FilterBar
          showCategories={false}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Food Grid */}
        {categoryFoods.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-emoji">🥲</span>
            <p className="empty-state-text">No foods found in this category.</p>
          </div>
        ) : (
          <div className="food-grid stagger-children" role="list" aria-label={`${category} foods`}>
            {categoryFoods.map((food, i) => (
              <div key={food.id} role="listitem">
                <FoodCard food={food} animDelay={i * 50} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
