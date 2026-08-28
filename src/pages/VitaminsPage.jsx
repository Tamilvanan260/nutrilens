// VitaminsPage.jsx — dedicated full page for Essential Vitamins Guide

import VitaminsGuide from '../components/VitaminsGuide.jsx';
import { Link } from 'react-router-dom';

export default function VitaminsPage() {
  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)' }}>
          <ol style={{ display: 'flex', gap: 8, alignItems: 'center', listStyle: 'none', fontSize: '0.85rem', color: 'var(--clr-text-muted)', flexWrap: 'wrap' }}>
            <li><Link to="/" style={{ color: 'var(--clr-green-500)', fontWeight: 600 }}>Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" style={{ fontWeight: 700, color: 'var(--clr-text)' }}>💊 Essential Vitamins Guide</li>
          </ol>
        </nav>

        {/* Vitamins Guide Component */}
        <VitaminsGuide />
      </div>
    </div>
  );
}
