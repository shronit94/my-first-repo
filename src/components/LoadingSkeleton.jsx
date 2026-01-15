import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="glass-card overflow-hidden">
        {/* Image Skeleton */}
        <div className="relative h-80 shimmer-skeleton" />

        {/* Content Skeleton */}
        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="w-8 h-8 mx-auto mb-2 rounded-full shimmer-skeleton" />
                <div className="w-12 h-8 mx-auto mb-2 rounded shimmer-skeleton" />
                <div className="w-16 h-3 mx-auto rounded shimmer-skeleton" />
              </div>
            ))}
          </div>

          {/* Title Skeleton */}
          <div className="mb-6">
            <div className="w-32 h-6 mb-4 rounded shimmer-skeleton" />
            <div className="grid sm:grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl shimmer-skeleton"
                />
              ))}
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-full h-16 rounded-xl shimmer-skeleton" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
