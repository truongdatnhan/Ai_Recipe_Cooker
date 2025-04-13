import React from 'react';
import { Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import RecipeList from './RecipeList';

const Home = ({ user, recipes, setRecipes }) => {
  const featuredRecipes = [
    {
      id: 716429,
      title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
      image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
      description: 'A quick and delicious meal perfect for any night.',
    },
    {
      id: 715538,
      title: 'Bruschetta Style Pork & Pasta',
      image: 'https://spoonacular.com/recipeImages/715538-556x370.jpg',
      description: 'Savor the Italian flavors with this simple dish.',
    },
    {
      id: 716627,
      title: 'Easy Homemade Rice and Beans',
      image: 'https://spoonacular.com/recipeImages/716627-556x370.jpg',
      description: 'Tasty, satisfying, and made with love!',
    },
    {
      id: 641803,
      title: 'Easy Vegetarian Pasta',
      image: 'https://spoonacular.com/recipeImages/641803-556x370.jpg',
      description: 'Wholesome, quick, and full of flavor.',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-center bg-light p-5 rounded-3 mb-5 shadow-sm">
        <h1 className="display-4 fw-bold text-dark">Welcome, {user.displayName || 'Chef'}!</h1>
        <p className="lead text-muted">Find amazing recipes using what you already have in your kitchen.</p>
        <hr className="my-4" />
        <p>Start by searching for an ingredient below!</p>
      </div>

      {/* Search & Recipe Results */}
      <div className="mb-5">
        <RecipeSearch setRecipes={setRecipes} />
        <RecipeList recipes={recipes} user={user} />
      </div>

      {/* Featured Recipes Section */}
      <section className="featured-recipes mb-5 shadow rounded-3 bg-light p-5">
        <h2 className="text-center text-dark mb-4">🌟 Featured Recipes</h2>
        <div className="row">
          {featuredRecipes.map((recipe) => (
            <div className="col-md-6 col-lg-3 mb-4" key={recipe.id}>
              <div className="card h-100 shadow-sm border-0">
                <img src={recipe.image} className="card-img-top rounded-top" alt={recipe.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{recipe.title}</h5>
                  <p className="card-text text-muted small">{recipe.description}</p>
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-outline-primary mt-auto">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="cta-section text-center bg-light text-danger p-5 rounded-3 shadow">
        <h4 className="mb-3">
          <i className="bi bi-heart-fill text-danger me-2"></i>
          Don’t forget to save your favorite meals!
        </h4>
        <p className="mb-0 text-secondary">Keep track of the recipes you love by adding them to your collection.</p>
        <Link to="/saved-recipes" className="btn btn-secondary mt-3">
          View Saved Recipes
        </Link>
      </div>
    </div>
  );
};

export default Home;
