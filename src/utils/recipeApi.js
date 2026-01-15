// Edamam Recipe Search API Configuration
// Get your free API keys at: https://developer.edamam.com/edamam-recipe-api

const API_BASE_URL = 'https://api.edamam.com/api/recipes/v2';

// These are demo credentials - users should replace with their own
// Sign up at https://developer.edamam.com/edamam-recipe-api
const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID || 'demo_app_id';
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY || 'demo_app_key';

/**
 * Search for recipes based on ingredients
 * @param {string[]} ingredients - Array of ingredient names
 * @param {number} count - Number of recipes to return (default: 5)
 * @returns {Promise<Array>} - Array of recipe objects
 */
export const searchRecipes = async (ingredients, count = 5) => {
  try {
    // Join ingredients with spaces for the query
    const query = ingredients.join(' ');

    // Build the API URL with parameters
    const url = new URL(API_BASE_URL);
    url.searchParams.append('type', 'public');
    url.searchParams.append('q', query);
    url.searchParams.append('app_id', APP_ID);
    url.searchParams.append('app_key', APP_KEY);
    url.searchParams.append('to', count);
    url.searchParams.append('random', 'true'); // Add some randomness for roulette feel

    console.log('Fetching recipes for:', query);

    const response = await fetch(url);

    if (!response.ok) {
      // If using demo credentials, provide helpful error message
      if (APP_ID === 'demo_app_id' || APP_KEY === 'demo_app_key') {
        throw new Error(
          'Please set up your Edamam API credentials. Get free keys at https://developer.edamam.com/'
        );
      }
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Transform the API response to our format
    const recipes = data.hits?.map((hit) => ({
      label: hit.recipe.label,
      image: hit.recipe.image,
      source: hit.recipe.source,
      url: hit.recipe.url,
      yield: hit.recipe.yield,
      ingredients: hit.recipe.ingredients,
      calories: Math.round(hit.recipe.calories),
      totalTime: hit.recipe.totalTime,
      cuisineType: hit.recipe.cuisineType,
      mealType: hit.recipe.mealType,
      dishType: hit.recipe.dishType,
    })) || [];

    if (recipes.length === 0) {
      throw new Error('No recipes found for these ingredients. Try different combinations!');
    }

    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Get a random recipe from the search results
 * @param {string[]} ingredients - Array of ingredient names
 * @returns {Promise<Object>} - A single recipe object
 */
export const getRandomRecipe = async (ingredients) => {
  const recipes = await searchRecipes(ingredients, 10); // Fetch more to pick from
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
};
