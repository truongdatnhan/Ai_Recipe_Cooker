const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
  const { ingredients, diet } = req.query;
  console.log('Search request:', { ingredients, diet });
  if (!ingredients) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }
  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}${diet ? `&diet=${diet}` : ''}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes', details: error.message });
  }
});

router.get('/:id/substitutes', async (req, res) => {
  const { id } = req.params;
  console.log('Fetching substitutes for recipe ID:', id);
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/ingredientSubstitutes?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching substitutes:', error.message);
    res.status(500).json({ error: 'Failed to fetch substitutes', details: error.message });
  }
});

router.get('/:id/information', async (req, res) => {
  const { id } = req.params;
  console.log('Fetching instructions for recipe ID:', id);
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching instructions:', error.message);
    res.status(500).json({ error: 'Failed to fetch instructions', details: error.message });
  }
});

module.exports = router;