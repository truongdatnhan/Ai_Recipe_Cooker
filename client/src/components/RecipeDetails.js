import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = ({ user }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}/information`);
        
        console.log(response.data); // Log the full response to inspect the data
        
        // If the instructions are nested in the response, adjust accordingly
        if (response.data.instructions) {
          setRecipe(response.data);
        } else {
          setRecipe({
            ...response.data,
            instructions: 'No instructions available.',
          });
        }
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
        setRecipe({
          instructions: 'Failed to load instructions.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="container mt-4">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid mb-3" />
      <h5>Summary:</h5>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary || 'No summary available.' }} />
      <h5 className="mt-4">Instructions:</h5>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available.' }} />
    </div>
  );
};

export default RecipeDetails;
