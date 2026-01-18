import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import useStore from '../../store/useStore';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const Dashboard = () => {
  const energyLevel = useStore((state) => state.energyLevel);
  const setEnergyLevel = useStore((state) => state.setEnergyLevel);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the app? This will clear all your data.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const energyLevels = [
    { value: 1, label: '🌿 Low', description: 'Taking it gentle today' },
    { value: 2, label: '🍃 Medium', description: 'Steady and balanced' },
    { value: 3, label: '✨ High', description: 'Feeling energized!' },
  ];

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            margin: '0 0 0.5rem 0',
            color: 'var(--color-charcoal)'
          }}>
            CapyTracker
          </h1>
          <p style={{
            fontSize: '1rem',
            margin: 0,
            color: 'var(--color-charcoal)',
            opacity: 0.7
          }}>
            You're doing great! 🌿
          </p>
        </div>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '16px',
            border: '2px solid var(--color-terracotta-sunny)',
            background: 'white',
            color: 'var(--color-terracotta-sunny)',
            fontFamily: 'var(--font-body)',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <RefreshCw size={18} />
          Reset App
        </motion.button>
      </div>

      {/* Welcome Message */}
      <CozyCard style={{ marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🦦</div>
          <h2 style={{
            fontSize: '1.8rem',
            margin: '0 0 1rem 0',
            color: 'var(--color-charcoal)',
            fontFamily: 'var(--font-header)'
          }}>
            Welcome to Your Cozy Space
          </h2>
          <p style={{
            fontSize: '1.1rem',
            margin: '0 0 0.5rem 0',
            color: 'var(--color-charcoal)',
            lineHeight: '1.6',
            opacity: 0.85
          }}>
            Hi friend! This is a judgment-free zone where "adulting" gets a little easier.
          </p>
          <p style={{
            fontSize: '1rem',
            margin: 0,
            color: 'var(--color-charcoal)',
            lineHeight: '1.6',
            opacity: 0.7,
            fontStyle: 'italic'
          }}>
            Take things at your own pace. Every small step counts, and you're doing better than you think. 💚
          </p>
        </div>
      </CozyCard>

      {/* Energy Level Selector */}
      <CozyCard>
        <h3 style={{
          fontSize: '1.2rem',
          marginTop: 0,
          marginBottom: '0.75rem',
          color: 'var(--color-charcoal)'
        }}>
          How are you feeling today?
        </h3>
        <p style={{
          fontSize: '0.9rem',
          margin: '0 0 1rem 0',
          color: 'var(--color-charcoal)',
          opacity: 0.7
        }}>
          Let us know your energy level so we can help you focus on what feels manageable.
        </p>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {energyLevels.map((level) => (
            <motion.button
              key={level.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEnergyLevel(level.value)}
              style={{
                flex: '1 1 auto',
                minWidth: '140px',
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                border: energyLevel === level.value
                  ? '3px solid var(--color-sage-bright)'
                  : '2px solid var(--color-sandstone-dark)',
                background: energyLevel === level.value
                  ? 'var(--color-glass-white)'
                  : 'white',
                color: 'var(--color-charcoal)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{level.label}</span>
              {energyLevel === level.value && (
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  opacity: 0.7
                }}>
                  {level.description}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </CozyCard>
    </div>
  );
};

export default Dashboard;
