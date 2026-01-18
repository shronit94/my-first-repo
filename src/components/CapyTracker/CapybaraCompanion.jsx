import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import '../../styles/theme.css';

const CapybaraCompanion = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');

  const energyLevel = useStore((state) => state.energyLevel);
  const getProgress = useStore((state) => state.getProgress);
  const tasks = useStore((state) => state.tasks);
  const lastCompletedTask = useStore((state) => state.lastCompletedTask);
  const clearLastCompletedTask = useStore((state) => state.clearLastCompletedTask);

  const progress = getProgress();
  const incompleteTasks = tasks.filter((task) => task.status === 'todo');

  // Completion messages
  const completionMessages = [
    "Proud of you! 💚",
    "One step at a time!",
    "You're doing great, friend ✨",
    "Every little bit counts 🌿",
    "Look at you go! 🦦",
    "Amazing work! 🎉",
    "You've got this!",
    "That's wonderful! 🌸",
  ];

  // Visual states based on energy level
  const capyStates = {
    1: { emoji: '😴', label: 'Resting quietly', accessories: '' },
    2: { emoji: '🦦', label: 'Cozy with tea', accessories: '☕' },
    3: { emoji: '🦦', label: 'Feeling sparkly!', accessories: '🎩✨' },
  };

  const messages = {
    lowEnergy: [
      "Hey, low energy days are totally valid. Just do what you can! 🌿",
      "You're doing great just by being here. One tiny step at a time. 💚",
      "Remember: Rest is productive too! 🛋️",
      "It's okay to take it slow today. 🌱",
    ],
    mediumEnergy: [
      "You've got this! Pick one thing and the rest will follow. ✨",
      "Making progress! Keep that gentle momentum going. 🌸",
      "Look at you go! Every quest completed is a win. 🎉",
      "Steady and balanced - that's the way! 🍃",
    ],
    highEnergy: [
      "You're on fire today! But remember to pace yourself. 🔥",
      "Wow, look at that energy! Channel it wisely! ⚡",
      "Amazing work! Don't forget to take breaks. 🌟",
      "You're absolutely crushing it! Keep going! 🚀",
    ],
    noTasks: [
      "Ready to tackle the day? Add some quests to get started! 🎯",
      "All clear! Time to plan your next adventure. 🗺️",
      "Looking for something to do? Check out the templates! 📚",
    ],
    almostDone: [
      "You're so close! Just a few more quests to go! 🎊",
      "Look at that progress bar! You're crushing it! 💪",
      "Almost there! You're doing wonderfully! 🌈",
    ],
    allDone: [
      "WOW! You completed everything! Time to celebrate! 🎉",
      "All done! You're absolutely amazing! Take a well-deserved break. 🌈",
      "Look at you! Everything is complete! You rock! 🎊",
    ],
  };

  // Show completion message when task is completed
  useEffect(() => {
    if (lastCompletedTask) {
      const randomMsg = completionMessages[Math.floor(Math.random() * completionMessages.length)];
      setCompletionMessage(randomMsg);
      setShowCompletionMessage(true);

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setShowCompletionMessage(false);
        clearLastCompletedTask();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [lastCompletedTask]);

  // Update context message based on state
  useEffect(() => {
    if (showCompletionMessage) return; // Don't change message while showing completion

    let messagePool = [];

    if (incompleteTasks.length === 0 && tasks.length > 0) {
      messagePool = messages.allDone;
    } else if (incompleteTasks.length === 0) {
      messagePool = messages.noTasks;
    } else if (progress >= 70) {
      messagePool = messages.almostDone;
    } else if (energyLevel === 1) {
      messagePool = messages.lowEnergy;
    } else if (energyLevel === 2) {
      messagePool = messages.mediumEnergy;
    } else {
      messagePool = messages.highEnergy;
    }

    const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
    setCurrentMessage(randomMessage);
  }, [energyLevel, progress, tasks.length, incompleteTasks.length, showCompletionMessage]);

  const currentCapyState = capyStates[energyLevel] || capyStates[2];
  const displayMessage = showCompletionMessage ? completionMessage : currentMessage;

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
        maxWidth: '320px',
        pointerEvents: 'none'
      }}
    >
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayMessage}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: showCompletionMessage ? [0, -8, 0] : 0
          }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{
            duration: 0.4,
            y: showCompletionMessage ? {
              repeat: 2,
              duration: 0.3,
              ease: "easeInOut"
            } : {}
          }}
          style={{
            background: showCompletionMessage
              ? 'linear-gradient(135deg, var(--color-sage-bright), var(--color-terracotta-sunny))'
              : 'var(--color-glass-white)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '1rem 1.25rem',
            border: showCompletionMessage
              ? '3px solid var(--color-sage-bright)'
              : '2px solid var(--color-sage-bright)',
            boxShadow: showCompletionMessage
              ? '0 8px 32px rgba(141, 170, 145, 0.4)'
              : 'var(--shadow-cozy)',
            position: 'relative',
            maxWidth: '280px'
          }}
        >
          <p style={{
            margin: 0,
            fontSize: '0.95rem',
            color: showCompletionMessage ? 'white' : 'var(--color-charcoal)',
            fontWeight: showCompletionMessage ? '700' : '500',
            lineHeight: '1.5',
            textShadow: showCompletionMessage ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
          }}>
            {displayMessage}
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
            borderTop: showCompletionMessage
              ? '10px solid var(--color-sage-bright)'
              : '10px solid var(--color-sage-bright)'
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Capybara with Energy State */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        {/* Accessories (hat, sparkles, etc) */}
        {currentCapyState.accessories && (
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              fontSize: '1.5rem',
              position: 'absolute',
              top: '-10px',
              right: energyLevel === 3 ? '-5px' : '50%',
              transform: energyLevel === 3 ? 'none' : 'translateX(50%)'
            }}
          >
            {currentCapyState.accessories}
          </motion.div>
        )}

        {/* Capybara */}
        <motion.div
          animate={{
            y: energyLevel === 1 ? [0, -2, 0] : [0, -8, 0],
            rotate: energyLevel === 1 ? 0 : [0, -2, 2, 0],
          }}
          transition={{
            duration: energyLevel === 1 ? 4 : 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            fontSize: energyLevel === 3 ? '4.5rem' : '4rem',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'font-size 0.3s ease'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentCapyState.emoji}
        </motion.div>

        {/* Energy state label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{
            fontSize: '0.7rem',
            color: 'var(--color-charcoal)',
            fontWeight: '600',
            textAlign: 'center',
            background: 'var(--color-glass-white)',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            pointerEvents: 'none'
          }}
        >
          {currentCapyState.label}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CapybaraCompanion;
