// LoadingSpinner.jsx

export default function LoadingSpinner({ message = 'Loading nutritious data...' }) {
  return (
    <div className="loading-overlay">
      <div className="spinner" role="status" aria-label="Loading" />
      <p className="loading-text">{message}</p>
    </div>
  );
}
