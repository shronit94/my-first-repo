import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const CapybaraCompanion = () => {
  const getCompletedCount = useStore((state) => state.getCompletedCount);
  const lowSpoonMode = useStore((state) => state.lowSpoonMode);
  const getProgress = useStore((state) => state.getProgress);

  const completedCount = getCompletedCount();
  const progress = getProgress();

  const [message, setMessage] = useState('');

  const encouragingMessages = [
    "You're doing great! Every small step counts! 🌟",
    "Take it one quest at a time, friend! 💚",
    "Remember: progress over perfection! 🌿",
    "You've got this! I believe in you! ✨",
    "It's okay to rest. Self-care is important! 🛁",
  ];

  const lowSpoonMessages = [
    "Low on spoons? Let's focus on just the essentials! 🥄",
    "You're being so kind to yourself. That's wonderful! 💚",
    "Small steps are still steps forward! 🌱",
  ];

  const celebrationMessages = [
    "WOW! Look at you crushing those quests! 🎉",
    "You're on fire today! Amazing work! 🔥",
    "So proud of your progress! Keep it up! 🌟",
  ];

  useEffect(() => {
    // Choose message based on context
    let messagePool = encouragingMessages;

    if (lowSpoonMode) {
      messagePool = lowSpoonMessages;
    } else if (completedCount >= 3) {
      messagePool = celebrationMessages;
    }

    const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
    setMessage(randomMessage);
  }, [completedCount, lowSpoonMode]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '1rem',
      zIndex: 100,
    }}>
      {/* Speech Bubble */}
      <div style={{
        position: 'relative',
        background: 'var(--color-glass-white)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '1rem 1.25rem',
        borderRadius: '20px',
        border: '2px solid var(--color-sage-bright)',
        maxWidth: '250px',
        boxShadow: '0 4px 16px rgba(141, 170, 145, 0.2)',
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.9rem',
          color: 'var(--color-charcoal)',
          lineHeight: 1.5,
        }}>
          {message}
        </p>

        {/* Speech bubble tail */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '-10px',
          width: 0,
          height: 0,
          borderLeft: '12px solid var(--color-sage-bright)',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
        }} />
      </div>

      {/* Capybara Illustration (Placeholder - can be replaced with actual SVG/Image) */}
      <div style={{
        width: '120px',
        height: '120px',
        background: 'var(--color-sage-bright)',
        borderRadius: '50% 50% 45% 45%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        boxShadow: '0 8px 24px rgba(141, 170, 145, 0.3)',
        border: '3px solid white',
        position: 'relative',
      }}>
        🦫
        {/* Cozy Den indicator - grows with progress */}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-terracotta-sunny)',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.7rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          Den: {progress}%
        </div>
      </div>
    </div>
  );
};

export default CapybaraCompanion;
