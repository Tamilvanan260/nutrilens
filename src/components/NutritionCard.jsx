// NutritionCard.jsx — single floating nutrition stat card

import { formatNutrient } from '../utils/normalize.js';

const NUTRIENT_CONFIG = [
  { key: 'calories',      icon: '🔥', label: 'Calories',      unit: 'kcal', color: '#f97316' },
  { key: 'vitamin_c',     icon: '🍊', label: 'Vitamin C',     unit: 'mg',   color: '#fb923c' },
  { key: 'protein',       icon: '💪', label: 'Protein',       unit: 'g',    color: '#22c55e' },
  { key: 'fiber',         icon: '🌿', label: 'Fiber',         unit: 'g',    color: '#16a34a' },
  { key: 'calcium',       icon: '🦴', label: 'Calcium',       unit: 'mg',   color: '#60a5fa' },
  { key: 'iron',          icon: '🩸', label: 'Iron',          unit: 'mg',   color: '#f87171' },
  { key: 'carbohydrates', icon: '🌾', label: 'Carbohydrates', unit: 'g',    color: '#a78bfa' },
  { key: 'fat',           icon: '🫒', label: 'Fat',           unit: 'g',    color: '#fbbf24' },
  { key: 'potassium',     icon: '⚡', label: 'Potassium',     unit: 'mg',   color: '#34d399' },
  { key: 'magnesium',     icon: '✨', label: 'Magnesium',     unit: 'mg',   color: '#818cf8' },
  { key: 'vitamin_e',     icon: '🌻', label: 'Vitamin E',     unit: 'mg',   color: '#fcd34d' },
];

export default function NutritionCard({ nutrientKey, value, animDelay = 0 }) {
  const config = NUTRIENT_CONFIG.find(n => n.key === nutrientKey) || {
    icon: '📊', label: nutrientKey, unit: '', color: 'var(--clr-green-500)',
  };

  const isNA = value === null || value === undefined;

  return (
    <div
      className="nutrition-card"
      style={{ animationDelay: `${animDelay}ms`, '--accent': config.color }}
      role="region"
      aria-label={`${config.label}: ${isNA ? 'Not available' : value + ' ' + config.unit}`}
    >
      <span className="nutrition-card-icon" aria-hidden="true">{config.icon}</span>
      <div className="nutrition-card-label">{config.label}</div>
      {isNA ? (
        <div className="nutrition-na">Not available</div>
      ) : (
        <div className="nutrition-card-value">
          {value}
          <span className="nutrition-card-unit"> {config.unit}</span>
        </div>
      )}
    </div>
  );
}

export { NUTRIENT_CONFIG };
