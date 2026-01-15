import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, RotateCcw, Sparkles } from 'lucide-react';
import IngredientPicker from './components/IngredientPicker';
import MagicRoulette from './components/MagicRoulette';
import RecipeCard from './components/RecipeCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getRandomRecipe } from './utils/recipeApi';
import { triggerConfetti } from './utils/confetti';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        await new Promise(resolve => setTimeout(resolve, 2000 - elapsedTime));
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChefHat size={48} className="text-purple-400" />
          </motion.div>
          <h1 className="text-5xl sm:text-6xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Pantry Roulette
            </span>
          </h1>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Sparkles size={48} className="text-pink-400" />
          </motion.div>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Your lazy chef butler. Select ingredients, spin the wheel, and let AI find the perfect recipe for you.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          No more decision fatigue. We do the research, you do the eating. 🎰
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Ingredient Picker */}
        {!currentRecipe && (
          <IngredientPicker
            selectedIngredients={selectedIngredients}
            onIngredientsChange={setSelectedIngredients}
          />
        )}

        {/* Magic Roulette Button */}
        {!currentRecipe && (
          <MagicRoulette
            onSpin={handleSpin}
            isLoading={isLoading}
            disabled={selectedIngredients.length === 0}
            selectedCount={selectedIngredients.length}
          />
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        <AnimatePresence>
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="glass-card p-8 text-center border-red-500/30">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
                <p className="text-gray-400 mb-6">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="glass-button px-6 py-3 text-white font-medium"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe Card */}
        <AnimatePresence mode="wait">
          {currentRecipe && !isLoading && (
            <>
              <RecipeCard recipe={currentRecipe} />

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSpin}
                  className="flex-1 glass-button py-4 px-6 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  Spin Again with Same Ingredients
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 backdrop-blur-md bg-purple-600/30 border border-purple-400/50 hover:bg-purple-600/40 py-4 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ChefHat size={20} />
                  Start Over with New Ingredients
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16 pb-8"
      >
        <p className="text-gray-500 text-sm">
          Recipes powered by{' '}
          <a
            href="https://www.edamam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors underline"
          >
            Edamam API
          </a>
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Built for the lazy chef in all of us 🧑‍🍳
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
