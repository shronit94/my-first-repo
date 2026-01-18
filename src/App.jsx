import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, List, BookOpen } from 'lucide-react';
import Dashboard from './components/CapyTracker/Dashboard';
import QuestList from './components/CapyTracker/QuestList';
import TemplateLibrary from './components/CapyTracker/TemplateLibrary';
import CapybaraCompanion from './components/CapyTracker/CapybaraCompanion';
import './styles/theme.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'quests', label: 'Quests', icon: List },
    { id: 'templates', label: 'Templates', icon: BookOpen },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Tab Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--color-glass-white)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '1rem',
        boxShadow: 'var(--shadow-cozy)'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '16px',
                  border: 'none',
                  background: activeTab === tab.id
                    ? 'var(--color-terracotta-sunny)'
                    : 'var(--color-sandstone-dark)',
                  color: activeTab === tab.id ? 'white' : 'var(--color-charcoal)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <IconComponent size={20} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'quests' && <QuestList />}
        {activeTab === 'templates' && <TemplateLibrary />}
      </main>

      {/* Capybara Companion */}
      <CapybaraCompanion />
    </div>
  );
}

export default App;
