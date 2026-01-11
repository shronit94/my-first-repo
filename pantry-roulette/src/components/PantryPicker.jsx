import { useState } from 'react';
import { COMMON_INGREDIENTS } from '../data/recipes';

export default function PantryPicker({ selectedIngredients, onToggleIngredient }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          🥘 What's in Your Pantry?
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium transition"
        >
          {isExpanded ? 'Show Less' : 'Show All'}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Selected: <span className="font-semibold">{selectedIngredients.length}</span> ingredients
        </p>
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ${!isExpanded && 'max-h-48 overflow-hidden'}`}>
        {COMMON_INGREDIENTS.map((ingredient) => {
          const isSelected = selectedIngredients.includes(ingredient);
          return (
            <button
              key={ingredient}
              onClick={() => onToggleIngredient(ingredient)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105
                ${isSelected
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                }
              `}
            >
              {ingredient}
            </button>
          );
        })}
      </div>

      {!isExpanded && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            ▼ Show more ingredients
          </button>
        </div>
      )}
    </div>
  );
}
