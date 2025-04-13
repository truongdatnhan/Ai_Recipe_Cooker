import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';

const MealPlan = ({ user }) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (!user) return;
      try {
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'mealPlan'));
        const plan = querySnapshot.docs.map((doc) => doc.data());
        setMealPlan(plan);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };
    fetchMealPlan();
  }, [user]);

  const fetchRecipeDetails = async (recipeId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes/${recipeId}/information`);
      console.log(response.data); // Log the full response for inspection

      if (response.data.instructions) {
        setRecipeDetails(response.data);
      } else {
        setRecipeDetails({
          ...response.data,
          instructions: 'No instructions available.',
        });
      }
    } catch (error) {
      console.error('Failed to fetch recipe details:', error);
      setRecipeDetails({ instructions: 'Failed to load instructions.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading recipe details...</p>;

  return (
    <div>
      <h2 className="mb-4">Your Meal Plan</h2>
      {mealPlan.length > 0 ? (
        <div className="row">
          {mealPlan.map((item) => (
            <div className="col-md-4 mb-4" key={`${item.id}-${item.day}`} onClick={() => fetchRecipeDetails(item.id)}>
              <div className="card">
                {/* Render the image of the meal plan */}
                {item.image && <img src={item.image} alt={item.title} className="card-img-top" />}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Day: {item.day}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No meals planned yet. Add some from the search page!</p>
      )}

      {recipeDetails && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{recipeDetails.title}</h5>
                <button className="btn-close" onClick={() => setRecipeDetails(null)}></button>
              </div>
              <div className="modal-body">
                <img src={recipeDetails.image} alt={recipeDetails.title} className="img-fluid mb-3" />
                <h5>Summary:</h5>
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary || 'No summary available.' }} />
                <h5 className="mt-4">Instructions:</h5>
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions || 'No instructions available.' }} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setRecipeDetails(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
