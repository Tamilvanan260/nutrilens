// ComparisonTable.jsx — side-by-side floating comparison of two foods

import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const COMPARE_FIELDS = [
  { key: 'calories',      icon: '🔥', label: 'Calories',      unit: 'kcal', higherIsBetter: false },
  { key: 'vitamin_c',     icon: '🍊', label: 'Vitamin C',     unit: 'mg',   higherIsBetter: true  },
  { key: 'protein',       icon: '💪', label: 'Protein',       unit: 'g',    higherIsBetter: true  },
  { key: 'fiber',         icon: '🌿', label: 'Fiber',         unit: 'g',    higherIsBetter: true  },
  { key: 'calcium',       icon: '🦴', label: 'Calcium',       unit: 'mg',   higherIsBetter: true  },
  { key: 'iron',          icon: '🩸', label: 'Iron',          unit: 'mg',   higherIsBetter: true  },
  { key: 'carbohydrates', icon: '🌾', label: 'Carbs',         unit: 'g',    higherIsBetter: null  },
  { key: 'fat',           icon: '🫒', label: 'Fat',           unit: 'g',    higherIsBetter: null  },
  { key: 'potassium',     icon: '⚡', label: 'Potassium',     unit: 'mg',   higherIsBetter: true  },
  { key: 'magnesium',     icon: '✨', label: 'Magnesium',     unit: 'mg',   higherIsBetter: true  },
  { key: 'vitamin_e',     icon: '🌻', label: 'Vitamin E',     unit: 'mg',   higherIsBetter: true  },
];

export default function ComparisonTable({ food }) {
  const { allFoods } = useApp();
  const [compareSlug, setCompareSlug] = useState('');

  const compareFood = allFoods.find(f => f.slug === compareSlug);

  // Determine winner for a field
  function getWinner(fieldKey) {
    if (!compareFood) return { a: false, b: false };
    const av = food[fieldKey];
    const bv = compareFood[fieldKey];
    if (av === null || bv === null) return { a: false, b: false };
    const field = COMPARE_FIELDS.find(f => f.key === fieldKey);
    if (!field || field.higherIsBetter === null) return { a: false, b: false };
    if (field.higherIsBetter) {
      return { a: av > bv, b: bv > av };
    } else {
      return { a: av < bv, b: bv < av };
    }
  }

  const otherFoods = allFoods.filter(f => f.slug !== food.slug);

  return (
    <section className="comparison-section" aria-labelledby="compare-title">
      <h3 className="nutrition-section-title" id="compare-title">⚖️ Compare Foods</h3>

      <div className="comparison-selector">
        <span style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-display)', fontWeight: 800,
          color: 'var(--clr-text)', padding: '8px 16px',
          background: 'var(--clr-green-50)', borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--clr-green-200)',
          fontSize: '0.9rem',
        }}>
          {food.categoryEmoji} {food.food_name}
        </span>

        <span className="compare-vs">VS</span>

        <select
          className="compare-food-select"
          value={compareSlug}
          onChange={(e) => setCompareSlug(e.target.value)}
          aria-label="Select a food to compare"
          id="compare-food-select"
        >
          <option value="">— Choose a food to compare —</option>
          {Object.entries(
            otherFoods.reduce((groups, f) => {
              if (!groups[f.category]) groups[f.category] = [];
              groups[f.category].push(f);
              return groups;
            }, {})
          ).map(([cat, foods]) => (
            <optgroup key={cat} label={`${foods[0].categoryEmoji} ${cat}`}>
              {foods.map(f => (
                <option key={f.slug} value={f.slug}>{f.food_name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {compareFood ? (
        <table className="comparison-table" aria-label={`Nutrition comparison: ${food.food_name} vs ${compareFood.food_name}`}>
          <thead>
            <tr>
              <th scope="col">Nutrient</th>
              <th scope="col">{food.categoryEmoji} {food.food_name}</th>
              <th scope="col">{compareFood.categoryEmoji} {compareFood.food_name}</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_FIELDS.map((field) => {
              const av = food[field.key];
              const bv = compareFood[field.key];
              const { a: aWins, b: bWins } = getWinner(field.key);

              return (
                <tr key={field.key}>
                  <td>
                    <span className="comp-label">
                      <span aria-hidden="true">{field.icon}</span>
                      {field.label}
                    </span>
                  </td>
                  <td>
                    <span className={`comp-value ${av === null ? 'na' : aWins ? 'winner' : ''}`}>
                      {av !== null ? `${av} ${field.unit}` : 'Not available'}
                    </span>
                  </td>
                  <td>
                    <span className={`comp-value ${bv === null ? 'na' : bWins ? 'winner' : ''}`}>
                      {bv !== null ? `${bv} ${field.unit}` : 'Not available'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div style={{
          textAlign: 'center', padding: 'var(--space-8)',
          color: 'var(--clr-text-muted)', fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>⚖️</span>
          Select a food above to compare nutrition values
        </div>
      )}
    </section>
  );
}
