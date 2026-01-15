import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-6 py-12"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning Icon */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="material-symbols-outlined text-primary !text-[80px]"
        >
          progress_activity
        </motion.span>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white">AI Agent Researching...</h3>
          <p className="text-white/60 text-sm">
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
            className="h-full w-1/2 bg-gradient-to-r from-primary to-premium-gold"
          />
        </div>

        {/* Skeleton Cards */}
        <div className="w-full max-w-md space-y-3 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-xl p-4 shimmer-skeleton h-16" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
