// src/pages/Profile.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
    setIsChangingPassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-2xl overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-8 pb-8">
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-800 absolute -top-12"
            />
            <div className="pt-16">
              <h1 className="text-2xl font-bold text-white">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-gray-400">{formData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.email}</p>
                )}
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Password Change */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isChangingPassword ? 'Cancel' : 'Change'}
            </button>
          </div>

          {isChangingPassword ? (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
            </form>
          ) : (
            <p className="text-gray-400">
              Click 'Change' to update your password.
            </p>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Danger Zone</h2>
          <div className="space-y-4">
            <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg px-4 py-2 hover:bg-red-500/20 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;