// NutritionGrid.jsx — grid of all nutrition cards for a food

import NutritionCard from './NutritionCard.jsx';

// The canonical display order for the detail page
const DISPLAY_NUTRIENTS = [
  'calories',
  'vitamin_c',
  'protein',
  'fiber',
  'calcium',
  'iron',
  'carbohydrates',
  'fat',
  'potassium',
  'magnesium',
  'vitamin_e',
];

// Nutrients that only certain categories track —
// if null for a food whose category never has that column, skip it entirely.
const CATEGORY_NUTRIENTS = {
  'Fruits':               ['calories','vitamin_c','protein','fiber','calcium','iron','carbohydrates','fat','potassium'],
  'Vegetables':           ['calories','vitamin_c','protein','fiber','calcium','iron','carbohydrates','fat','potassium'],
  'Nuts & Seeds':         ['calories','protein','fiber','calcium','iron','carbohydrates','fat','magnesium','vitamin_e'],
  'Dairy & Milk Products':['calories','vitamin_c','protein','calcium','iron','carbohydrates','fat'],
};

export default function NutritionGrid({ food }) {
  // Only show nutrients that the food's category actually tracks.
  // Always show nutrients that exist for that category; skip others when null.
  const allowed = CATEGORY_NUTRIENTS[food.category] || DISPLAY_NUTRIENTS;

  const nutrientsToShow = DISPLAY_NUTRIENTS.filter(key => {
    if (!allowed.includes(key)) return false; // category doesn't track this
    return true; // show even if null (will render "Not available")
  });

  return (
    <div className="nutrition-section">
      <h3 className="nutrition-section-title">
        <span aria-hidden="true">📊</span> Nutritional Info
        <span style={{ fontSize: '0.72rem', color: 'var(--clr-text-muted)', fontWeight: 500, marginLeft: 8 }}>
          per 100g edible portion
        </span>
      </h3>
      <div className="nutrition-grid stagger-children">
        {nutrientsToShow.map((key, i) => (
          <NutritionCard
            key={key}
            nutrientKey={key}
            value={food[key]}
            animDelay={i * 40}
          />
        ))}
      </div>
    </div>
  );
}
