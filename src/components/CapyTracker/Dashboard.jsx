import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import useStore from '../../store/useStore';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const Dashboard = () => {
  const lowSpoonMode = useStore((state) => state.lowSpoonMode);
  const toggleLowSpoonMode = useStore((state) => state.toggleLowSpoonMode);
  const spoons = useStore((state) => state.spoons);
  const setSpoons = useStore((state) => state.setSpoons);
  const getTodaysOneThing = useStore((state) => state.getTodaysOneThing);
  const toggleTask = useStore((state) => state.toggleTask);
  const getProgress = useStore((state) => state.getProgress);

  const todaysOneThing = getTodaysOneThing();
  const progress = getProgress();

  const categoryIcons = {
    Hygiene: '🚿',
    Home: '🏠',
    Wellness: '💚',
    Social: '🌸',
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header with Low Spoon Toggle */}
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

        {/* Low Spoon Mode Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--color-glass-white)',
          padding: '0.75rem 1.25rem',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}>
          <Zap size={20} color="var(--color-terracotta-sunny)" />
          <span style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--color-charcoal)'
          }}>
            Low Spoon Mode
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={lowSpoonMode}
              onChange={toggleLowSpoonMode}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* Progress Bar */}
      <CozyCard style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Sparkles size={24} color="var(--color-sage-bright)" />
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--color-charcoal)'
              }}>
                Your Cozy Den Progress
              </span>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                color: 'var(--color-sage-bright)'
              }}>
                {progress}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '12px',
              background: 'var(--color-sandstone-dark)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, var(--color-sage-bright), var(--color-terracotta-sunny))`,
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        </div>
      </CozyCard>

      {/* Spoons Counter */}
      <CozyCard style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.2rem',
          marginTop: 0,
          marginBottom: '1rem',
          color: 'var(--color-charcoal)'
        }}>
          How many spoons today? 🥄
        </h3>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSpoons(level)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: spoons === level
                  ? 'var(--color-sage-bright)'
                  : 'var(--color-sandstone-dark)',
                color: spoons === level ? 'white' : 'var(--color-charcoal)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {level} {level === 1 ? 'spoon' : 'spoons'}
            </motion.button>
          ))}
        </div>
      </CozyCard>

      {/* Today's One Thing */}
      {todaysOneThing && (
        <CozyCard
          variant="emergency"
          style={{ marginBottom: '1.5rem' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '1.4rem',
                marginTop: 0,
                marginBottom: '0.75rem',
                color: 'var(--color-charcoal)'
              }}>
                Today's One Thing
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>
                  {categoryIcons[todaysOneThing.category] || '✨'}
                </span>
                <p style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  color: 'var(--color-charcoal)',
                  fontWeight: '500'
                }}>
                  {todaysOneThing.title}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTask(todaysOneThing.id)}
              className="btn-primary"
              style={{
                padding: '0.75rem 1.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              Mark Done
            </motion.button>
          </div>
        </CozyCard>
      )}

      {!todaysOneThing && (
        <CozyCard style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{
            fontSize: '1.4rem',
            margin: '0 0 0.5rem 0',
            color: 'var(--color-charcoal)'
          }}>
            All caught up!
          </h3>
          <p style={{
            fontSize: '1rem',
            margin: 0,
            color: 'var(--color-charcoal)',
            opacity: 0.7
          }}>
            You're crushing it today! Add some quests below to keep going.
          </p>
        </CozyCard>
      )}
    </div>
  );
};

export default Dashboard;
