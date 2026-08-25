// FoodImage.jsx — lazy-loaded food image with fallback

import { useState } from 'react';

const CATEGORY_FALLBACK = {
  Fruits: '🍎',
  Vegetables: '🥕',
  'Nuts & Seeds': '🌰',
  'Dairy & Milk Products': '🥛',
};

export default function FoodImage({
  src,
  alt,
  category,
  className = '',
  onClick,
  style = {},
}) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fallbackEmoji = CATEGORY_FALLBACK[category] || '🖼️';

  if (errored) {
    return (
      <div
        className={`food-card-img-fallback ${className}`}
        style={{ position: 'absolute', inset: 0, ...style }}
        onClick={onClick}
        aria-label={`Image not available for ${alt}`}
      >
        <span>{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={`skeleton ${className}`}
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        onClick={onClick}
      />
    </>
  );
}
