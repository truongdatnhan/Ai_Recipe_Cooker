import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import SavedRecipes from './components/SavedRecipes';
import MealPlan from './components/MealPlan';
import RecipeDetails from './components/RecipeDetails';
import Footer from './components/Footer';

// Component to clear recipes on Home load
const ClearOnHomeLoad = ({ setRecipes }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setRecipes([]);
    }
  }, [location, setRecipes]);

  return null;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Recipe Finder</Link>
            {user && (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Search</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/saved-recipes">Saved Recipes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/meal-plan">Meal Plan</Link>
                  </li>
                </ul>
                <span className="navbar-text me-3">
                  {user.displayName || 'User'}
                </span>
                <button onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            <ClearOnHomeLoad setRecipes={setRecipes} />
            <Routes>
              <Route path="/" element={<Home user={user} recipes={recipes} setRecipes={setRecipes} />} />
              <Route path="/saved-recipes" element={<SavedRecipes user={user} />} />
              <Route path="/meal-plan" element={<MealPlan user={user} />} />
              <Route path="/recipe/:id" element={<RecipeDetails user={user} />} />
            </Routes>
          </>
        )}
      </div>

      <Footer />
    </Router>
  );
};

export default App;
