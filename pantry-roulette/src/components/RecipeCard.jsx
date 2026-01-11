import { useState } from 'react';
import { INGREDIENT_SWAPS } from '../data/recipes';

export default function RecipeCard({ recipe }) {
  const [activeSwaps, setActiveSwaps] = useState({});

  const toggleSwap = (ingredient) => {
    setActiveSwaps(prev => ({
      ...prev,
      [ingredient]: !prev[ingredient]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{recipe.name}</h2>
        <div className="flex gap-3 flex-wrap">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ⏱️ {recipe.activeTime} min active time
          </span>
          {recipe.onePot && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🍳 One-Pot
            </span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">📝 Ingredients</h3>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => {
            const hasSwaps = INGREDIENT_SWAPS[ingredient];
            const showSwaps = activeSwaps[ingredient];

            return (
              <div key={index} className="border-b border-gray-200 pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{ingredient}</span>
                  {hasSwaps && (
                    <button
                      onClick={() => toggleSwap(ingredient)}
                      className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition font-medium"
                    >
                      {showSwaps ? 'Hide Swaps' : '🔄 Swap'}
                    </button>
                  )}
                </div>
                {showSwaps && hasSwaps && (
                  <div className="mt-2 pl-4 border-l-2 border-amber-300">
                    <p className="text-xs text-gray-500 mb-1">Try instead:</p>
                    <div className="flex flex-wrap gap-2">
                      {INGREDIENT_SWAPS[ingredient].map((swap, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200"
                        >
                          {swap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">👨‍🍳 Instructions</h3>
        <ol className="space-y-2">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex">
              <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
