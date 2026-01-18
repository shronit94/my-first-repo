import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import useStore from '../../store/useStore';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const Dashboard = () => {
  const [showBaselineModal, setShowBaselineModal] = useState(false);
  const [pendingEnergyLevel, setPendingEnergyLevel] = useState(null);

  const energyLevel = useStore((state) => state.energyLevel);
  const setEnergyLevel = useStore((state) => state.setEnergyLevel);
  const getIncompleteTasksCount = useStore((state) => state.getIncompleteTasksCount);
  const replaceWithBaseline = useStore((state) => state.replaceWithBaseline);
  const addBaselineToExisting = useStore((state) => state.addBaselineToExisting);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the app? This will clear all your data.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleEnergyLevelClick = (level) => {
    const incompleteTasksCount = getIncompleteTasksCount();

    // If no incomplete tasks, auto-add baseline
    if (incompleteTasksCount === 0) {
      setEnergyLevel(level);
      replaceWithBaseline(level);
    } else {
      // If tasks exist, ask user what to do
      setPendingEnergyLevel(level);
      setShowBaselineModal(true);
    }
  };

  const handleReplaceWithBaseline = () => {
    if (pendingEnergyLevel) {
      setEnergyLevel(pendingEnergyLevel);
      replaceWithBaseline(pendingEnergyLevel);
      setShowBaselineModal(false);
      setPendingEnergyLevel(null);
    }
  };

  const handleAddToExisting = () => {
    if (pendingEnergyLevel) {
      setEnergyLevel(pendingEnergyLevel);
      addBaselineToExisting(pendingEnergyLevel);
      setShowBaselineModal(false);
      setPendingEnergyLevel(null);
    }
  };

  const handleCancelBaseline = () => {
    setShowBaselineModal(false);
    setPendingEnergyLevel(null);
  };

  const energyLevels = [
    { value: 1, label: '🌿 Low', description: 'Taking it gentle today' },
    { value: 2, label: '🍃 Medium', description: 'Steady and balanced' },
    { value: 3, label: '✨ High', description: 'Feeling energized!' },
  ];

  const energyLevelNames = {
    1: 'Low 🌿',
    2: 'Medium 🍃',
    3: 'High ✨',
  };

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
              onClick={() => handleEnergyLevelClick(level.value)}
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

      {/* Baseline Tasks Modal */}
      <AnimatePresence>
        {showBaselineModal && pendingEnergyLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancelBaseline}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--color-sandstone-light)',
                borderRadius: 'var(--radius-sticker)',
                padding: '2rem',
                maxWidth: '500px',
                width: '100%',
                position: 'relative',
                border: '3px solid var(--color-sage-bright)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCancelBaseline}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--color-sandstone-dark)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <X size={20} color="var(--color-charcoal)" />
              </button>

              {/* Modal Content */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                  {pendingEnergyLevel === 1 ? '🌿' : pendingEnergyLevel === 2 ? '🍃' : '✨'}
                </div>
                <h2 style={{
                  fontSize: '1.5rem',
                  margin: '0 0 0.5rem 0',
                  color: 'var(--color-charcoal)'
                }}>
                  Add {energyLevelNames[pendingEnergyLevel]} Baseline Tasks?
                </h2>
                <p style={{
                  fontSize: '0.95rem',
                  margin: 0,
                  color: 'var(--color-charcoal)',
                  opacity: 0.7,
                  lineHeight: '1.5'
                }}>
                  You already have quests in your list. Would you like to replace them or add the baseline tasks to your existing quests?
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReplaceWithBaseline}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '1rem'
                  }}
                >
                  Replace Current Quests
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToExisting}
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    padding: '1rem'
                  }}
                >
                  Add to Existing Quests
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelBaseline}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '2px solid var(--color-sandstone-dark)',
                    background: 'white',
                    color: 'var(--color-charcoal)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
