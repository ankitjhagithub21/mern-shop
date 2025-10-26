import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <img
          src="./logo.png"
          alt="Logo"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-6xl font-bold text-neutral mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-500">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-neutral">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;