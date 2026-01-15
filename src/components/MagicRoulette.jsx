import { motion } from 'framer-motion';
import { Sparkles, Loader2, ChefHat } from 'lucide-react';

const MagicRoulette = ({ onSpin, isLoading, disabled, selectedCount }) => {
  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Main Spin Button */}
        <motion.button
          onClick={onSpin}
          disabled={disabled || isLoading}
          whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
          whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
          className={`
            w-full py-8 rounded-2xl relative overflow-hidden
            backdrop-blur-xl border-2
            transition-all duration-500 group
            ${
              disabled || isLoading
                ? 'bg-gray-800/50 border-gray-700 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-orange-600/30 border-purple-400/50 hover:border-purple-400 cursor-pointer shadow-2xl hover:shadow-purple-500/25'
            }
          `}
        >
          {/* Animated Background Gradient */}
          {!disabled && !isLoading && (
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                backgroundSize: '200% 200%',
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 size={48} className="text-purple-400" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    AI Agent Researching...
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Scouring the web for the perfect recipe match
                  </p>
                </div>
                {/* Loading Bar */}
                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </>
            ) : (
              <>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {disabled ? (
                    <ChefHat size={48} className="text-gray-500" />
                  ) : (
                    <Sparkles size={48} className="text-purple-400" />
                  )}
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                    {disabled ? (
                      'Select Ingredients First'
                    ) : (
                      <>
                        Spin the Magic Roulette
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        >
                          🎰
                        </motion.span>
                      </>
                    )}
                  </h3>
                  <p className="text-gray-400">
                    {disabled
                      ? 'Add at least one ingredient to get started'
                      : `Ready to find recipes with your ${selectedCount} ingredient${
                          selectedCount !== 1 ? 's' : ''
                        }`}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Shimmer Effect on Hover */}
          {!disabled && !isLoading && (
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background:
                  'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
            />
          )}
        </motion.button>

        {/* Decorative Glow */}
        {!disabled && !isLoading && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl opacity-20 blur-xl -z-10 group-hover:opacity-40 transition-opacity duration-500" />
        )}
      </motion.div>

      {/* Helper Text */}
      {!disabled && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles size={14} />
            <span>
              Our AI will find recipes that include your ingredients plus others
            </span>
            <Sparkles size={14} />
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MagicRoulette;
