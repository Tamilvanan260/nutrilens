// CategoryCard.jsx — large floating category card for homepage

import { Link } from 'react-router-dom';

const CATEGORY_CONFIG = {
  'Fruits': {
    slug: 'fruits',
    emoji: '🍎',
    description: 'Packed with vitamins & antioxidants',
    cssClass: 'cat-fruits',
  },
  'Vegetables': {
    slug: 'vegetables',
    emoji: '🥕',
    description: 'Essential minerals & dietary fiber',
    cssClass: 'cat-vegetables',
  },
  'Nuts & Seeds': {
    slug: 'nuts-seeds',
    emoji: '🌰',
    description: 'Healthy fats & plant proteins',
    cssClass: 'cat-nuts',
  },
  'Dairy & Milk Products': {
    slug: 'dairy',
    emoji: '🥛',
    description: 'Calcium-rich & probiotic foods',
    cssClass: 'cat-dairy',
  },
  'Meat & Seafood': {
    slug: 'meat-seafood',
    emoji: '🍗',
    description: 'Explore nutritious meat and seafood options.',
    cssClass: 'cat-meat',
  },
};

export default function CategoryCard({ category, count }) {
  const config = CATEGORY_CONFIG[category] || {
    slug: category.toLowerCase().replace(/\s+/g, '-'),
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
      <span className="category-card-emoji" aria-hidden="true">{config.emoji}</span>
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
