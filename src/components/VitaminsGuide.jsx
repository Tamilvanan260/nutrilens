// VitaminsGuide.jsx — interactive educational guide explaining essential vitamins & their bodily functions

import { useState } from 'react';
import { Link } from 'react-router-dom';

export const VITAMIN_DEFINITIONS = [
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    scientificName: 'Ascorbic Acid',
    icon: '🍊',
    category: 'Water-Soluble',
    role: 'Supports the immune system, promotes collagen synthesis for skin & joints, and acts as a powerful cellular antioxidant.',
    benefits: ['Immune defense enhancement', 'Skin collagen formation & wound repair', 'Enhances non-heme iron absorption'],
    topFoods: ['Amla (252 mg)', 'Guava (214 mg)', 'Capsicum (125 mg)', 'Drumstick (120 mg)', 'Kiwi (92.7 mg)'],
  },
  {
    id: 'vitamin-a',
    name: 'Vitamin A',
    scientificName: 'Retinol & Beta-Carotene',
    icon: '🥕',
    category: 'Fat-Soluble',
    role: 'Essential for normal vision and retina function, immune system defenses, and cellular growth & skin renewal.',
    benefits: ['Low-light vision & ocular health', 'Immune mucosal barrier maintenance', 'Cellular differentiation & skin integrity'],
    topFoods: ['Carrot (8285 µg)', 'Pumpkin (3100 µg)', 'Mango (2740 µg)', 'Muskmelon (1690 µg)', 'Ghee & Butter'],
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamin B12',
    scientificName: 'Cobalamin',
    icon: '🩸',
    category: 'Water-Soluble',
    role: 'Crucial for red blood cell formation, nervous system maintenance, myelin sheath integrity, and DNA synthesis.',
    benefits: ['Prevents megaloblastic anemia', 'Neurological & cognitive function', 'Cellular DNA & energy production'],
    topFoods: ['Goat Blood (15.0 µg)', 'Vanjaram Fish (12.0 µg)', 'Sardine (4.8 µg)', 'Whole Egg (1.11 µg)', 'Greek Yogurt (0.75 µg)'],
  },
  {
    id: 'vitamin-e',
    name: 'Vitamin E',
    scientificName: 'Alpha-Tocopherol',
    icon: '🥜',
    category: 'Fat-Soluble',
    role: 'Primary fat-soluble antioxidant that protects cell membranes, blood vessels, and skin from oxidative lipid damage.',
    benefits: ['Shields cell membranes from free radicals', 'Supports vascular & endothelial health', 'Skin barrier hydration & protection'],
    topFoods: ['Sunflower Seeds (35.17 mg)', 'Almond (25.86 mg)', 'Peanut (4.28 mg)', 'Walnut (4.12 mg)', 'Dark Chocolate'],
  },
  {
    id: 'vitamin-k',
    name: 'Vitamin K',
    scientificName: 'Phylloquinone & Menaquinone',
    icon: '🥬',
    category: 'Fat-Soluble',
    role: 'Required for synthesizing blood clotting factors and directing calcium into the bone matrix rather than arteries.',
    benefits: ['Normal blood clotting regulation', 'Bone mineral density & osteocalcin activation', 'Arterial elasticity protection'],
    topFoods: ['Broccoli (101.6 µg)', 'Cabbage (76.0 µg)', 'Pumpkin Seeds (51.4 µg)', 'Cashew (34.1 µg)', 'Okra (31.3 µg)'],
  },
  {
    id: 'vitamin-b6',
    name: 'Vitamin B6',
    scientificName: 'Pyridoxine',
    icon: '🧠',
    category: 'Water-Soluble',
    role: 'Acts as a coenzyme in over 100 enzymatic reactions, primarily in protein metabolism, neurotransmitter creation, and hemoglobin synthesis.',
    benefits: ['Neurotransmitter synthesis (serotonin, dopamine)', 'Hemoglobin & red blood cell formation', 'Amino acid & protein metabolism'],
    topFoods: ['Pistachio (1.70 mg)', 'Garlic (1.24 mg)', 'Walnut (0.54 mg)', 'Banana (0.37 mg)', 'Jackfruit (0.33 mg)'],
  },
  {
    id: 'vitamin-b3',
    name: 'Vitamin B3',
    scientificName: 'Niacin / Nicotinic Acid',
    icon: '🥩',
    category: 'Water-Soluble',
    role: 'Essential precursor to NAD/NADP coenzymes, converting fats, carbohydrates, and proteins into usable cellular energy (ATP).',
    benefits: ['Cellular energy (ATP) conversion', 'DNA repair & genomic stability', 'Nervous system & lipid regulation'],
    topFoods: ['Nethili Anchovy (14.0 mg)', 'Chicken Breast (13.7 mg)', 'Peanut (12.1 mg)', 'Chia Seeds (8.83 mg)'],
  },
  {
    id: 'vitamin-b1',
    name: 'Vitamin B1',
    scientificName: 'Thiamine',
    icon: '🌾',
    category: 'Water-Soluble',
    role: 'Crucial for glucose metabolism and carbohydrate energy release, as well as nerve signal transmission and muscle contraction.',
    benefits: ['Carbohydrate energy breakdown', 'Nerve conduction & neurotransmission', 'Cardiac muscle cellular support'],
    topFoods: ['Flax Seeds (1.64 mg)', 'Sesame Seeds (0.79 mg)', 'Green Peas (0.26 mg)'],
  },
  {
    id: 'vitamin-b2',
    name: 'Vitamin B2',
    scientificName: 'Riboflavin',
    icon: '⚡',
    category: 'Water-Soluble',
    role: 'Key component of coenzymes FAD and FMN, necessary for cellular respiration, iron metabolism, and mucosal tissue health.',
    benefits: ['Cellular respiration & energy production', 'Antioxidant regeneration (glutathione)', 'Skin, corneal & mucosal tissue wellness'],
    topFoods: ['Cow Milk (0.18 mg)', 'Buttermilk (0.16 mg)', 'Lassi (0.15 mg)'],
  },
  {
    id: 'vitamin-b9',
    name: 'Vitamin B9',
    scientificName: 'Folate / Folic Acid',
    icon: '🌿',
    category: 'Water-Soluble',
    role: 'Vital for nucleic acid (DNA & RNA) synthesis, rapid cellular division, amino acid interconversion, and preventing neural tube defects.',
    benefits: ['DNA synthesis & cell division', 'Red blood cell maturation', 'Prenatal development & cardiovascular wellness'],
    topFoods: ['Beetroot (109.0 µg)', 'Coconut (26.0 µg)', 'Brinjal (22.0 µg)'],
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D',
    scientificName: 'Calciferol',
    icon: '☀️',
    category: 'Fat-Soluble',
    role: 'Functions like a steroid hormone to facilitate intestinal calcium & phosphate absorption, maintaining skeletal strength and immune balance.',
    benefits: ['Intestinal calcium absorption & bone density', 'Immune cell activation & modulation', 'Muscle function & neuromuscular support'],
    topFoods: ['Mathi / Sardine (4.8 µg)', 'Whole Egg', 'Fortified Dairy'],
  },
];

