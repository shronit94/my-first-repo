import { useState } from 'react';
import PantryPicker from './components/PantryPicker';
import LazyFilters from './components/LazyFilters';
import RecipeCard from './components/RecipeCard';
import { RECIPES } from './data/recipes';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filters, setFilters] = useState({
    quickOnly: false,
    onePotOnly: false
  });
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [noRecipeFound, setNoRecipeFound] = useState(false);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const generateRecipe = () => {
    // Filter recipes based on selected criteria
    let eligibleRecipes = RECIPES.filter(recipe => {
      // Check if recipe uses at least one selected ingredient
      const usesSelectedIngredients = selectedIngredients.length === 0 ||
        recipe.ingredients.some(ing => selectedIngredients.includes(ing));

      // Check if recipe meets time filter
      const meetsTimeFilter = !filters.quickOnly || recipe.activeTime <= 15;

      // Check if recipe meets one-pot filter
      const meetsOnePotFilter = !filters.onePotOnly || recipe.onePot;

      return usesSelectedIngredients && meetsTimeFilter && meetsOnePotFilter;
    });

    // If we have selected ingredients, prioritize recipes that use more of them
    if (selectedIngredients.length > 0) {
      eligibleRecipes = eligibleRecipes.sort((a, b) => {
        const aMatches = a.ingredients.filter(ing => selectedIngredients.includes(ing)).length;
        const bMatches = b.ingredients.filter(ing => selectedIngredients.includes(ing)).length;
        return bMatches - aMatches;
      });
    }

    if (eligibleRecipes.length === 0) {
      setNoRecipeFound(true);
      setCurrentRecipe(null);
      setTimeout(() => setNoRecipeFound(false), 3000);
      return;
    }

    // Pick a random recipe from eligible ones (with bias toward recipes with more matching ingredients)
    const randomIndex = Math.floor(Math.random() * Math.min(eligibleRecipes.length, 5));
    setCurrentRecipe(eligibleRecipes[randomIndex]);
    setNoRecipeFound(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-gray-800 mb-3 drop-shadow-md">
            🎲 Pantry Roulette
          </h1>
          <p className="text-gray-700 text-lg">
            Easy meals for lazy home cooks
          </p>
        </div>

        {/* Pantry Picker */}
        <PantryPicker
          selectedIngredients={selectedIngredients}
          onToggleIngredient={toggleIngredient}
        />

        {/* Lazy Filters */}
        <LazyFilters
          filters={filters}
          onToggleFilter={toggleFilter}
        />

        {/* Generate Button */}
        <div className="text-center mb-8">
          <button
            onClick={generateRecipe}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-2xl font-bold py-6 px-12 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 hover:shadow-2xl"
          >
            🍴 Too Hungry to Think
          </button>
          <p className="text-gray-600 text-sm mt-3">
            Generate a random, easy recipe instantly!
          </p>
        </div>

        {/* No Recipe Found Message */}
        {noRecipeFound && (
          <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-6 mb-8 text-center animate-fade-in">
            <p className="text-red-700 font-semibold text-lg">
              😕 No recipes found matching your filters!
            </p>
            <p className="text-red-600 text-sm mt-2">
              Try adjusting your filters or selecting different ingredients.
            </p>
          </div>
        )}

        {/* Recipe Display */}
        {currentRecipe && <RecipeCard recipe={currentRecipe} />}

        {/* Empty State */}
        {!currentRecipe && !noRecipeFound && (
          <div className="bg-white bg-opacity-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              👆 Hit the button to get a random recipe!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
