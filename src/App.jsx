import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';
import IngredientPicker from './components/IngredientPicker';
import MagicRoulette from './components/MagicRoulette';
import AITip from './components/AITip';
import RecipeCard from './components/RecipeCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getRandomRecipe } from './utils/recipeApi';
import { triggerConfetti } from './utils/confetti';

const lazyTips = [
  'Use frozen veggies to save 10 minutes of prep time tonight.',
  'Pre-shredded cheese saves time (we won\'t tell).',
  'Garlic powder > Fresh garlic when you\'re lazy.',
  'Sheet pan meals = less dishes to wash.',
  'Instant rice cooks in 90 seconds in the microwave.',
];

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTip] = useState(lazyTips[Math.floor(Math.random() * lazyTips.length)]);

  const handleSpin = async () => {
    if (selectedIngredients.length === 0) return;

    setIsLoading(true);
    setError(null);
    setCurrentRecipe(null);

    try {
      // Simulate AI research delay for premium feel (minimum 2 seconds)
      const startTime = Date.now();

      const recipe = await getRandomRecipe(selectedIngredients);

      // Ensure minimum loading time for better UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsedTime));
      }

      setCurrentRecipe(recipe);

      // Trigger confetti celebration
      setTimeout(() => {
        triggerConfetti();
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentRecipe(null);
    setError(null);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-mesh overflow-x-hidden pb-24 text-white font-display selection:bg-primary/30">
      {/* Main Content */}
      {!currentRecipe ? (
        <>
          {/* Ingredient Picker */}
          <IngredientPicker
            selectedIngredients={selectedIngredients}
            onIngredientsChange={setSelectedIngredients}
          />

          {/* Magic Roulette Button */}
          {!isLoading && (
            <MagicRoulette
              onSpin={handleSpin}
              isLoading={isLoading}
              disabled={selectedIngredients.length === 0}
              selectedCount={selectedIngredients.length}
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <LoadingSkeleton />
            </div>
          )}

          {/* AI Tip */}
          {!isLoading && <AITip tip={currentTip} />}
        </>
      ) : (
        <>
          {/* Recipe Result */}
          <AnimatePresence mode="wait">
            {currentRecipe && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 px-6 py-4"
              >
                <RecipeCard recipe={currentRecipe} />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSpin}
                    className="flex-1 glass py-4 px-6 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                  >
                    <span className="material-symbols-outlined">refresh</span>
                    Spin Again
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="flex-1 bg-primary py-4 px-6 rounded-2xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    <span className="material-symbols-outlined">cooking</span>
                    New Search
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Error State */}
      <AnimatePresence>
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="px-6 py-4"
          >
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
              <p className="text-white/60 mb-6">{error}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="bg-primary px-6 py-3 rounded-xl text-white font-medium"
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default App;
