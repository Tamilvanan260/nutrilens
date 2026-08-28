// Footer.jsx

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">🥗 NutriLens</div>
            <p className="footer-tagline">
              Explore Food. Understand Nutrition. Eat Smarter.
              <br />
              Discover the nutrition, benefits and best ways to enjoy your everyday foods.
            </p>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-section-title">Categories</div>
            <nav className="footer-links" aria-label="Food categories">
              <Link to="/category/fruits"       className="footer-link">🍎 Fruits</Link>
              <Link to="/category/vegetables"   className="footer-link">🥕 Vegetables</Link>
              <Link to="/category/nuts-seeds"   className="footer-link">🌰 Nuts & Seeds</Link>
              <Link to="/category/dairy"        className="footer-link">🥛 Dairy & Milk Products</Link>
              <Link to="/category/meat-seafood" className="footer-link">🍗 Meat & Seafood</Link>
            </nav>
          </div>

          {/* Features */}
          <div>
            <div className="footer-section-title">Features</div>
            <nav className="footer-links" aria-label="Site features">
              <Link to="/explore"    className="footer-link">🔍 Explore All Foods</Link>
              <Link to="/nutrients"  className="footer-link">📊 Nutrient Explorer</Link>
              <Link to="/favorites"  className="footer-link">❤️ My Favorites</Link>
              <a href="/#vitamins-guide" className="footer-link">💊 Essential Vitamins Guide</a>
            </nav>
          </div>

          {/* Disclaimer */}
          <div>
            <div className="footer-section-title">Disclaimer</div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Nutrition data is sourced from IFCT 2017 and referenced databases. Values are per 100g edible portion unless noted.
            </p>
          </div>
        </div>

        <div className="footer-disclaimer">
          <span>⚠️</span>
          <span>
            Nutrition information is provided for educational purposes and is not medical advice. 
            Consult a qualified healthcare professional for personal dietary guidance.
          </span>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} NutriLens · Built with React &amp; Vite · Data from IFCT 2017
        </div>
      </div>
    </footer>
  );
}
