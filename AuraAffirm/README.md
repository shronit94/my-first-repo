# Aura Affirm 🌟

> Your personal guide to confidence and motivation through daily voice affirmation rituals

Aura Affirm is a Progressive Web App (PWA) that provides guided voice affirmation sessions powered by Google's Gemini 2.0 AI. Speak your affirmations with Aura, a mindful AI guide, and build lasting positive habits.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Voice Sessions**: Real-time conversation with Aura using Gemini 2.0 Flash
- **Personalized Experience**: Aura uses your name for a more intimate connection
- **Voice Selection**: Choose between 4 different AI voices (Kore, Puck, Charon, Fenrir)
- **Background Music**: Optional ambient sounds during sessions
- **Session Tracking**: Complete history of all your affirmation sessions
- **Streak Counter**: Track your daily practice with current and longest streaks
- **Calendar View**: Visual representation of your practice journey

### 🔒 Security & Privacy
- **Secure Backend**: API keys safely stored on server-side (FIXED security vulnerability!)
- **No Data Sharing**: All user data stays in your browser
- **Error Recovery**: Comprehensive error boundaries and handling

### ♿ Accessibility
- **ARIA Labels**: Full screen reader support
- **Keyboard Navigation**: ESC to close sessions, tab navigation
- **Live Regions**: Real-time status announcements
- **Focus Management**: Proper focus indicators throughout

### 📱 Progressive Web App
- **Offline Support**: Service worker for offline functionality
- **Installable**: Add to home screen on mobile and desktop
- **Push Notifications**: Daily reminders for your ritual (optional)
- **Responsive Design**: Beautiful on all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shronit94/AuraAffirm.git
cd AuraAffirm
```

2. **Install dependencies**
```bash
npm install
cd server && npm install && cd ..
```

3. **Set up environment variables**

Frontend (`.env`):
```bash
cp .env.example .env
```

Server (`server/.env`):
```bash
cp server/.env.example server/.env
# Edit server/.env and add your GEMINI_API_KEY
```

4. **Run the development servers**
```bash
# Run both frontend and backend
npm run dev:all

# Or separately:
npm run dev          # Frontend only (http://localhost:5173)
npm run dev:server   # Backend only (http://localhost:3001)
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🏗️ Building for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/shronit94/AuraAffirm/issues)

---

Made with ❤️ by [Ronit Shnaider](https://github.com/shronit94)
