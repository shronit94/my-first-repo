import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Clock,
  Users,
  ChefHat,
  Lightbulb,
  ArrowRight,
  Info,
} from 'lucide-react';

// Lazy swap suggestions mapping
const LAZY_SWAPS = {
  'heavy cream': { swap: 'greek yogurt', reason: 'Same creaminess, fewer calories' },
  'fresh garlic': { swap: 'garlic powder', reason: 'Save 5 mins of chopping' },
  'fresh herbs': { swap: 'dried herbs', reason: 'No washing or chopping needed' },
  'fresh ginger': { swap: 'ground ginger', reason: 'Skip the peeling and grating' },
  'butter': { swap: 'olive oil spray', reason: 'Less mess, portion control' },
  'breadcrumbs': { swap: 'crushed crackers', reason: 'Use what you have' },
  'wine': { swap: 'chicken/vegetable broth', reason: 'Always in the pantry' },
  'lemon juice': { swap: 'vinegar', reason: 'Similar acidity, longer shelf life' },
  'sour cream': { swap: 'greek yogurt', reason: 'Healthier and equally tangy' },
  'buttermilk': { swap: 'milk + lemon juice', reason: 'Make it in 5 minutes' },
};

const findLazySwap = (ingredient) => {
  const lowerIngredient = ingredient.toLowerCase();
  for (const [key, value] of Object.entries(LAZY_SWAPS)) {
    if (lowerIngredient.includes(key)) {
      return value;
    }
  }
  return null;
};

const RecipeCard = ({ recipe }) => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showTip, setShowTip] = useState(true);

  if (!recipe) return null;

  const lazyTips = [
    "Use pre-chopped frozen veggies to save 10 minutes",
    "Garlic powder > Fresh garlic when you're lazy",
    "Sheet pan meals = less dishes to wash",
    "Instant rice cooks in 90 seconds in the microwave",
    "Pre-shredded cheese saves time (we won't tell)",
  ];

  const randomTip = lazyTips[Math.floor(Math.random() * lazyTips.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="glass-card overflow-hidden">
        {/* Header with Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          {recipe.image && (
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={recipe.image}
              alt={recipe.label}
              className="w-full h-full object-cover"
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Lazy Tip Badge */}
          <AnimatePresence>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="absolute top-4 right-4 max-w-xs"
              >
                <div className="backdrop-blur-xl bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-3 shadow-xl">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-yellow-400 mb-1">
                        AI LAZY TIP
                      </p>
                      <p className="text-sm text-white">{randomTip}</p>
                    </div>
                    <button
                      onClick={() => setShowTip(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recipe Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-2 line-clamp-2"
            >
              {recipe.label}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-sm"
            >
              by {recipe.source}
            </motion.p>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {recipe.yield && (
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <Users size={24} className="mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold text-white">{Math.round(recipe.yield)}</div>
                <div className="text-xs text-gray-400">Servings</div>
              </div>
            )}
            {recipe.totalTime && recipe.totalTime > 0 && (
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <Clock size={24} className="mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold text-white">{recipe.totalTime}</div>
                <div className="text-xs text-gray-400">Minutes</div>
              </div>
            )}
            <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <ChefHat size={24} className="mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">
                {recipe.ingredients?.length || 0}
              </div>
              <div className="text-xs text-gray-400">Ingredients</div>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ChefHat size={20} className="text-purple-400" />
              Ingredients
              <span className="text-sm text-gray-500 font-normal">
                (click for lazy swaps)
              </span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {recipe.ingredients?.slice(0, 12).map((ingredient, index) => {
                const lazySwap = findLazySwap(ingredient.text);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() =>
                        setSelectedIngredient(
                          selectedIngredient === ingredient.text ? null : ingredient.text
                        )
                      }
                      className={`
                        w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                        backdrop-blur-md border
                        ${
                          lazySwap
                            ? 'bg-yellow-500/10 border-yellow-400/30 hover:bg-yellow-500/20 hover:border-yellow-400/50 cursor-pointer'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 cursor-default'
                        }
                        ${selectedIngredient === ingredient.text ? 'ring-2 ring-yellow-400/50' : ''}
                      `}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-white flex-1 leading-relaxed">
                          {ingredient.text}
                        </p>
                        {lazySwap && <Info size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />}
                      </div>

                      {/* Lazy Swap Suggestion */}
                      <AnimatePresence>
                        {selectedIngredient === ingredient.text && lazySwap && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 pt-3 border-t border-yellow-400/30"
                          >
                            <div className="flex items-start gap-2 text-xs">
                              <Lightbulb size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-yellow-400 font-semibold mb-1">
                                  Lazy Swap: {lazySwap.swap}
                                </p>
                                <p className="text-gray-400">{lazySwap.reason}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
            </div>
            {recipe.ingredients?.length > 12 && (
              <p className="text-gray-500 text-sm mt-3 text-center">
                + {recipe.ingredients.length - 12} more ingredients (see full recipe)
              </p>
            )}
          </div>

          {/* View Full Recipe Button */}
          <motion.a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full py-4 rounded-xl backdrop-blur-md bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 hover:border-purple-400 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold">
              <span>View Full Recipe Instructions</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              <ExternalLink size={18} />
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              Opens on {recipe.source}
            </p>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
