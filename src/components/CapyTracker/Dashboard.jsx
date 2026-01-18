import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import CozyCard from './CozyCard';
import '../../styles/theme.css';

const Dashboard = () => {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the app? This will clear all your data.')) {
      localStorage.clear();
      window.location.reload();
    }
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

      {/* Empty state */}
      <CozyCard style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦦</div>
        <p style={{
          fontSize: '1.1rem',
          margin: 0,
          color: 'var(--color-charcoal)',
          opacity: 0.7
        }}>
          Welcome to CapyTracker!
        </p>
      </CozyCard>
    </div>
  );
};

export default Dashboard;
