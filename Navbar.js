// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm"></div>
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-green-500/20"
              style={{
                left: `${i * 25}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                width: '25%',
                transform: 'rotate(-15deg)',
                animation: `pulse${i} 3s infinite ${i * 0.5}s`
              }}
            />
          ))}
          <style>
            {[...Array(5)].map((_, i) => `
              @keyframes pulse${i} {
                0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
                50% { opacity: 0.3; transform: translateY(-${10 + i * 2}px) rotate(-15deg); }
                100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
              }
            `).join('')}
          </style>
        </div>
      </div>

      {/* Navbar Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-green-500 opacity-20 rounded-lg group-hover:opacity-30 transition-opacity"></div>
                <i className="fas fa-chart-line text-green-500 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              </div>
              <span className="text-white text-xl font-bold">StockTrack</span>
            </Link>

            <div className="hidden md:flex items-center ml-10 space-x-8">
              <Link to="/features" className="text-gray-300 hover:text-green-400 transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-green-400 group-hover:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="bg-gray-700/50 text-gray-200 px-4 py-2 rounded-lg pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-green-500/50 placeholder-gray-400"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-green-400 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-green-400 transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute w-full left-0 top-16 bg-gray-800/95 backdrop-blur-sm ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/features" 
              className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mt-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;