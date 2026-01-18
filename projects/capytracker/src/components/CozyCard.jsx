const CozyCard = ({ children, variant = 'default', className = '', onClick }) => {
  let variantClass = '';

  switch (variant) {
    case 'sticker':
      variantClass = 'cozy-card--sticker';
      break;
    case 'emergency':
      variantClass = 'cozy-card--emergency';
      break;
    default:
      variantClass = '';
  }

  return (
    <div
      className={`cozy-card ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CozyCard;
