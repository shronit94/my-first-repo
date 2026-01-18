import { Star, Battery } from 'lucide-react';
import useStore from '../store/useStore';
import CozyCard from './CozyCard';

const Dashboard = () => {
  const lowSpoonMode = useStore((state) => state.lowSpoonMode);
  const toggleLowSpoonMode = useStore((state) => state.toggleLowSpoonMode);
  const getTodaysOneThing = useStore((state) => state.getTodaysOneThing);
  const toggleTask = useStore((state) => state.toggleTask);
  const getProgress = useStore((state) => state.getProgress);
  const getCompletedCount = useStore((state) => state.getCompletedCount);
  const spoons = useStore((state) => state.spoons);

  const todaysOneThing = getTodaysOneThing();
  const progress = getProgress();
  const completedCount = getCompletedCount();

  const getCategoryIcon = (category) => {
    const icons = {
      Hygiene: '🚿',
      Home: '🏠',
      Wellness: '💚',
      Social: '👋',
    };
    return icons[category] || '✨';
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Header with Low Spoon Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
            Welcome Back 🌿
          </h1>
          <p style={{ margin: 0, color: 'var(--color-charcoal)', opacity: 0.7 }}>
            You've completed {completedCount} quests today!
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <Battery
            size={20}
            strokeWidth={2}
            color="var(--color-sage-bright)"
            fill={lowSpoonMode ? 'var(--color-terracotta-sunny)' : 'none'}
          />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
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

      {/* Energy Level (Spoons) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
          Energy Level: {spoons}/5 spoons
        </p>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
        }}>
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              style={{
                width: '40px',
                height: '8px',
                borderRadius: '4px',
                background: level <= spoons
                  ? 'var(--color-sage-bright)'
                  : 'var(--color-sandstone-dark)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Today's One Thing - Emergency Card */}
      {todaysOneThing && (
        <CozyCard variant="emergency" className="todays-one-thing">
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}>
            <Star
              size={32}
              fill="var(--color-terracotta-sunny)"
              color="var(--color-terracotta-sunny)"
            />
            <div style={{ flex: 1 }}>
              <h2 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.5rem',
                color: 'var(--color-terracotta-sunny)',
              }}>
                Today's One Thing
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1rem',
              }}>
                <input
                  type="checkbox"
                  checked={todaysOneThing.status === 'done'}
                  onChange={() => toggleTask(todaysOneThing.id)}
                  style={{
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-sage-bright)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    textDecoration: todaysOneThing.status === 'done' ? 'line-through' : 'none',
                  }}>
                    {getCategoryIcon(todaysOneThing.category)} {todaysOneThing.title}
                  </p>
                  <p style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                  }}>
                    {todaysOneThing.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CozyCard>
      )}

      {/* Progress Bar */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
            Overall Progress
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-sage-bright)' }}>
            {progress}%
          </p>
        </div>
        <div style={{
          width: '100%',
          height: '12px',
          background: 'var(--color-sandstone-dark)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-sage-bright), var(--color-terracotta-sunny))',
            transition: 'width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
