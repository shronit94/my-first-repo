// Common ingredients available in the pantry picker
export const COMMON_INGREDIENTS = [
  'Eggs', 'Pasta', 'Rice', 'Chicken', 'Ground Beef', 'Tomatoes',
  'Onions', 'Garlic', 'Cheese', 'Milk', 'Butter', 'Bread',
  'Potatoes', 'Bell Peppers', 'Carrots', 'Beans', 'Lentils',
  'Soy Sauce', 'Olive Oil', 'Salt', 'Pepper', 'Cream', 'Flour',
  'Mushrooms', 'Spinach', 'Broccoli', 'Ginger', 'Chili Flakes'
];

// Ingredient swap suggestions
export const INGREDIENT_SWAPS = {
  'Cream': ['Milk + Butter', 'Greek Yogurt', 'Coconut Milk'],
  'Butter': ['Olive Oil', 'Coconut Oil', 'Margarine'],
  'Milk': ['Almond Milk', 'Oat Milk', 'Water + Butter'],
  'Chicken': ['Tofu', 'Chickpeas', 'Turkey'],
  'Ground Beef': ['Ground Turkey', 'Lentils', 'Mushrooms'],
  'Pasta': ['Rice', 'Zucchini Noodles', 'Rice Noodles'],
  'Rice': ['Quinoa', 'Couscous', 'Cauliflower Rice'],
  'Cheese': ['Nutritional Yeast', 'Cashew Cream', 'Vegan Cheese'],
  'Soy Sauce': ['Tamari', 'Coconut Aminos', 'Worcestershire Sauce'],
  'Tomatoes': ['Tomato Paste + Water', 'Red Bell Peppers', 'Canned Tomatoes'],
  'Garlic': ['Garlic Powder', 'Shallots', 'Onion Powder'],
  'Onions': ['Shallots', 'Leeks', 'Garlic'],
  'Eggs': ['Flax Eggs', 'Banana', 'Applesauce'],
  'Bread': ['Tortillas', 'Rice Cakes', 'Crackers'],
  'Olive Oil': ['Butter', 'Avocado Oil', 'Vegetable Oil'],
  'Flour': ['Almond Flour', 'Coconut Flour', 'Cornstarch'],
  'Bell Peppers': ['Carrots', 'Zucchini', 'Tomatoes'],
  'Mushrooms': ['Zucchini', 'Eggplant', 'Tofu'],
  'Spinach': ['Kale', 'Swiss Chard', 'Arugula'],
  'Broccoli': ['Cauliflower', 'Green Beans', 'Asparagus'],
  'Ginger': ['Ginger Powder', 'Turmeric', 'Galangal'],
  'Potatoes': ['Sweet Potatoes', 'Cauliflower', 'Turnips'],
  'Beans': ['Lentils', 'Chickpeas', 'Tofu'],
  'Lentils': ['Beans', 'Split Peas', 'Chickpeas']
};

