import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import logo from './logo.png'; 

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}>
      <div className="card p-5 shadow-lg text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="mb-4">
          <img src={logo} alt="App Logo" style={{ width: '80px', borderRadius: '50%' }} />
        </div>
        <h2 className="mb-3">Welcome to Recipe Finder!</h2>
        <p className="text-muted mb-4">
          Easily find and save delicious recipes using your available ingredients.
        </p>
        <button className="btn btn-outline-primary w-100" onClick={handleLogin}>
          <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" className="me-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
