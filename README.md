# 🎰 Pantry Roulette - Your Lazy Chef Butler

A premium, lazy-first web application that removes decision fatigue for unmotivated cooks. Select your ingredients, spin the magic roulette, and let our AI agent research the web to find real, professional recipes for you!

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Ingredient Picker**: Beautiful chip-based UI with 26+ common staples
- **Custom Ingredients**: Add any ingredient you want (Kimchi, Sriracha, etc.)
- **Live Recipe Search**: No local database - all recipes fetched in real-time from Edamam API
- **"Ingredients Plus" Logic**: Finds recipes that contain AT LEAST your ingredients (but can include more)
- **Magic Roulette Button**: Premium loading states with shimmer effects
- **Source Attribution**: Every recipe links back to the original website

### 🎨 Premium UX/UI
- **Dark Mode Glassmorphism**: Beautiful backdrop blur with subtle borders
- **High Contrast**: Maximum legibility - no dim text on dark backgrounds
- **Framer Motion Animations**: Smooth, butter-like transitions throughout
- **Confetti Celebrations**: Burst effects when recipes are found
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

### 🧠 Lazy Intelligence
- **Lazy Swaps**: Click any ingredient to see smart substitutions
  - Heavy cream → Greek yogurt
  - Fresh garlic → Garlic powder (save 5 mins!)
  - And many more...
- **AI Tips**: Helpful shortcuts displayed on recipe cards
- **Butler Persona**: The app feels like a helpful assistant

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Edamam Recipe Search API credentials (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-first-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API credentials**

   Get your free Edamam API credentials:
   - Visit [Edamam Developer Portal](https://developer.edamam.com/)
   - Sign up for a free account
   - Subscribe to the "Recipe Search API" (free tier: 10 requests/min, 10,000/month)
   - Copy your Application ID and Application Key

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   ```
   VITE_EDAMAM_APP_ID=your_app_id_here
   VITE_EDAMAM_APP_KEY=your_app_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Premium animations
- **Lucide React** - Beautiful icons
- **Canvas Confetti** - Celebration effects
- **Edamam API** - Real recipe data

## 📦 Project Structure

```
src/
├── components/
│   ├── IngredientPicker.jsx  # Chip-based ingredient selector
│   ├── MagicRoulette.jsx     # Animated spin button
│   ├── RecipeCard.jsx        # Recipe display with swaps
│   └── LoadingSkeleton.jsx   # Premium loading state
├── utils/
│   ├── recipeApi.js          # Edamam API integration
│   └── confetti.js           # Confetti effects
├── App.jsx                   # Main app component
├── main.jsx                  # Entry point
└── index.css                 # Global styles + Tailwind
```

## 🎮 How to Use

1. **Select Ingredients**: Click on common staples or add your own custom ingredients
2. **Spin the Roulette**: Hit the big magic button to start the AI search
3. **Enjoy Your Recipe**: View the beautiful recipe card with:
   - Recipe image and details
   - Servings, time, and ingredient count
   - Full ingredient list with lazy swap suggestions
   - Link to full recipe instructions
4. **Try Again**: Spin again for a different recipe or start over with new ingredients

## 🎯 Lazy Swap Feature

Click on any highlighted ingredient in the recipe card to see smart substitutions:
- Saves time with pre-processed alternatives
- Reduces chopping and prep work
- Uses pantry staples you probably already have
- Shows the reason for each swap

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  'glass-border': 'rgba(255, 255, 255, 0.1)',
  'glass-bg': 'rgba(255, 255, 255, 0.05)',
}
```

### Ingredients List
Modify the `COMMON_INGREDIENTS` array in `src/components/IngredientPicker.jsx`

### Lazy Swaps
Add more swaps in the `LAZY_SWAPS` object in `src/components/RecipeCard.jsx`

### Lazy Tips
Edit the `lazyTips` array in `src/components/RecipeCard.jsx`

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## 📝 API Notes

- **Free Tier Limits**: 10 requests/min, 10,000 requests/month
- **Rate Limiting**: Built-in retry logic for network errors
- **Demo Mode**: If no API keys are provided, you'll get a helpful error message

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this for your own projects

## 🙏 Credits

- Recipes powered by [Edamam API](https://www.edamam.com/)
- Built with love for lazy chefs everywhere 🧑‍🍳

---

**Built for the lazy chef in all of us!** 🎰🍳
