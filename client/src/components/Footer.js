import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer bg-light text-center text-muted mt-5 py-3 border-top">
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <p className="mb-2 mb-md-0">© 2025 Recipe Finder. All rights reserved.</p>
      <div>
        <Link to="/" className="text-muted me-3 text-decoration-none">Home</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
