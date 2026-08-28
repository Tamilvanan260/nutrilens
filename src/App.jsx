// App.jsx — routing and layout shell

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SearchBar from './components/SearchBar.jsx';
import FloatingShapes from './components/FloatingShapes.jsx';
import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import FoodDetailPage from './pages/FoodDetailPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import NutrientExplorerPage from './pages/NutrientExplorerPage.jsx';
import VitaminsPage from './pages/VitaminsPage.jsx';

// 404 page
function NotFoundPage() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="empty-state">
          <span className="empty-state-emoji">🤷</span>
          <h1 className="empty-state-title">Page Not Found</h1>
          <p className="empty-state-text">The page you're looking for doesn't exist.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/nutrilens">
      <AppProvider>
        {/* Floating background shapes (fixed, behind everything) */}
        <FloatingShapes />

        {/* Navigation */}
        <Navbar />

        {/* Global search overlay */}
        <SearchBar />

        {/* Page content */}
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/explore"           element={<ExplorePage />} />
          <Route path="/category/:slug"    element={<CategoryPage />} />
          <Route path="/food/:slug"        element={<FoodDetailPage />} />
          <Route path="/favorites"         element={<FavoritesPage />} />
          <Route path="/nutrients"         element={<NutrientExplorerPage />} />
          <Route path="/vitamins"          element={<VitaminsPage />} />
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}
