// FoodCard.jsx — floating food card for category and explore pages

import { Link } from 'react-router-dom';
import FoodImage from './FoodImage.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default function FoodCard({ food, animDelay = 0 }) {
  const calDisplay = food.calories !== null ? `${food.calories} kcal` : 'N/A';

  // Pick one key nutrient to highlight
  const keyNutrient = (() => {
    if (food.vitamin_c !== null)  return { label: 'Vitamin C', value: `${food.vitamin_c} mg` };
    if (food.protein !== null)    return { label: 'Protein',   value: `${food.protein} g` };
    if (food.calcium !== null)    return { label: 'Calcium',   value: `${food.calcium} mg` };
    if (food.magnesium !== null)  return { label: 'Magnesium', value: `${food.magnesium} mg` };
    return null;
  })();

  return (
    <article
      className="food-card"
      style={{ animationDelay: `${animDelay}ms` }}
      aria-label={`${food.food_name} — ${calDisplay}`}
    >
      {/* Image */}
      <Link to={`/food/${food.slug}`} className="food-card-img-wrap" aria-label={`View details for ${food.food_name}`}>
        <FoodImage
          src={food.image}
          alt={`Fresh ${food.food_name}`}
          category={food.category}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
        {/* Favorite button overlay */}
        <div className="food-card-fav">
          <FavoriteButton slug={food.slug} foodName={food.food_name} />
        </div>
      </Link>

      {/* Body */}
      <div className="food-card-body">
        <div className="food-card-cat">
          <span className={`badge ${food.categoryClass}`}>
            {food.categoryEmoji} {food.category}
          </span>
        </div>

        <h3 className="food-card-name">{food.food_name}</h3>

        {food.scientific_name && (
          <p className="food-card-sci">{food.scientific_name}</p>
        )}

        <div className="food-card-calories">
          <span>🔥</span>
          <span>{calDisplay}</span>
          {keyNutrient && (
            <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--clr-green-600)', fontWeight: 700 }}>
              {keyNutrient.label}: {keyNutrient.value}
            </span>
          )}
        </div>

        <div className="food-card-actions">
          <Link
            to={`/food/${food.slug}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, justifyContent: 'center' }}
            aria-label={`View details for ${food.food_name}`}
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
