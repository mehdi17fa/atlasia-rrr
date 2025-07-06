import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);

  const handleVerify = () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
    } else if (!validateEmail(email)) {
      setError('Email must be in the format: example@gmail.com');
    } else if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include letters and numbers.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (email.toLowerCase() === 'test@email.com') {
      setError('This email address is already registered.');
    } else {
      setError('');
      navigate('/signup-confirmation');
    }
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <>
      {/* Dark overlay background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose} />
      
      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col items-center justify-start px-6 py-8">
            
            {/* Header */}
            <div className="w-full mb-4 relative">
              <button
                onClick={handleClose}
                className="text-2xl hover:opacity-70 absolute -top-2 -right-2 text-gray-600"
              >
                ✕
              </button>
              <h1 className="text-2xl font-bold text-black text-center">
                Sign up
              </h1>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-green-800 relative mb-6">
              <div className="absolute top-0 left-0 h-1 bg-green-800" />
            </div>

            {/* Welcome Text */}
            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
              Welcome
            </h2>

            {/* Input Fields */}
            <div className="w-full space-y-4 border border-gray-300 rounded-xl p-4 mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-200 pb-2 text-gray-700 h-12 text-lg focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-200 pb-2 text-gray-700 h-12 text-lg focus:outline-none"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pb-1 text-gray-700 h-12 text-lg focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-500 text-sm flex items-center">
                <span className="mr-2">✗</span>
                <span>{error}</span>
                {error.includes('already registered') && (
                  <button
                    onClick={() => navigate('/login')}
                    className="ml-2 text-green-700 underline hover:text-green-800"
                  >
                    Try logging in instead.
                  </button>
                )}
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleVerify}
              className="bg-green-800 hover:bg-green-700 text-white text-lg font-semibold rounded-full py-3 px-8 w-full transition mb-6"
            >
              Continue
            </button>

            {/* Login Link */}
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-700 underline hover:text-green-800"
              >
                Log in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}