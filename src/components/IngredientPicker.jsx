import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMON_INGREDIENTS = [
  { name: 'Onion', icon: 'energy_savings_leaf' },
  { name: 'Pasta', icon: 'restaurant' },
  { name: 'Tomato', icon: 'nutrition' },
  { name: 'Garlic', icon: 'skillet' },
  { name: 'Eggs', icon: 'egg' },
  { name: 'Chicken', icon: 'inventory' },
  { name: 'Potatoes', icon: 'cookie' },
  { name: 'Rice', icon: 'rice_bowl' },
  { name: 'Cheese', icon: 'lunch_dining' },
  { name: 'Broccoli', icon: 'psychiatry' },
  { name: 'Carrots', icon: 'nutrition' },
  { name: 'Beef', icon: 'kebab_dining' },
  { name: 'Mushrooms', icon: 'nature' },
  { name: 'Spinach', icon: 'eco' },
  { name: 'Bell Peppers', icon: 'genetics' },
  { name: 'Milk', icon: 'emoji_food_beverage' },
  { name: 'Butter', icon: 'bakery_dining' },
  { name: 'Bread', icon: 'bakery_dining' },
];

const IngredientPicker = ({ selectedIngredients, onIngredientsChange }) => {
  const [customIngredient, setCustomIngredient] = useState('');
  const [showPhotoWarning, setShowPhotoWarning] = useState(false);

  const toggleIngredient = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      onIngredientsChange(selectedIngredients.filter((i) => i !== ingredientName));
    } else {
      onIngredientsChange([...selectedIngredients, ingredientName]);
    }
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      onIngredientsChange([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCustomIngredient();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if dropped items contain files/images
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setShowPhotoWarning(true);
      setTimeout(() => setShowPhotoWarning(false), 3000);
    }
  };

  const handlePaste = (e) => {
    // Check if clipboard contains image data
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          setShowPhotoWarning(true);
          setTimeout(() => setShowPhotoWarning(false), 3000);
          return;
        }
      }
    }
  };

  return (
    <div className="px-6">
      {/* Headline */}
      <div className="pt-8 pb-4">
        <h1 className="text-white tracking-tight text-4xl font-extrabold leading-[1.1] max-w-[280px]">
          Ready for a <span className="text-primary">Taste?</span>
        </h1>
        <p className="text-white/60 text-sm font-normal leading-relaxed pt-3 max-w-[260px]">
          Select your ingredients and let our AI handle the culinary heavy lifting.
        </p>
      </div>

      {/* Search Input */}
      <div className="py-2">
        <div
          className="glass rounded-2xl flex items-center px-4 h-14 w-full group focus-within:border-primary/50 transition-all"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="material-symbols-outlined text-white/40 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/30 text-base font-medium px-3 outline-none"
            placeholder="Add custom ingredients..."
          />
          <span className="material-symbols-outlined text-white/40">mic</span>
        </div>

        {/* Photo Warning Message */}
        <AnimatePresence>
          {showPhotoWarning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 glass rounded-xl p-3 flex items-center gap-2 border border-amber-500/30"
            >
              <span className="material-symbols-outlined text-amber-400 text-xl">info</span>
              <p className="text-sm text-white/80">
                Photo upload isn't supported yet. Please type ingredient names instead.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chips Section */}
      <div className="py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
            Quick Select
          </h3>
          <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
            {selectedIngredients.length} Selected
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {COMMON_INGREDIENTS.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.name);
            return (
              <motion.button
                key={ingredient.name}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleIngredient(ingredient.name)}
                className={`
                  flex h-10 items-center justify-center gap-x-2 rounded-xl px-4 transition-all
                  ${
                    isSelected
                      ? 'bg-primary shadow-lg shadow-primary/20'
                      : 'glass hover:bg-white/5'
                  }
                `}
              >
                <span
                  className={`material-symbols-outlined !text-[18px] ${
                    isSelected ? 'text-white' : 'text-white/60'
                  }`}
                >
                  {ingredient.icon}
                </span>
                <p
                  className={`text-sm font-medium ${
                    isSelected ? 'text-white font-bold' : 'text-white/80'
                  }`}
                >
                  {ingredient.name}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IngredientPicker;
