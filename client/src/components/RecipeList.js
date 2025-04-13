import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

const RecipeList = ({ recipes, user }) => {
  const [substitutes, setSubstitutes] = useState({});
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [day, setDay] = useState('');
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [instructions, setInstructions] = useState('');

  const saveRecipe = async (recipe) => {
    if (!user) {
      alert('Please log in to save recipes!');
      return;
    }
    try {
      await setDoc(doc(db, 'users', user.uid, 'recipes', recipe.id.toString()), {
        title: recipe.title,
        image: recipe.image,
        id: recipe.id,
        savedAt: new Date().toISOString()
      });
      alert('Recipe saved!');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const fetchSubstitutes = async (recipeId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes/${recipeId}/substitutes`);
      const subs = response.data.status === 'success' ? response.data.substitutes : [];
      setSubstitutes((prev) => ({ ...prev, [recipeId]: subs }));
    } catch (error) {
      console.error('Error fetching substitutes:', error);
      setSubstitutes((prev) => ({ ...prev, [recipeId]: ['No substitutes available'] }));
    }
  };

  const fetchInstructions = async (recipe) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes/${recipe.id}/information`);
      const instructionText = response.data.instructions || 'No instructions available.';
      setInstructions(instructionText);
      setSelectedRecipe(recipe);
      setShowInstructionModal(true);
    } catch (error) {
      console.error('Error fetching instructions:', error);
      setInstructions('Failed to load instructions.');
      setShowInstructionModal(true);
    }
  };

  const addToMealPlan = async () => {
    if (!user || !day || !selectedRecipe) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'mealPlan', `${selectedRecipe.id}-${day}`), {
        title: selectedRecipe.title,
        day,
        id: selectedRecipe.id
      });
      setShowMealModal(false);
      setDay('');
      alert('Added to meal plan!');
    } catch (error) {
      console.error('Error adding to meal plan:', error);
    }
  };

  return (
    <div>
      <h3 className="mb-3">Recipes</h3>
      <div className="row">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div
                className="card h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => fetchInstructions(recipe)}
              >
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <button
                    className="btn btn-success me-2"
                    onClick={(e) => { e.stopPropagation(); saveRecipe(recipe); }}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-info me-2"
                    onClick={(e) => { e.stopPropagation(); fetchSubstitutes(recipe.id); }}
                  >
                    Substitutes
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecipe(recipe);
                      setShowMealModal(true);
                    }}
                  >
                    Add to Meal Plan
                  </button>
                  {substitutes[recipe.id] && (
                    <ul className="list-group mt-2">
                      {substitutes[recipe.id].map((sub, idx) => (
                        <li className="list-group-item" key={idx}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No recipes found yet. Try searching!</p>
        )}
      </div>

      {/* Meal Plan Modal */}
      <div
        className={`modal fade ${showMealModal ? 'show d-block' : ''}`}
        style={{ backgroundColor: showMealModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add to Meal Plan</h5>
              <button className="btn-close" onClick={() => setShowMealModal(false)}></button>
            </div>
            <div className="modal-body">
              <select
                className="form-select"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowMealModal(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={addToMealPlan}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction Modal */}
      <div
        className={`modal fade ${showInstructionModal ? 'show d-block' : ''}`}
        style={{ backgroundColor: showInstructionModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedRecipe?.title || 'Recipe Instructions'}</h5>
              <button className="btn-close" onClick={() => setShowInstructionModal(false)}></button>
            </div>
            <div className="modal-body">
              <div dangerouslySetInnerHTML={{ __html: instructions }} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowInstructionModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;