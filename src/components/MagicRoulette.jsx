import { motion } from 'framer-motion';

const MagicRoulette = ({ onSpin, isLoading, disabled, selectedCount }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
      <motion.button
        onClick={onSpin}
        disabled={disabled || isLoading}
        whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
        className={`
          group relative flex flex-col items-center justify-center rounded-full transition-all duration-200
          ${disabled || isLoading ? 'size-56 bg-gray-700/50 opacity-60 cursor-not-allowed' : 'size-56 bg-primary spin-glow active:scale-95'}
        `}
      >
        {/* Inner Ring Decoration */}
        {!disabled && !isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-white/20 border-dashed"
          />
        )}

        {isLoading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="material-symbols-outlined text-white !text-[56px] mb-2 drop-shadow-lg"
            >
              progress_activity
            </motion.span>
            <span className="text-white text-sm font-extrabold tracking-[0.2em] leading-tight text-center px-4">
              SEARCHING...
            </span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-white !text-[56px] mb-2 drop-shadow-lg">
              {disabled ? 'cooking' : 'casino'}
            </span>
            <span className="text-white text-sm font-extrabold tracking-[0.2em] leading-tight text-center px-4">
              {disabled ? 'SELECT ITEMS' : 'SPIN THE ROULETTE'}
            </span>
          </>
        )}

        {/* Status Badge */}
        {!disabled && !isLoading && (
          <div className="absolute -top-2 bg-background-dark border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">
            READY
          </div>
        )}
      </motion.button>

      {/* Helper Text */}
      {disabled && (
        <p className="text-white/40 text-sm mt-6 text-center">
          Add ingredients to start spinning
        </p>
      )}
    </div>
  );
};

export default MagicRoulette;
