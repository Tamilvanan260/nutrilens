// CategoryCard.jsx — clean realistic category card for homepage

import { useState } from 'react';
import { Link } from 'react-router-dom';

function getCategoryConfig(category) {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  const map = {
    'Fruits': {
      slug: 'fruits',
      image: `${cleanBase}images/categories/fruits.png`,
      emoji: '🍎',
      description: 'Packed with vitamins & antioxidants',
      cssClass: 'cat-fruits',
    },
    'Vegetables': {
      slug: 'vegetables',
      image: `${cleanBase}images/categories/vegetables.png`,
      emoji: '🥕',
      description: 'Essential minerals & dietary fiber',
      cssClass: 'cat-vegetables',
    },
    'Nuts & Seeds': {
      slug: 'nuts-seeds',
      image: `${cleanBase}images/categories/nuts-seeds.png`,
      emoji: '🌰',
      description: 'Healthy fats & plant proteins',
      cssClass: 'cat-nuts',
    },
    'Dairy & Milk Products': {
      slug: 'dairy',
      image: `${cleanBase}images/categories/dairy.png`,
      emoji: '🥛',
      description: 'Calcium-rich & probiotic foods',
      cssClass: 'cat-dairy',
    },
    'Meat & Seafood': {
      slug: 'meat-seafood',
      image: `${cleanBase}images/categories/meat-seafood.png`,
      emoji: '🍗',
      description: 'High-quality protein for stronger body',
      cssClass: 'cat-meat',
    },
  };

  return map[category] || {
    slug: category.toLowerCase().replace(/\s+/g, '-'),
    image: '',
    emoji: '🍽️',
    description: '',
    cssClass: '',
  };
}

export default function CategoryCard({ category, count }) {
  const config = getCategoryConfig(category);
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/category/${config.slug}`}
      className={`category-card ${config.cssClass}`}
      aria-label={`Browse ${category} — ${count} foods`}
    >
      <div className="category-card-image-wrap">
        {!imgError && config.image ? (
          <img
            src={config.image}
            alt={category}
            className="category-card-image"
            loading="eager"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="category-card-emoji" aria-hidden="true">
            {config.emoji}
          </span>
        )}
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
