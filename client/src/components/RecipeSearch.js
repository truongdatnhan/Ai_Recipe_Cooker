import React, { useState } from 'react';
import axios from 'axios';

const RecipeSearch = ({ setRecipes }) => {
  const [ingredients, setIngredients] = useState('');
  const [diet, setDiet] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/recipes/search', {
        params: { ingredients, diet }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Search error:', error.message);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h2 className="card-title">Find Recipes</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., chicken, rice)"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <select
        className="form-select"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
      >
        <option value="">All Diets</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="keto">Keto</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="low-carb">Low-Carb</option>
      </select>
    </div>
  );
};

export default RecipeSearch;