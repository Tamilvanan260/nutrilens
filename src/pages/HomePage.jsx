// HomePage.jsx — landing page with hero, category cards, recently viewed

import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getCategoryCounts } from '../services/dataLoader.js';
import CategoryCard from '../components/CategoryCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import FoodCard from '../components/FoodCard.jsx';

const CATEGORY_ORDER = ['Fruits', 'Vegetables', 'Nuts & Seeds', 'Dairy & Milk Products', 'Meat & Seafood'];

const HERO_FOOD_ICONS = [
  { emoji: '🍎', top: '15%', left: '68%',  delay: '0s',   size: '3.5rem', dur: '5s'  },
  { emoji: '🥕', top: '35%', left: '82%',  delay: '0.8s', size: '2.8rem', dur: '6.5s'},
  { emoji: '🌰', top: '65%', left: '72%',  delay: '1.5s', size: '2.5rem', dur: '5.5s'},
  { emoji: '🥛', top: '78%', left: '88%',  delay: '2s',   size: '2.8rem', dur: '7s'  },
  { emoji: '🍗', top: '48%', left: '75%',  delay: '1.8s', size: '2.4rem', dur: '6s'  },
  { emoji: '🍋', top: '52%', left: '60%',  delay: '0.4s', size: '2rem',   dur: '4.5s'},
  { emoji: '🫐', top: '20%', left: '90%',  delay: '1.2s', size: '2.2rem', dur: '6s'  },
  { emoji: '🥦', top: '88%', left: '65%',  delay: '2.5s', size: '2rem',   dur: '5s'  },
];

export default function HomePage() {
  const { allFoods, loading, recentFoods } = useApp();

  const categoryCounts = loading ? {} : getCategoryCounts(allFoods);
  const totalFoods = allFoods.length;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span>🌱</span>
              <span>India's Nutrition Explorer</span>
            </div>

            <h1 className="hero-title" id="hero-title">
              Explore Food.{' '}
              <span className="highlight">Understand Nutrition.</span>{' '}
              Eat Smarter.
            </h1>

            <p className="hero-subtitle">
              Discover the nutrition facts, health benefits and best ways to enjoy your
              everyday foods — all from verified IFCT data.
            </p>

            <div className="hero-actions">
              <Link to="/explore" className="btn btn-primary" id="hero-explore-btn">
                🔍 Explore Foods
              </Link>
              <Link to="/nutrients" className="btn btn-outline" id="hero-nutrients-btn">
                📊 Compare Nutrients
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">{loading ? '—' : totalFoods}+</span>
                <span className="hero-stat-label">Foods</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">{CATEGORY_ORDER.length}</span>
                <span className="hero-stat-label">Categories</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">11+</span>
                <span className="hero-stat-label">Nutrients Tracked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating food icons (decorative) */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {HERO_FOOD_ICONS.map((icon, i) => (
            <span
              key={i}
              className="hero-food-icon"
              style={{
                top: icon.top,
                left: icon.left,
                fontSize: icon.size,
                animationDelay: icon.delay,
                '--dur': icon.dur,
              }}
            >
              {icon.emoji}
            </span>
          ))}
          {/* Large background circle */}
          <div style={{
            position: 'absolute',
            width: '500px', height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--clr-green-100) 0%, transparent 70%)',
            top: '50%', left: '58%',
            transform: 'translate(-50%, -50%)',
            animation: 'float-up-down 8s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section style={{ padding: 'var(--space-16) 0' }} aria-labelledby="categories-title">
        <div className="container">
          <div className="page-header">
            <h2 className="section-title" id="categories-title">
              🌍 Browse by Category
            </h2>
            <p className="section-subtitle">
              Choose a food group to explore its complete nutrition profile
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="category-grid stagger-children">
              {CATEGORY_ORDER.map(cat => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  count={categoryCounts[cat] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== RECENTLY VIEWED ===== */}
      {recentFoods.length > 0 && (
        <section style={{ paddingBottom: 'var(--space-16)' }} aria-labelledby="recent-title">
          <div className="container">
            <div className="recently-viewed">
              <h2 className="section-title" id="recent-title" style={{ marginBottom: 'var(--space-4)' }}>
                🕐 Recently Viewed
              </h2>
              <div className="recently-viewed-list" role="list">
                {recentFoods.map(food => (
                  <Link
                    key={food.slug}
                    to={`/food/${food.slug}`}
                    className="recently-viewed-item"
                    role="listitem"
                    aria-label={`View ${food.food_name}`}
                  >
                    <div className="rv-img-wrap">
                      <img
                        src={food.image}
                        alt={`Fresh ${food.food_name}`}
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div className="rv-name">{food.food_name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURED SNIPPET ===== */}
      <section style={{ paddingBottom: 'var(--space-16)' }} aria-labelledby="why-title">
        <div className="container">
          <div
            className="glass-card"
            style={{
              padding: 'var(--space-10)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,250,243,0.8))',
              textAlign: 'center',
            }}
          >
            <h2 id="why-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem', marginBottom: 'var(--space-4)', color: 'var(--clr-text)' }}>
              Why NutriLens?
            </h2>
            <p style={{ color: 'var(--clr-text-2)', maxWidth: 600, margin: '0 auto var(--space-8)', lineHeight: 1.7 }}>
              Every food value in NutriLens comes directly from the Indian Food Composition Tables (IFCT 2017)
              and referenced international databases — no guessing, no rounding, no invented data.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              {[
                { icon: '📊', text: 'Verified IFCT Data' },
                { icon: '🔍', text: 'Instant Search' },
                { icon: '⚖️', text: 'Food Comparison' },
                { icon: '❤️', text: 'Save Favorites' },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 'var(--space-2)', padding: 'var(--space-4) var(--space-6)',
                  background: 'white', borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)', minWidth: 120,
                }}>
                  <span style={{ fontSize: '1.8rem' }}>{f.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem' }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
