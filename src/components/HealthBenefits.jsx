// HealthBenefits.jsx — floating cartoon-style health benefit chips

// Map benefit keywords to icons
function getBenefitIcon(text) {
  const t = text.toLowerCase();
  if (t.includes('immun'))       return '🛡️';
  if (t.includes('digest'))      return '🍽️';
  if (t.includes('skin'))        return '✨';
  if (t.includes('hair'))        return '💇';
  if (t.includes('heart') || t.includes('cardio') || t.includes('arteri')) return '❤️';
  if (t.includes('antioxid'))    return '🔬';
  if (t.includes('iron') || t.includes('blood') || t.includes('haemo') || t.includes('hemo')) return '🩸';
  if (t.includes('bone') || t.includes('calcium')) return '🦴';
  if (t.includes('brain') || t.includes('cogni') || t.includes('memory')) return '🧠';
  if (t.includes('eye') || t.includes('vision') || t.includes('ocul')) return '👁️';
  if (t.includes('energy') || t.includes('fatigue')) return '⚡';
  if (t.includes('weight') || t.includes('satiet')) return '⚖️';
  if (t.includes('blood pressure') || t.includes('pressure')) return '💊';
  if (t.includes('sugar') || t.includes('glucose') || t.includes('diabet') || t.includes('glyc')) return '🩺';
  if (t.includes('muscle') || t.includes('protein')) return '💪';
  if (t.includes('liver')) return '🫁';
  if (t.includes('cholesterol') || t.includes('ldl')) return '🫀';
  if (t.includes('sleep'))       return '😴';
  if (t.includes('thyroid'))     return '🦋';
  if (t.includes('gut') || t.includes('microbiome') || t.includes('probiotic')) return '🦠';
  if (t.includes('detox'))       return '🌊';
  if (t.includes('hydrat'))      return '💧';
  if (t.includes('inflam'))      return '🧊';
  return '🌿';
}



export default function HealthBenefits({ food }) {
  const benefits = food.health_benefits || [];
  const rawText = food.health_benefits_raw || '';

  if (!rawText) return null;

  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <h3 className="nutrition-section-title" id="benefits-title">
        💪 Health Benefits
      </h3>

      {benefits.length > 0 && (
        <div className="benefits-chips stagger-children" role="list" aria-label="Health benefits">
          {benefits.map((benefit, i) => (
            <span
              key={i}
              className="benefit-chip"
              role="listitem"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span aria-hidden="true">{getBenefitIcon(benefit)}</span>
              {benefit.trim()}
            </span>
          ))}
        </div>
      )}

      <p style={{ fontSize: '0.72rem', color: 'var(--clr-text-muted)', marginTop: 'var(--space-3)', fontStyle: 'italic' }}>
        ⚠️ For educational purposes only — not medical advice. Consult a healthcare professional for personal guidance.
      </p>
    </section>
  );
}
