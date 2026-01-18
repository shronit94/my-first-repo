# 🦫 CapyTracker - Your Cozy Life Planner

Making adulting a little less hard 🌿

## ✨ Features

### 🎯 Core Functionality
- **Dashboard**: Shows "Today's One Thing" - focus on what matters most
- **Low Spoon Mode Toggle**: Simplify your day when energy is low
- **Adulting Templates Library**: Pre-made task templates for common adult responsibilities
- **Quest List**: Gamified task tracking to make chores more fun
- **Capybara Companion**: A cozy companion that follows you around

### 🎨 Cozy UX/UI
- **Warm, Natural Color Palette**: Earth tones and calming colors
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Friendly Icons**: Beautiful Lucide React icons throughout
- **Responsive Design**: Works on all devices

### 🧠 Low-Pressure Design
- Focused on reducing overwhelm and decision fatigue
- Gentle reminders without guilt
- Celebrating small wins
- Making tasks feel like quests, not chores

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation

1. **Navigate to the project directory**
   ```bash
   cd projects/capytracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling (with custom theme)
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Zustand** - State management

## 📦 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx           # Main dashboard view
│   ├── AdultingTemplates.jsx   # Template library
│   ├── QuestList.jsx           # Task list component
│   ├── CapybaraCompanion.jsx   # Animated companion
│   ├── CozyCard.jsx            # Reusable card component
│   ├── AITip.jsx               # Helpful tips component
│   ├── LoadingSkeleton.jsx     # Loading states
│   └── BottomNav.jsx           # Navigation component
├── store/
│   └── useStore.js             # Zustand state management
├── styles/
│   └── theme.css               # Custom CSS variables and theme
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## 🎮 How to Use

1. **View Your Dashboard**: See your "One Thing" for today
2. **Toggle Low Spoon Mode**: Simplify your view when overwhelmed
3. **Browse Templates**: Find pre-made task lists for common adulting needs
4. **Create Quests**: Add tasks and watch them become fun quests
5. **Enjoy Your Companion**: The capybara is here to keep you company!

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## 🤝 Contributing

This is a personal project focused on making daily life more manageable!

## 📄 License

MIT License - feel free to use this for your own projects

---

**Making adulting less hard, one quest at a time!** 🦫🌿
