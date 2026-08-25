// IntakeMethods.jsx — floating step-by-step intake method guide

function getMethodIcon(text) {
  const t = text.toLowerCase();
  if (t.includes('juice') || t.includes('drink') || t.includes('shot'))   return '🥤';
  if (t.includes('raw') || t.includes('fresh') || t.includes('eat'))      return '🍽️';
  if (t.includes('smooth'))                                                 return '🫙';
  if (t.includes('powder') || t.includes('grind'))                         return '🌿';
  if (t.includes('pickle'))                                                 return '🫙';
  if (t.includes('boil') || t.includes('steam') || t.includes('cook'))    return '♨️';
  if (t.includes('roast') || t.includes('grill'))                          return '🔥';
  if (t.includes('salad') || t.includes('toss'))                           return '🥗';
  if (t.includes('milk') || t.includes('shake'))                           return '🥛';
  if (t.includes('oat') || t.includes('bowl') || t.includes('cereal'))    return '🥣';
  if (t.includes('snack'))                                                  return '🌰';
  if (t.includes('soup'))                                                   return '🍲';
  if (t.includes('chutney') || t.includes('thogayal'))                    return '🍯';
  if (t.includes('curry'))                                                  return '🍛';
  if (t.includes('soak'))                                                   return '💧';
  if (t.includes('sprinkle') || t.includes('garnish'))                     return '✨';
  if (t.includes('bake'))                                                   return '🫓';
  if (t.includes('freeze'))                                                  return '🧊';
  if (t.includes('warm') || t.includes('hot'))                              return '☕';
  return '🌱';
}

export default function IntakeMethods({ food }) {
  const methods = food.intake_methods || [];
  const rawText = food.intake_methods_raw || '';

  if (!rawText) return null;

  return (
    <section className="intake-section" aria-labelledby="intake-title">
      <h3 className="nutrition-section-title" id="intake-title">
        🍽️ How to Include It in Your Diet
      </h3>

      {methods.length > 0 ? (
        <ol className="intake-steps stagger-children" aria-label="Ways to consume this food">
          {methods.map((method, i) => (
            <li
              key={i}
              className="intake-step"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="intake-step-num" aria-hidden="true">{i + 1}</div>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }} aria-hidden="true">
                {getMethodIcon(method)}
              </span>
              <p className="intake-step-text">{method}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="intake-steps">
          <div className="intake-step">
            <div className="intake-step-num">📖</div>
            <p className="intake-step-text">{rawText}</p>
          </div>
        </div>
      )}
    </section>
  );
}
