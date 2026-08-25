// FavoritesPage.jsx — shows all saved favorites

import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import FoodCard from '../components/FoodCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export default function FavoritesPage() {
  const { favoriteFoods, loading } = useApp();

  if (loading) return (
    <div className="page-wrapper">
      <div className="container"><LoadingSpinner /></div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="page-header" aria-labelledby="favorites-title">
          <span className="page-header-emoji" aria-hidden="true">❤️</span>
          <h1 className="page-header-title" id="favorites-title">My Favorites</h1>
          <p className="page-header-sub">
            {favoriteFoods.length === 0
              ? 'You haven\'t saved any favorites yet'
              : `${favoriteFoods.length} food${favoriteFoods.length !== 1 ? 's' : ''} saved`}
          </p>
        </header>

        {favoriteFoods.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-emoji">🤍</span>
            <h2 className="empty-state-title">No favorites yet</h2>
            <p className="empty-state-text">
              Tap the heart icon on any food card to save it here.
            </p>
            <Link to="/explore" className="btn btn-primary" id="go-explore-btn">
              🔍 Explore Foods
            </Link>
          </div>
        ) : (
          <div className="food-grid stagger-children" role="list" aria-label="Favorite foods">
            {favoriteFoods.map((food, i) => (
              <div key={food.id} role="listitem">
                <FoodCard food={food} animDelay={i * 60} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
