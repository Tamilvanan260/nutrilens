// NutrientExplorerPage.jsx — rank foods by selected nutrient

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { sortByNutrient } from '../services/dataLoader.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const NUTRIENTS = [
  { key: 'calories',      icon: '🔥', label: 'Calories',      unit: 'kcal', desc: 'Energy content', sortDir: 'lowest'  },
  { key: 'vitamin_c',     icon: '🍊', label: 'Vitamin C',     unit: 'mg',   desc: 'Immune booster' },
  { key: 'protein',       icon: '💪', label: 'Protein',       unit: 'g',    desc: 'Muscle & repair' },
  { key: 'fiber',         icon: '🌿', label: 'Fiber',         unit: 'g',    desc: 'Digestive health' },
  { key: 'calcium',       icon: '🦴', label: 'Calcium',       unit: 'mg',   desc: 'Bone strength' },
  { key: 'iron',          icon: '🩸', label: 'Iron',          unit: 'mg',   desc: 'Blood health' },
  { key: 'carbohydrates', icon: '🌾', label: 'Carbohydrates', unit: 'g',    desc: 'Energy source' },
  { key: 'fat',           icon: '🫒', label: 'Fat',           unit: 'g',    desc: 'Healthy fats' },
  { key: 'potassium',     icon: '⚡', label: 'Potassium',     unit: 'mg',   desc: 'Heart & nerves' },
  { key: 'magnesium',     icon: '✨', label: 'Magnesium',     unit: 'mg',   desc: 'Enzyme function' },
  { key: 'vitamin_e',     icon: '🌻', label: 'Vitamin E',     unit: 'mg',   desc: 'Skin protection' },
];

const FALLBACK_EMOJI = { Fruits: '🍎', Vegetables: '🥕', 'Nuts & Seeds': '🌰', 'Dairy & Milk Products': '🥛', 'Meat & Seafood': '🍗' };

export default function NutrientExplorerPage() {
  const { allFoods, loading } = useApp();
  const [selectedKey, setSelectedKey] = useState('vitamin_c');

  const selectedNutrient = NUTRIENTS.find(n => n.key === selectedKey);

  const ranked = useMemo(() => {
    return sortByNutrient(allFoods, selectedKey)
      .filter(f => f[selectedKey] !== null);
  }, [allFoods, selectedKey]);

  const maxValue = ranked.length > 0 ? ranked[0][selectedKey] : 1;

  if (loading) return (
    <div className="page-wrapper">
      <div className="container"><LoadingSpinner /></div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="page-header" aria-labelledby="nutrient-title">
          <span className="page-header-emoji" aria-hidden="true">📊</span>
          <h1 className="page-header-title" id="nutrient-title">Nutrient Explorer</h1>
          <p className="page-header-sub">
            Select a nutrient to see which foods have the most
          </p>
        </header>

        <div className="nutrient-explorer">
          {/* Nutrient Tabs */}
          <div
            className="nutrient-tabs"
            role="tablist"
            aria-label="Select nutrient"
          >
            {NUTRIENTS.map(n => (
              <button
                key={n.key}
                className={`nutrient-tab ${selectedKey === n.key ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedKey === n.key}
                onClick={() => setSelectedKey(n.key)}
                id={`nutrient-tab-${n.key}`}
              >
                <span aria-hidden="true">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </div>

          {/* Results Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 8,
          }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--clr-text)' }}>
                {selectedNutrient?.icon} {selectedNutrient?.label} Rankings
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)' }}>
                {selectedNutrient?.desc} · {ranked.length} foods with data · per 100g
              </p>
            </div>
            <span style={{
              fontSize: '0.78rem', color: 'var(--clr-text-muted)', fontWeight: 600,
              background: 'var(--clr-bg)', padding: '4px 12px', borderRadius: 'var(--radius-full)',
            }}>
              {allFoods.length - ranked.length} foods lack {selectedNutrient?.label} data (shown as "Not available")
            </span>
          </div>

          {/* Ranked List */}
          {ranked.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state-emoji">📉</span>
              <p className="empty-state-text">No foods have data for this nutrient.</p>
            </div>
          ) : (
            <ol
              className="nutrient-rank-list stagger-children"
              aria-label={`Foods ranked by ${selectedNutrient?.label}`}
            >
              {ranked.map((food, i) => {
                const value = food[selectedKey];
                const barWidth = maxValue > 0 ? (value / maxValue) * 100 : 0;
                const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';

                return (
                  <li key={food.id} style={{ animationDelay: `${i * 30}ms` }}>
                    <Link
                      to={`/food/${food.slug}`}
                      className="nutrient-rank-item"
                      aria-label={`#${i + 1} ${food.food_name}: ${value} ${selectedNutrient?.unit}`}
                    >
                      {/* Rank number */}
                      <span className={`rank-num ${rankClass}`}>
                        {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                      </span>

                      {/* Image */}
                      <img
                        src={food.image}
                        alt=""
                        className="rank-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
                        }}
                      />
                      <div className="rank-fallback" style={{ display: 'none' }} aria-hidden="true">
                        {FALLBACK_EMOJI[food.category] || '🍽️'}
                      </div>

                      {/* Name + category */}
                      <div className="rank-info">
                        <div className="rank-name">{food.food_name}</div>
                        <div className="rank-cat">{food.categoryEmoji} {food.category}</div>
                      </div>

                      {/* Progress bar */}
                      <div className="rank-bar-wrap" aria-hidden="true">
                        <div className="rank-bar-bg">
                          <div
                            className="rank-bar-fill"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>

                      {/* Value */}
                      <span className="rank-value">
                        {value} {selectedNutrient?.unit}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
