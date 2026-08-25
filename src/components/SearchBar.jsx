// SearchBar.jsx — global floating search overlay with instant suggestions

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { searchFoods } from '../services/dataLoader.js';

export default function SearchBar() {
  const { allFoods, searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!searchOpen) {
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim().length >= 1) {
      setResults(searchFoods(allFoods, query));
    } else {
      setResults([]);
    }
  }, [query, allFoods]);

  const handleSelect = (food) => {
    setSearchOpen(false);
    navigate(`/food/${food.slug}`);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setSearchOpen(false);
  };

  if (!searchOpen) return null;

  return (
    <div className="search-overlay" onClick={handleOverlayClick} role="dialog" aria-label="Search foods">
      <div className="search-box">
        <div className="search-input-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            className="search-input"
            type="search"
            placeholder="Search foods, nutrients, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search foods"
            id="global-search-input"
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="search-results" role="listbox" aria-label="Search results">
          {query && results.length === 0 && (
            <div className="search-no-results">
              <span style={{ fontSize: '2rem' }}>🥲</span>
              <p>No foods found for "{query}"</p>
            </div>
          )}
          {!query && (
            <div className="search-no-results" style={{ color: 'var(--clr-text-muted)' }}>
              <span style={{ fontSize: '2rem' }}>🔍</span>
              <p>Search 60+ foods by name, type, or category</p>
            </div>
          )}
          {results.map((food) => (
            <div
              key={food.id}
              className="search-result-item"
              onClick={() => handleSelect(food)}
              role="option"
              aria-selected={false}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSelect(food); }}
            >
              <span className="search-result-emoji" aria-hidden="true">
                {food.categoryEmoji}
              </span>
              <div>
                <div className="search-result-name">{food.food_name}</div>
                {food.scientific_name && (
                  <div className="search-result-sci">{food.scientific_name}</div>
                )}
                <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-muted)', marginTop: '2px' }}>
                  {food.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
