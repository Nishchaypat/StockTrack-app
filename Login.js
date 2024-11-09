// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';  // Import the axios instance
import Navbar from '../components/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await api.post('http://localhost:5000/login', formData);
            if (response.data.user_id) {
                localStorage.setItem('user_id', response.data.user_id);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
      <>
        {/* Add Navbar */}
        <Navbar />

        {/* Login Page Content */}
        <div className="relative min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-green-500"
                  style={{
                    left: `${i * 25}%`,
                    top: `${50 + Math.sin(i) * 20}%`,
                    width: '25%',
                    transform: 'rotate(-15deg)',
                    animation: `pulse 3s infinite ${i * 0.5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <div className="relative max-w-md w-full space-y-8">
            {/* Logo and Title */}
            <div className="text-center">
              <div className="flex items-center justify-center">
                <i className="fas fa-chart-line text-green-500 text-4xl"></i>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-500 hover:text-green-400">Sign up</Link>
              </p>
            </div>

            {/* Form */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                {/* Display error message */}
                {error && (
                  <div className="text-red-500 text-sm">
                    <p>{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-offset-green focus:ring-offset-green ring-offset-green transition-colors duration-[300ms]"
                >
                  {loading ? 'Logging in...' : 'Sign in'}
                </button>
              </form>
            </div>
          </div>

          {/* CSS for animations */}
          <style jsx>{`
            @keyframes pulse {
              0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
              50% { opacity: 0.3; transform: translateY(-10px) rotate(-15deg); }
              100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
            }
          `}</style>
        </div>
      </>
    );
  };

export default Login;