export default function VitaminsGuide() {
  const [selectedId, setSelectedId] = useState('vitamin-c');
  const activeVit = VITAMIN_DEFINITIONS.find(v => v.id === selectedId) || VITAMIN_DEFINITIONS[0];

  return (
    <section className="vitamins-guide-section" id="vitamins-guide" aria-labelledby="vitamins-guide-title">
      <div className="container">
        <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="badge cat-fruits" style={{ marginBottom: 'var(--space-2)' }}>
            🔬 Nutrition Education
          </div>
          <h2 className="section-title" id="vitamins-guide-title">
            Essential Vitamins Guide
          </h2>
          <p className="section-subtitle">
            Understand the vital physiological roles each vitamin plays in your body and discover the richest foods in our database.
          </p>
        </div>

        {/* Vitamin Selector Chips */}
        <div className="vitamin-chip-list" role="tablist" aria-label="Select vitamin to view explanation">
          {VITAMIN_DEFINITIONS.map(v => (
            <button
              key={v.id}
              className={`vitamin-chip ${selectedId === v.id ? 'active' : ''}`}
              role="tab"
              aria-selected={selectedId === v.id}
              onClick={() => setSelectedId(v.id)}
            >
              <span className="vitamin-chip-icon">{v.icon}</span>
              <span>{v.name}</span>
            </button>
          ))}
        </div>

        {/* Active Vitamin Spotlight Card */}
        <div className="vitamin-spotlight-card" role="tabpanel">
          <div className="vitamin-spotlight-header">
            <div className="vitamin-spotlight-icon-box">
              <span className="vitamin-spotlight-emoji">{activeVit.icon}</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h3 className="vitamin-spotlight-title">{activeVit.name}</h3>
                <span className="badge" style={{ background: 'var(--clr-green-100)', color: 'var(--clr-green-700)' }}>
                  {activeVit.category}
                </span>
              </div>
              <p className="vitamin-spotlight-sci">Scientific name: <strong>{activeVit.scientificName}</strong></p>
            </div>
          </div>

          <div className="vitamin-spotlight-body">
            <div className="vitamin-spotlight-role-box">
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--clr-green-700)', fontWeight: 800, marginBottom: 6 }}>
                💡 Key Physiological Role
              </h4>
              <p style={{ fontSize: '1.05rem', color: 'var(--clr-text)', lineHeight: 1.6, fontWeight: 500 }}>
                {activeVit.role}
              </p>
            </div>

            <div className="vitamin-spotlight-grid">
              <div className="vitamin-spotlight-col">
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--clr-text-2)', marginBottom: 8 }}>
                  ✨ Major Bodily Functions:
                </h4>
                <ul className="vitamin-benefits-list">
                  {activeVit.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="vitamin-spotlight-col">
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--clr-text-2)', marginBottom: 8 }}>
                  🥗 Top Food Sources in NutriLens:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {activeVit.topFoods.map((f, i) => (
                    <span key={i} className="vitamin-food-tag">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
