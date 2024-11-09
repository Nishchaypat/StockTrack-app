// src/components/Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  
  // List of routes where we don't want to show the navbar
  const noNavbarRoutes = ['/dashboard', '/watchlist', '/profile'];
  
  // Check if current path should have navbar
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1">
        {/* Conditionally render Navbar */}
        {shouldShowNavbar && <Navbar />}

        {/* Page content */}
        <main className={`p-8 ${!shouldShowNavbar ? 'pt-4' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;