// Recipe database
export const RECIPES = [
  {
    id: 1,
    name: '🍳 Quick Scrambled Eggs',
    ingredients: ['Eggs', 'Butter', 'Salt', 'Pepper'],
    instructions: [
      'Beat eggs in a bowl with salt and pepper',
      'Melt butter in a pan over medium heat',
      'Pour eggs and stir gently until just set',
      'Serve immediately'
    ],
    activeTime: 5, // in minutes
    onePot: true,
    tags: ['breakfast', 'protein', 'quick']
  },
  {
    id: 2,
    name: '🍝 Garlic Butter Pasta',
    ingredients: ['Pasta', 'Garlic', 'Butter', 'Olive Oil', 'Salt', 'Pepper', 'Cheese'],
    instructions: [
      'Cook pasta according to package directions',
      'Sauté minced garlic in butter and olive oil',
      'Toss drained pasta with garlic butter',
      'Top with grated cheese and serve'
    ],
    activeTime: 10,
    onePot: false,
    tags: ['pasta', 'vegetarian', 'comfort']
  },
  {
    id: 3,
    name: '🍚 Easy Fried Rice',
    ingredients: ['Rice', 'Eggs', 'Soy Sauce', 'Garlic', 'Onions', 'Olive Oil'],
    instructions: [
      'Heat oil in a large pan or wok',
      'Scramble eggs and set aside',
      'Sauté garlic and onions until fragrant',
      'Add cooked rice and soy sauce, stir-fry for 5 minutes',
      'Mix in scrambled eggs and serve'
    ],
    activeTime: 12,
    onePot: true,
    tags: ['rice', 'asian', 'leftover-friendly']
  },
  {
    id: 4,
    name: '🍲 One-Pot Tomato Pasta',
    ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Olive Oil', 'Salt', 'Pepper'],
    instructions: [
      'Add pasta, chopped tomatoes, minced garlic, and olive oil to a pot',
      'Cover with water and bring to a boil',
      'Cook until pasta is tender and sauce thickens (about 10 min)',
      'Season with salt and pepper, serve hot'
    ],
    activeTime: 15,
    onePot: true,
    tags: ['pasta', 'vegetarian', 'easy']
  },
  {
    id: 5,
    name: '🥚 Fluffy Omelet',
    ingredients: ['Eggs', 'Cheese', 'Butter', 'Salt', 'Pepper'],
    instructions: [
      'Beat eggs with a splash of water',
      'Melt butter in a non-stick pan',
      'Pour in eggs and cook until edges set',
      'Add cheese, fold in half, and serve'
    ],
    activeTime: 7,
    onePot: true,
    tags: ['breakfast', 'protein', 'quick']
  },
  {
    id: 6,
    name: '🍛 Quick Chicken Stir-Fry',
    ingredients: ['Chicken', 'Bell Peppers', 'Onions', 'Soy Sauce', 'Garlic', 'Ginger', 'Olive Oil'],
    instructions: [
      'Cut chicken into bite-sized pieces',
      'Heat oil in a wok or large pan',
      'Cook chicken until golden, remove and set aside',
      'Stir-fry peppers and onions with garlic and ginger',
      'Return chicken, add soy sauce, toss and serve'
    ],
    activeTime: 15,
    onePot: true,
    tags: ['chicken', 'asian', 'protein']
  },
  {
    id: 7,
    name: '🥔 Cheesy Mashed Potatoes',
    ingredients: ['Potatoes', 'Butter', 'Milk', 'Cheese', 'Salt', 'Pepper'],
    instructions: [
      'Boil peeled and cubed potatoes until tender',
      'Drain and mash with butter and milk',
      'Stir in cheese until melted',
      'Season with salt and pepper'
    ],
    activeTime: 10,
    onePot: false,
    tags: ['comfort', 'vegetarian', 'side']
  },
  {
    id: 8,
    name: '🌯 Bean & Cheese Quesadilla',
    ingredients: ['Bread', 'Beans', 'Cheese', 'Butter'],
    instructions: [
      'Spread beans on one side of bread or tortilla',
      'Top with cheese and another piece of bread',
      'Heat butter in a pan and cook until golden on both sides',
      'Cut and serve'
    ],
    activeTime: 8,
    onePot: true,
    tags: ['vegetarian', 'quick', 'mexican']
  },
  {
    id: 9,
    name: '🍝 Creamy Mushroom Pasta',
    ingredients: ['Pasta', 'Mushrooms', 'Cream', 'Garlic', 'Butter', 'Salt', 'Pepper'],
    instructions: [
      'Cook pasta according to package directions',
      'Sauté sliced mushrooms and garlic in butter',
      'Add cream and simmer until slightly thickened',
      'Toss with drained pasta and serve'
    ],
    activeTime: 15,
    onePot: false,
    tags: ['pasta', 'vegetarian', 'comfort']
  },
  {
    id: 10,
    name: '🥗 Quick Veggie Stir-Fry',
    ingredients: ['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Garlic', 'Ginger', 'Olive Oil'],
    instructions: [
      'Heat oil in a wok over high heat',
      'Add garlic and ginger, stir for 30 seconds',
      'Add all vegetables and stir-fry for 5-7 minutes',
      'Drizzle with soy sauce and serve'
    ],
    activeTime: 10,
    onePot: true,
    tags: ['vegetarian', 'healthy', 'asian']
  },
  {
    id: 11,
    name: '🍚 Lentil Rice Bowl',
    ingredients: ['Rice', 'Lentils', 'Onions', 'Garlic', 'Olive Oil', 'Salt', 'Pepper'],
    instructions: [
      'Cook rice according to package directions',
      'Sauté onions and garlic in olive oil',
      'Add cooked lentils and warm through',
      'Serve lentils over rice, season to taste'
    ],
    activeTime: 12,
    onePot: false,
    tags: ['vegetarian', 'protein', 'healthy']
  },
  {
    id: 12,
    name: '🍳 Veggie Scramble',
    ingredients: ['Eggs', 'Spinach', 'Tomatoes', 'Onions', 'Butter', 'Salt', 'Pepper'],
    instructions: [
      'Sauté chopped onions in butter until soft',
      'Add spinach and tomatoes, cook for 2 minutes',
      'Pour in beaten eggs and scramble until set',
      'Season and serve'
    ],
    activeTime: 8,
    onePot: true,
    tags: ['breakfast', 'vegetarian', 'healthy']
  },
  {
    id: 13,
    name: '🍲 Beef & Rice Skillet',
    ingredients: ['Ground Beef', 'Rice', 'Onions', 'Garlic', 'Tomatoes', 'Salt', 'Pepper'],
    instructions: [
      'Brown ground beef in a large skillet, drain excess fat',
      'Add onions and garlic, cook until softened',
      'Stir in cooked rice and diced tomatoes',
      'Season and heat through, about 5 minutes'
    ],
    activeTime: 15,
    onePot: true,
    tags: ['beef', 'protein', 'comfort']
  },
  {
    id: 14,
    name: '🥖 Cheesy Garlic Bread',
    ingredients: ['Bread', 'Butter', 'Garlic', 'Cheese'],
    instructions: [
      'Mix softened butter with minced garlic',
      'Spread on sliced bread',
      'Top with grated cheese',
      'Bake or toast until golden and melted'
    ],
    activeTime: 10,
    onePot: true,
    tags: ['snack', 'vegetarian', 'comfort']
  },
  {
    id: 15,
    name: '🍜 Simple Noodle Soup',
    ingredients: ['Pasta', 'Garlic', 'Onions', 'Salt', 'Pepper', 'Olive Oil'],
    instructions: [
      'Sauté garlic and onions in olive oil',
      'Add water and bring to a boil',
      'Add pasta and cook until tender',
      'Season with salt and pepper, serve hot'
    ],
    activeTime: 12,
    onePot: true,
    tags: ['soup', 'comfort', 'easy']
  }
];
