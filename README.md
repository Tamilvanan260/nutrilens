# 🥗 NutriLens — Nutrition Explorer Website

A premium, interactive React + Vite nutrition website for 60+ Indian foods across 4 categories. Data-driven from CSV files. No paid APIs required.

---

## 🚀 Quick Start

### Prerequisites
Install **Node.js** (v18+) from https://nodejs.org if not installed.

### Install & Run
```bash
cd d:\Nutrition\nutrilens
npm install
npm run dev
```
Then open: http://localhost:5173

---

## 📁 Project Structure

```
nutrilens/
├── public/
│   ├── data/                    ← CSV data files (auto-loaded)
│   │   ├── fruits.csv
│   │   ├── vegetables.csv
│   │   ├── nuts_seeds.csv
│   │   └── dairy_milk_products.csv
│   └── images/                  ← YOUR food images go here
│       ├── fruits/              (20 images)
│       ├── vegetables/          (20 images)
│       ├── nuts-seeds/          (10 images)
│       └── dairy/               (10 images)
├── src/
│   ├── components/              (16 reusable components)
│   ├── pages/                   (6 pages)
│   ├── context/                 (global state)
│   ├── hooks/                   (favorites, recently viewed)
│   ├── services/                (CSV data loader)
│   └── utils/                   (slugify, normalize)
└── package.json
```

---

## 🖼️ Image Files — Place Your Images Here

Place your **61 AI-generated PNG images** into the correct folders:

### 📁 `public/images/fruits/` (20 images)
| Filename | Food |
|---|---|
| `amla.png` | Amla / Indian Gooseberry |
| `apple.png` | Apple |
| `banana.png` | Banana (Robusta) |
| `orange.png` | Orange |
| `mosambi.png` | Sweet Lime / Mosambi |
| `guava.png` | Guava (White Flesh) |
| `mango.png` | Mango (Ripe Banganapalli) |
| `papaya.png` | Papaya (Ripe) |
| `pomegranate.png` | Pomegranate |
| `pineapple.png` | Pineapple |
| `watermelon.png` | Watermelon |
| `muskmelon.png` | Muskmelon |
| `grapes.png` | Grapes (Seedless Green) |
| `jackfruit.png` | Jackfruit (Ripe) |
| `sapota.png` | Sapota / Chikoo |
| `pear.png` | Pear |
| `strawberry.png` | Strawberry |
| `kiwi.png` | Kiwi |
| `jamun.png` | Jamun / Indian Blackberry |
| `coconut.png` | Coconut (Fresh Kernel) |

### 📁 `public/images/vegetables/` (20 images)
| Filename | Food |
|---|---|
| `tomato.png` | Tomato |
| `potato.png` | Potato |
| `carrot.png` | Carrot |
| `beetroot.png` | Beetroot |
| `onion.png` | Onion |
| `garlic.png` | Garlic |
| `brinjal.png` | Brinjal / Eggplant |
| `okra.png` | Okra / Ladies Finger |
| `cauliflower.png` | Cauliflower |
| `broccoli.png` | Broccoli |
| `cabbage.png` | Cabbage (Green) |
| `cucumber.png` | Cucumber |
| `bottle-gourd.png` | Bottle Gourd / Sorakkai |
| `bitter-gourd.png` | Bitter Gourd / Pavakkai |
| `ridge-gourd.png` | Ridge Gourd / Peerkangai |
| `pumpkin.png` | Pumpkin / Parangikkai |
| `drumstick.png` | Drumstick / Moringa Pods |
| `green-peas.png` | Green Peas (Fresh) |
| `french-beans.png` | French Beans |
| `capsicum.png` | Capsicum / Bell Pepper |

### 📁 `public/images/nuts-seeds/` (10 images)
| Filename | Food |
|---|---|
| `almond.png` | Almond |
| `peanut.png` | Peanut / Groundnut |
| `cashew.png` | Cashew |
| `walnut.png` | Walnut |
| `pistachio.png` | Pistachio |
| `sunflower-seeds.png` | Sunflower Seeds |
| `pumpkin-seeds.png` | Pumpkin Seeds |
| `flax-seeds.png` | Flax Seeds |
| `chia-seeds.png` | Chia Seeds |
| `sesame-seeds.png` | Sesame Seeds (White) |

### 📁 `public/images/dairy/` (10 images)
| Filename | Food |
|---|---|
| `cow-milk.png` | Cow Milk |
| `dark-chocolate.png` | Dark Chocolate |
| `curd.png` | Curd |
| `buttermilk.png` | Buttermilk |
| `paneer.png` | Paneer |
| `butter.png` | Butter |
| `ghee.png` | Ghee |
| `greek-yogurt.png` | Greek Yogurt |
| `lassi.png` | Lassi |
| `egg.png` | Egg (Whole) |

> **Important:** Filenames must match exactly (lowercase, hyphens for spaces).
> If an image is missing, the website shows a fallback emoji — it won't crash.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🍎 4 Categories | Fruits, Vegetables, Nuts & Seeds, Dairy |
| 📊 CSV Data | Loaded dynamically — no hardcoding |
| 🔍 Global Search | Name, scientific name, category |
| 🔽 Filter & Sort | By category + 8 sort options |
| 📈 Nutrient Explorer | Rank all foods by any nutrient |
| ⚖️ Compare | Side-by-side comparison of any 2 foods |
| ❤️ Favorites | Saved to localStorage |
| 🕐 Recently Viewed | Last 5 foods on homepage |
| 🔍 Image Lightbox | Zoom, keyboard, mobile-friendly |
| 📱 Responsive | Mobile, tablet, desktop |
| ♿ Accessible | ARIA labels, keyboard nav, alt text |

---

## 🔧 Technology

- **React 18** + **Vite 5**
- **React Router v6** — client-side routing
- **PapaParse** — CSV parsing
- **Vanilla CSS** — custom design system
- **Google Fonts** — Nunito + Inter
- **localStorage** — favorites & recently viewed

---

## ⚠️ Notes

- Dairy CSV has **10 foods** (not 11 as originally planned)
- Nuts & Seeds don't have Vitamin C/Potassium — shows "Not available"
- Dairy doesn't have Scientific Name — shows "Not available"
- All data from IFCT 2017 (Indian Food Composition Tables)
- No paid APIs used anywhere
