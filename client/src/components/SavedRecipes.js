import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SavedRecipes = ({ user }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) return;
      try {
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'recipes'));
        const recipes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSavedRecipes(recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };
    fetchSavedRecipes();
  }, [user]);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div>
      <h2 className="mb-4">Saved Recipes</h2>
      {savedRecipes.length > 0 ? (
        <div className="row">
          {savedRecipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card h-100">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    Saved on: {new Date(recipe.savedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No recipes saved yet. Save some from the search page!</p>
      )}
    </div>
  );
};

export default SavedRecipes;
