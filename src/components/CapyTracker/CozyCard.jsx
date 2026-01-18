import { motion } from 'framer-motion';
import '../../styles/theme.css';

const CozyCard = ({
  children,
  variant = 'default',
  onClick,
  className = '',
  animate = true
}) => {
  const variantClasses = {
    default: 'cozy-card',
    sticker: 'cozy-card cozy-card--sticker',
    emergency: 'cozy-card cozy-card--emergency',
  };

  const cardClass = `${variantClasses[variant]} ${className}`;

  const MotionWrapper = animate ? motion.div : 'div';

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
      }
    : {};

  return (
    <MotionWrapper className={cardClass} onClick={onClick} {...animationProps}>
      {children}
    </MotionWrapper>
  );
};

export default CozyCard;
