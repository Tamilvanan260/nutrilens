// KeyVitaminCard.jsx — displays characteristic key vitamin with dynamic icon

const VITAMIN_ICONS = {
  'Vitamin A': '🥕',
  'Vitamin A (Beta-Carotene)': '🥕',
  'Vitamin B1': '🌾',
  'Vitamin B1 (Thiamine)': '🌾',
  'Vitamin B2': '⚡',
  'Vitamin B2 (Riboflavin)': '⚡',
  'Vitamin B3': '🥩',
  'Vitamin B3 (Niacin)': '🥩',
  'Vitamin B6': '🧠',
  'Vitamin B9': '🌿',
  'Vitamin B9 (Folate)': '🌿',
  'Vitamin B12': '🩸',
  'Vitamin C': '🍊',
  'Vitamin D': '☀️',
  'Vitamin E': '🥜',
  'Vitamin K': '🥬',
};

function getVitaminIcon(vitaminName) {
  if (!vitaminName) return '💊';
  for (const [key, icon] of Object.entries(VITAMIN_ICONS)) {
    if (vitaminName.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '💊';
}

export default function KeyVitaminCard({ food }) {
  if (!food || !food.key_vitamin) return null;

  const icon = getVitaminIcon(food.key_vitamin);
  const valDisplay = food.key_vitamin_value
    ? `${food.key_vitamin_value} ${food.key_vitamin_unit || ''}`
    : 'Not available';

  return (
    <div className="key-vitamin-card" role="region" aria-label="Key Characteristic Vitamin">
      <div className="key-vitamin-header">
        <span className="key-vitamin-badge">
          <span aria-hidden="true">💊</span> Key Vitamin
        </span>
      </div>

      <div className="key-vitamin-content">
        <div className="key-vitamin-title-row">
          <span className="key-vitamin-icon" aria-hidden="true">{icon}</span>
          <div>
            <h3 className="key-vitamin-name">{food.key_vitamin}</h3>
            {food.key_vitamin_value && (
              <span className="key-vitamin-value">
                {valDisplay} <small style={{ fontSize: '0.75rem', opacity: 0.75, fontWeight: 600 }}>/ 100g</small>
              </span>
            )}
          </div>
        </div>

        {food.vitamin_explanation && (
          <p className="key-vitamin-explanation">
            "{food.vitamin_explanation}"
          </p>
        )}
      </div>
    </div>
  );
}
