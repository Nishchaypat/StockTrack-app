// frontend/src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    console.log('Form data being sent:', formData); // Debug log
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/auth/register',
        data: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      console.log('Response from backend:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Add animation keyframes
  const pulseKeyframes = `
    @keyframes pulse {
      0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
      50% { opacity: 0.3; transform: translateY(-10px) rotate(-15deg); }
      100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
    }
  `;

  return (
    <>
      <style>{pulseKeyframes}</style>
      <Navbar />
      
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
              />
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="relative max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <i className="fas fa-chart-line text-green-500 text-4xl"></i>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-500 hover:text-green-400">
                Sign in
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                  ${loading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} 
                  transition-colors duration-200 ease-in-out`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;