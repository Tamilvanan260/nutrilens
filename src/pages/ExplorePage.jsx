// ExplorePage.jsx — browse and filter all 60 foods

import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import FoodCard from '../components/FoodCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function sortFoods(foods, sortBy) {
  const sorted = [...foods];
  switch (sortBy) {
    case 'az':       return sorted.sort((a, b) => a.food_name.localeCompare(b.food_name));
    case 'za':       return sorted.sort((a, b) => b.food_name.localeCompare(a.food_name));
    case 'calories': return sorted.sort((a, b) => (a.calories ?? Infinity) - (b.calories ?? Infinity));
    default: {
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

export default function ExplorePage() {
  const { allFoods, loading } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('az');

  const displayFoods = useMemo(() => {
    let foods = activeCategory === 'all'
      ? allFoods
      : allFoods.filter(f => f.category === activeCategory);
    return sortFoods(foods, sortBy);
  }, [allFoods, activeCategory, sortBy]);

  if (loading) return (
    <div className="page-wrapper">
      <div className="container"><LoadingSpinner /></div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="page-header" aria-labelledby="explore-title">
          <span className="page-header-emoji" aria-hidden="true">🌍</span>
          <h1 className="page-header-title" id="explore-title">Explore All Foods</h1>
          <p className="page-header-sub">
            {displayFoods.length} of {allFoods.length} foods shown
          </p>
        </header>

        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showCategories={true}
        />

        {displayFoods.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-emoji">🥲</span>
            <p className="empty-state-text">No foods in this category yet.</p>
          </div>
        ) : (
          <div className="food-grid stagger-children" role="list" aria-label="Food results">
            {displayFoods.map((food, i) => (
              <div key={food.id} role="listitem">
                <FoodCard food={food} animDelay={i * 35} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
