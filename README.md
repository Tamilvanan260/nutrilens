# 🥗 NutriLens — India's Nutrition Explorer

<div align="center">

![NutriLens Banner](https://img.shields.io/badge/NutriLens-Nutrition%20Explorer-4ade80?style=for-the-badge&logo=leaflet&logoColor=white)

**Explore Food. Understand Nutrition. Eat Smarter.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![PapaParse](https://img.shields.io/badge/PapaParse-CSV-orange?style=flat-square)](https://www.papaparse.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 About

**NutriLens** is a modern, interactive nutrition website that lets you explore **60+ Indian foods** across 4 categories. All nutrition data is sourced from the **Indian Food Composition Tables (IFCT 2017)** and loaded dynamically from CSV files — no hardcoded values, no paid APIs.

Built with a **floating cartoon UI** theme — vibrant, premium, and data-driven.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🍎 **4 Categories** | Fruits, Vegetables, Nuts & Seeds, Dairy & Milk Products |
| 📊 **CSV-Driven Data** | All nutrition info loaded from IFCT CSV files — nothing hardcoded |
| 🔍 **Global Search** | Instant search by name, scientific name, or category |
| 🔽 **Filter & Sort** | Filter by category + 8 sort options (A-Z, highest protein, etc.) |
| 📈 **Nutrient Explorer** | Rank all 60 foods by any of 11 nutrients with progress bars |
| ⚖️ **Food Comparison** | Side-by-side nutrition comparison of any 2 foods |
| ❤️ **Favorites** | Save foods to your personal favorites (stored in browser) |
| 🕐 **Recently Viewed** | Last 5 viewed foods shown on the homepage |
| 🔍 **Image Lightbox** | Click any food image to zoom with keyboard support |
| 💚 **Health Benefits** | Full benefit descriptions with smart emoji icons |
| 🍽️ **Intake Methods** | Step-by-step guide on how to eat each food |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |
| ♿ **Accessible** | ARIA labels, keyboard navigation, semantic HTML |
| 🌙 **Floating UI** | Animated blobs, glassmorphism, floating cards |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure & SEO meta tags |
| **CSS3 (Vanilla)** | Design system, animations, glassmorphism |
| **JavaScript (ES6+)** | All logic and data handling |
| **React 18** | UI components and state management |
| **Vite 5** | Development server & production build |
| **React Router v6** | Client-side page routing |
| **PapaParse** | CSV file parsing |
| **Google Fonts** | Nunito (headings) + Inter (body) |
| **localStorage** | Favorites & recently viewed persistence |

> ⚡ **No backend. No database. No paid APIs.** Everything runs in the browser.

---

## 📁 Project Structure

```
nutrilens/
├── public/
│   ├── data/                        ← CSV nutrition data files
│   │   ├── fruits.csv               (20 foods)
│   │   ├── vegetables.csv           (20 foods)
│   │   ├── nuts_seeds.csv           (10 foods)
│   │   └── dairy_milk_products.csv  (10 foods)
│   └── images/                      ← Food images (you add these)
│       ├── fruits/                  (20 PNG files)
│       ├── vegetables/              (20 PNG files)
│       ├── nuts-seeds/              (10 PNG files)
│       └── dairy/                   (10 PNG files)
├── src/
│   ├── components/                  ← 16 reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FoodCard.jsx
│   │   ├── FoodImage.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── NutritionGrid.jsx
│   │   ├── HealthBenefits.jsx
│   │   ├── IntakeMethods.jsx
│   │   ├── ComparisonTable.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── ImageModal.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── FloatingShapes.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── NutritionCard.jsx
│   ├── pages/                       ← 6 pages
│   │   ├── HomePage.jsx             (Hero, categories, recently viewed)
│   │   ├── ExplorePage.jsx          (All foods with filter/sort)
│   │   ├── CategoryPage.jsx         (Foods for one category)
│   │   ├── FoodDetailPage.jsx       (Full nutrition detail)
│   │   ├── FavoritesPage.jsx        (Saved favorites)
│   │   └── NutrientExplorerPage.jsx (Rank by nutrient)
│   ├── context/
│   │   └── AppContext.jsx           ← Global state (foods, favorites, search)
│   ├── hooks/
│   │   ├── useFavorites.js          ← Favorites with localStorage
│   │   └── useRecentlyViewed.js     ← Recently viewed with localStorage
│   ├── services/
│   │   └── dataLoader.js            ← CSV fetching, parsing, search, sort
│   ├── utils/
│   │   ├── normalize.js             ← Maps CSV columns → unified food schema
│   │   └── slugify.js               ← Food name → URL slug & image filename
│   ├── App.jsx                      ← Router + layout shell
│   ├── main.jsx                     ← React entry point
│   └── index.css                    ← Complete design system (1100+ lines)
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Install **Node.js** (v18 or later) → https://nodejs.org

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/nutrilens.git

# 2. Navigate into the project
cd nutrilens

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser 🎉

### Build for Production

```bash
npm run build
```

---

## 🖼️ Adding Food Images

Place your **PNG images** in the correct folders with exact filenames:

### 📁 `public/images/fruits/` — 20 files
| Filename | Food |
|---|---|
| `amla.png` | Amla / Indian Gooseberry |
| `apple.png` | Apple |
| `banana.png` | Banana (Robusta) |
| `orange.png` | Orange |
| `mosambi.png` | Sweet Lime / Mosambi |
| `guava.png` | Guava |
| `mango.png` | Mango |
| `papaya.png` | Papaya |
| `pomegranate.png` | Pomegranate |
| `pineapple.png` | Pineapple |
| `watermelon.png` | Watermelon |
| `muskmelon.png` | Muskmelon |
| `grapes.png` | Grapes |
| `jackfruit.png` | Jackfruit |
| `sapota.png` | Sapota / Chikoo |
| `pear.png` | Pear |
| `strawberry.png` | Strawberry |
| `kiwi.png` | Kiwi |
| `jamun.png` | Jamun |
| `coconut.png` | Coconut |

### 📁 `public/images/vegetables/` — 20 files
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
| `cabbage.png` | Cabbage |
| `cucumber.png` | Cucumber |
| `bottle-gourd.png` | Bottle Gourd |
| `bitter-gourd.png` | Bitter Gourd |
| `ridge-gourd.png` | Ridge Gourd |
| `pumpkin.png` | Pumpkin |
| `drumstick.png` | Drumstick / Moringa |
| `green-peas.png` | Green Peas |
| `french-beans.png` | French Beans |
| `capsicum.png` | Capsicum / Bell Pepper |

### 📁 `public/images/nuts-seeds/` — 10 files
| Filename | Food |
|---|---|
| `almond.png` | Almond |
| `peanut.png` | Peanut |
| `cashew.png` | Cashew |
| `walnut.png` | Walnut |
| `pistachio.png` | Pistachio |
| `sunflower-seeds.png` | Sunflower Seeds |
| `pumpkin-seeds.png` | Pumpkin Seeds |
| `flax-seeds.png` | Flax Seeds |
| `chia-seeds.png` | Chia Seeds |
| `sesame-seeds.png` | Sesame Seeds |

### 📁 `public/images/dairy/` — 10 files
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
| `egg.png` | Egg |

> 💡 If an image is missing, the website shows a fallback emoji — it will never crash.

---

## 🌐 Deployment

### Deploy on Vercel (Free)

1. Push your code to GitHub
2. Go to **https://vercel.com** → Sign in with GitHub
3. Click **"Add New Project"** → Select `nutrilens`
4. Click **Deploy** — Vercel auto-detects Vite!
5. Your site goes live at `https://nutrilens.vercel.app`

> Every `git push` triggers an automatic re-deployment! 🚀

### Deploy on Netlify (Free)

```bash
npm run build
# then drag & drop the 'dist/' folder to netlify.com/drop
```

---

## 📊 Data Sources

All nutrition data is from the **Indian Food Composition Tables (IFCT 2017)** published by the National Institute of Nutrition (NIN), India.

> ⚠️ Nutrition values are per **100g edible portion** unless otherwise stated. This data is for **educational purposes only** — not medical advice.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Built With

- ❤️ React + Vite
- 📊 IFCT 2017 Nutrition Data
- 🎨 Vanilla CSS Design System
- 🌿 Floating UI Aesthetic

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ for healthy eating and better nutrition awareness

</div>


🛠️ Technologies Used in This Project
🏗️ Core Framework
Tech	What it does
React 18	JavaScript library for building the UI (components, pages)
Vite 5	Super-fast development server & build tool
JSX	HTML-like syntax written inside JavaScript files (.jsx)
🌐 Languages
Language	Where used
HTML	index.html — page structure & SEO meta tags
CSS	src/index.css — all styling, animations, design system
JavaScript (ES6+)	All logic, data loading, state management
📦 Libraries / Packages
Library	What it does
React Router v6	Navigation between pages (Home → Explore → Food Detail)
PapaParse	Reads and parses the .csv data files
💾 Data Storage
Storage	What it stores
CSV files	All 60 food nutrition data (in public/data/)
localStorage	Favorites & recently viewed (saved in browser)
🎨 Design
Tool	What it does
Google Fonts	Nunito (headings) + Inter (body text)
Vanilla CSS	Custom design system — no Tailwind, no Bootstrap
CSS Variables	Colors, spacing, shadows defined as reusable tokens
📁 In Simple Terms
index.html          → HTML (page skeleton)
src/index.css       → CSS (all styles & animations)
src/*.jsx           → JavaScript + React (all logic & UI)
public/data/*.csv   → CSV data files (food nutrition)
public/images/      → PNG food images (you add these)
No backend. No database. No server required. Everything runs in the browser! 🚀