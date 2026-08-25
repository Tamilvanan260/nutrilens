// FavoriteButton.jsx

import { useApp } from '../context/AppContext.jsx';

export default function FavoriteButton({ slug, foodName, className = '' }) {
  const { isFavorite, toggleFavorite } = useApp();
  const active = isFavorite(slug);

  return (
    <button
      className={`fav-btn ${active ? 'active' : ''} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(slug);
      }}
      aria-label={active ? `Remove ${foodName} from favorites` : `Add ${foodName} to favorites`}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      {active ? '❤️' : '🤍'}
    </button>
  );
}
