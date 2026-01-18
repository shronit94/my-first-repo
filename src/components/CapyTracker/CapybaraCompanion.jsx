import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import '../../styles/theme.css';

const CapybaraCompanion = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const spoons = useStore((state) => state.spoons);
  const getProgress = useStore((state) => state.getProgress);
  const tasks = useStore((state) => state.tasks);

  const progress = getProgress();
  const incompleteTasks = tasks.filter((task) => task.status === 'todo');

  const messages = {
    lowEnergy: [
      "Hey, low spoon days are totally valid. Just do what you can! 🌿",
      "You're doing great just by being here. One tiny step at a time. 💚",
      "Remember: Rest is productive too! 🛋️",
    ],
    mediumEnergy: [
      "You've got this! Pick one thing and the rest will follow. ✨",
      "Making progress! Keep that gentle momentum going. 🌸",
      "Look at you go! Every quest completed is a win. 🎉",
    ],
    highEnergy: [
      "You're on fire today! But remember to pace yourself. 🔥",
      "Wow, look at that energy! Channel it wisely! ⚡",
      "Amazing work! Don't forget to take breaks. 🌟",
    ],
    noTasks: [
      "Ready to tackle the day? Add some quests to get started! 🎯",
      "All clear! Time to plan your next adventure. 🗺️",
    ],
    almostDone: [
      "You're so close! Just a few more quests to go! 🎊",
      "Look at that progress bar! You're crushing it! 💪",
    ],
    allDone: [
      "WOW! You completed everything! Time to celebrate! 🎉",
      "All done! You're absolutely amazing! Take a well-deserved break. 🌈",
    ],
  };

  useEffect(() => {
    // Determine which message to show based on state
    let messagePool = [];

    if (incompleteTasks.length === 0 && tasks.length > 0) {
      messagePool = messages.allDone;
    } else if (incompleteTasks.length === 0) {
      messagePool = messages.noTasks;
    } else if (progress >= 70) {
      messagePool = messages.almostDone;
    } else if (spoons <= 1) {
      messagePool = messages.lowEnergy;
    } else if (spoons <= 3) {
      messagePool = messages.mediumEnergy;
    } else {
      messagePool = messages.highEnergy;
    }

    const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
    setCurrentMessage(randomMessage);
  }, [spoons, progress, tasks.length, incompleteTasks.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '1rem',
        maxWidth: '320px'
      }}
    >
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--color-glass-white)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '1rem 1.25rem',
            border: '2px solid var(--color-sage-bright)',
            boxShadow: 'var(--shadow-cozy)',
            position: 'relative',
            maxWidth: '280px'
          }}
        >
          <p style={{
            margin: 0,
            fontSize: '0.95rem',
            color: 'var(--color-charcoal)',
            fontWeight: '500',
            lineHeight: '1.5'
          }}>
            {currentMessage}
          </p>

          {/* Speech bubble tail */}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '30px',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '10px solid var(--color-sage-bright)'
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Capybara */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          fontSize: '4rem',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
          cursor: 'pointer'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        🦫
      </motion.div>
    </motion.div>
  );
};

export default CapybaraCompanion;
