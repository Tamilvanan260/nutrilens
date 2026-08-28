// CategoryCard.jsx — clean realistic category card for homepage

import { Link } from 'react-router-dom';

const CATEGORY_CONFIG = {
  'Fruits': {
    slug: 'fruits',
    image: `${import.meta.env.BASE_URL}images/categories/fruits.png`,
    emoji: '🍎',
    description: 'Packed with vitamins & antioxidants',
    cssClass: 'cat-fruits',
  },
  'Vegetables': {
    slug: 'vegetables',
    image: `${import.meta.env.BASE_URL}images/categories/vegetables.png`,
    emoji: '🥕',
    description: 'Essential minerals & dietary fiber',
    cssClass: 'cat-vegetables',
  },
  'Nuts & Seeds': {
    slug: 'nuts-seeds',
    image: `${import.meta.env.BASE_URL}images/categories/nuts-seeds.png`,
    emoji: '🌰',
    description: 'Healthy fats & plant proteins',
    cssClass: 'cat-nuts',
  },
  'Dairy & Milk Products': {
    slug: 'dairy',
    image: `${import.meta.env.BASE_URL}images/categories/dairy.png`,
    emoji: '🥛',
    description: 'Calcium-rich & probiotic foods',
    cssClass: 'cat-dairy',
  },
  'Meat & Seafood': {
    slug: 'meat-seafood',
    image: `${import.meta.env.BASE_URL}images/categories/meat-seafood.png`,
    emoji: '🍗',
    description: 'High-quality protein for stronger body',
    cssClass: 'cat-meat',
  },
};

export default function CategoryCard({ category, count }) {
  const config = CATEGORY_CONFIG[category] || {
    slug: category.toLowerCase().replace(/\s+/g, '-'),
    image: '',
    emoji: '🍽️',
    description: '',
    cssClass: '',
  };

  return (
    <Link
      to={`/category/${config.slug}`}
      className={`category-card ${config.cssClass}`}
      aria-label={`Browse ${category} — ${count} foods`}
    >
      <div className="category-card-image-wrap">
        <img
          src={config.image}
          alt={category}
          className="category-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextElementSibling) {
              e.target.nextElementSibling.style.display = 'block';
            }
          }}
        />
        <span className="category-card-emoji category-fallback-emoji" style={{ display: 'none' }} aria-hidden="true">
          {config.emoji}
        </span>
      </div>

      <div className="category-card-name">{category}</div>
      <div className="category-card-count">{count} Foods</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.4 }}>
        {config.description}
      </p>
      <span className="category-card-arrow">
        Explore {config.emoji} →
      </span>
      <span className="category-card-bg-icon" aria-hidden="true">{config.emoji}</span>
    </Link>
  );
}
