import confetti from 'canvas-confetti';

/**
 * Trigger a premium confetti burst effect
 */
export const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-burst effect for premium feel
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#a855f7', '#ec4899', '#f97316'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#a855f7', '#ec4899', '#f97316'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#a855f7', '#ec4899', '#f97316'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#a855f7', '#ec4899', '#f97316'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#a855f7', '#ec4899', '#f97316'],
  });
};

/**
 * Continuous confetti shower effect
 */
export const triggerConfettiShower = (duration = 3000) => {
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#a855f7', '#ec4899', '#f97316'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#a855f7', '#ec4899', '#f97316'],
    });
  }, 250);
};
