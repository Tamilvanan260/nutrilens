// FoodDetailPage.jsx — detailed food view: image, nutrition, benefits, intake, comparison

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { findFoodBySlug } from '../services/dataLoader.js';
import NutritionGrid from '../components/NutritionGrid.jsx';
import HealthBenefits from '../components/HealthBenefits.jsx';
import IntakeMethods from '../components/IntakeMethods.jsx';
import ComparisonTable from '../components/ComparisonTable.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import ImageModal from '../components/ImageModal.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const CATEGORY_FALLBACK_EMOJI = {
  Fruits: '🍎',
  Vegetables: '🥕',
  'Nuts & Seeds': '🌰',
  'Dairy & Milk Products': '🥛',
};

export default function FoodDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { allFoods, loading, addToRecent } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const food = findFoodBySlug(allFoods, slug);

  // Track recently viewed
  useEffect(() => {
    if (food) addToRecent(food.slug);
  }, [food?.slug]);

  if (loading) return (
    <div className="page-wrapper">
      <div className="container"><LoadingSpinner /></div>
    </div>
  );

  if (!food) return (
    <div className="page-wrapper">
      <div className="container">
        <div className="empty-state">
          <span className="empty-state-emoji">🤔</span>
          <h1 className="empty-state-title">Food not found</h1>
          <p className="empty-state-text">
            We couldn't find "{slug}". It may not exist in our database.
          </p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    </div>
  );

  const fallbackEmoji = CATEGORY_FALLBACK_EMOJI[food.category] || '🍽️';

  // Get category slug for breadcrumb
  const catSlugMap = {
    Fruits: 'fruits',
    Vegetables: 'vegetables',
    'Nuts & Seeds': 'nuts-seeds',
    'Dairy & Milk Products': 'dairy',
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)' }}>
          <ol style={{ display: 'flex', gap: 8, alignItems: 'center', listStyle: 'none', fontSize: '0.85rem', color: 'var(--clr-text-muted)', flexWrap: 'wrap' }}>
            <li><Link to="/" style={{ color: 'var(--clr-green-500)', fontWeight: 600 }}>Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link to={`/category/${catSlugMap[food.category]}`} style={{ color: 'var(--clr-green-500)', fontWeight: 600 }}>{food.categoryEmoji} {food.category}</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" style={{ fontWeight: 700, color: 'var(--clr-text)' }}>{food.food_name}</li>
          </ol>
        </nav>

        {/* 2-column layout */}
        <div className="food-detail-layout">
          {/* LEFT — Image */}
          <div className="food-detail-image-col">
            <div
              className="food-detail-img-card"
              onClick={() => !imgError && setModalOpen(true)}
              role={imgError ? 'img' : 'button'}
              aria-label={imgError ? `Image unavailable for ${food.food_name}` : `View full image of ${food.food_name}`}
              tabIndex={imgError ? -1 : 0}
              onKeyDown={(e) => { if (e.key === 'Enter' && !imgError) setModalOpen(true); }}
            >
              {imgError ? (
                <div className="food-card-img-fallback" style={{ width: '100%', height: '100%', aspectRatio: '1' }}>
                  <span style={{ fontSize: '5rem' }}>{fallbackEmoji}</span>
                  <span>Image unavailable</span>
                </div>
              ) : (
                <>
                  <img
                    src={food.image}
                    alt={`Fresh ${food.food_name}`}
                    onError={() => setImgError(true)}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div className="img-zoom-hint">🔍 Click to enlarge</div>
                </>
              )}
            </div>

            {/* Quick action buttons below image */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
              <FavoriteButton slug={food.slug} foodName={food.food_name} />
              <Link
                to={`/explore`}
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                ← Back to Explore
              </Link>
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="food-detail-info-col">
            {/* Header card */}
            <div className="food-detail-header">
              <span className={`badge ${food.categoryClass}`} style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}>
                {food.categoryEmoji} {food.category}
              </span>

              <h1 className="food-detail-name">{food.food_name}</h1>

              {food.scientific_name && (
                <p className="food-detail-sci">{food.scientific_name}</p>
              )}

              <div className="food-detail-meta">
                {food.ifct_code && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-muted)', fontWeight: 600 }}>
                    IFCT Code: {food.ifct_code}
                  </span>
                )}
                {food.calories !== null && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    color: 'var(--clr-orange-500)', fontSize: '1.1rem',
                  }}>
                    🔥 {food.calories} kcal
                  </span>
                )}
              </div>
            </div>

            {/* Nutrition Grid */}
            <NutritionGrid food={food} />

            {/* Health Benefits */}
            <HealthBenefits food={food} />

            {/* Intake Methods */}
            <IntakeMethods food={food} />

            {/* Comparison */}
            <ComparisonTable food={food} />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {modalOpen && !imgError && (
        <ImageModal
          src={food.image}
          alt={`Fresh ${food.food_name}`}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
