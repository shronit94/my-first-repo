import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const COMMON_INGREDIENTS = [
  'Rice', 'Chicken', 'Beef', 'Pork', 'Eggs', 'Pasta',
  'Potatoes', 'Broccoli', 'Carrots', 'Tomatoes', 'Onions',
  'Garlic', 'Cheese', 'Milk', 'Butter', 'Bread',
  'Beans', 'Fish', 'Shrimp', 'Mushrooms', 'Spinach',
  'Bell Peppers', 'Zucchini', 'Corn', 'Tofu', 'Noodles'
];

const IngredientPicker = ({ selectedIngredients, onIngredientsChange }) => {
  const [customIngredient, setCustomIngredient] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      onIngredientsChange(selectedIngredients.filter(i => i !== ingredient));
    } else {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      onIngredientsChange([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient('');
      setShowCustomInput(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCustomIngredient();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What's in your pantry?
            </h2>
            <p className="text-gray-400 mt-2">
              Select your ingredients or add custom ones. The more, the merrier!
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white">
              {selectedIngredients.length}
            </div>
            <div className="text-sm text-gray-400">selected</div>
          </div>
        </div>

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 pb-6 border-b border-white/10"
          >
            <h3 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wide">
              Your Selection
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <motion.div
                  key={ingredient}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="group relative"
                >
                  <div className="ingredient-chip ingredient-chip-selected flex items-center gap-2 pr-2">
                    <span className="max-w-[200px] truncate">{ingredient}</span>
                    <button
                      onClick={() => toggleIngredient(ingredient)}
                      className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Common Ingredients */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Common Staples
          </h3>
          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {COMMON_INGREDIENTS.map((ingredient) => (
              <motion.button
                key={ingredient}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleIngredient(ingredient)}
                className={`ingredient-chip ${
                  selectedIngredients.includes(ingredient) ? 'ingredient-chip-selected' : ''
                }`}
              >
                {ingredient}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Ingredient Input */}
        <div>
          {!showCustomInput ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCustomInput(true)}
              className="glass-button px-6 py-3 flex items-center gap-2 text-white font-medium"
            >
              <Plus size={20} />
              Add Custom Ingredient
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={customIngredient}
                onChange={(e) => setCustomIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Kimchi, Miso Paste, Sriracha..."
                className="flex-1 px-4 py-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addCustomIngredient}
                className="glass-button px-6 py-3 text-white font-medium"
              >
                Add
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomIngredient('');
                }}
                className="glass-button px-4 py-3 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default IngredientPicker;
