// ImageModal.jsx — full-screen lightbox with zoom support

import { useEffect, useState, useCallback } from 'react';

export default function ImageModal({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);

  const handleClose = useCallback(() => {
    setScale(1);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(s + 0.25, 3));
      if (e.key === '-') setScale(s => Math.max(s - 0.25, 0.5));
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${alt}`}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Close image viewer"
        >
          ✕
        </button>

        <img
          src={src}
          alt={alt}
          className="modal-img"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}
          draggable={false}
        />

        <p className="modal-caption">{alt}</p>

        <div className="modal-zoom-controls" role="group" aria-label="Zoom controls">
          <button
            className="modal-zoom-btn"
            onClick={() => setScale(s => Math.min(s + 0.25, 3))}
            aria-label="Zoom in"
          >
            🔍 Zoom In
          </button>
          <button
            className="modal-zoom-btn"
            onClick={() => setScale(1)}
            aria-label="Reset zoom"
          >
            ⟳ Reset
          </button>
          <button
            className="modal-zoom-btn"
            onClick={() => setScale(s => Math.max(s - 0.25, 0.5))}
            aria-label="Zoom out"
          >
            🔎 Zoom Out
          </button>
        </div>
      </div>
    </div>
  );
}
