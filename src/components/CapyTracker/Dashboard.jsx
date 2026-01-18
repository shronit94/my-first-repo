import CozyCard from './CozyCard';
import '../../styles/theme.css';

const Dashboard = () => {
  return (
    <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
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
