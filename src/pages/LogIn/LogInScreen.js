import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const handleLogin = () => {
    if (!email || !password) {
      setError('All fields are required.');
    } else if (!validateEmail(email)) {
      setError('Email must be in format: example@gmail.com');
    } else {
      setError('');
      console.log('Login success with:', { email, password });
      navigate('/'); // Navigate back to explore page after successful login
    }
  };

  const handleClose = () => {
    navigate('/'); // Go back to previous page
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
                Log In
              </h1>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-green-800 relative mb-6">
              <div className="absolute top-0 left-0 h-1 bg-green-800" />
            </div>

            {/* Welcome Text */}
            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
              Welcome back!
            </h2>

            {/* Inputs */}
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
                className="w-full pb-1 text-gray-700 h-12 text-lg focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-500 text-sm flex items-center">
                <span className="mr-2">✗</span>
                <span>{error}</span>
              </div>
            )}

            {/* Forgot Password Button */}
            <div className="w-full flex justify-center mb-6">
              <button
                onClick={() => navigate('/password-recovery')}
                className="text-sm text-green-700 hover:text-green-800 transition"
              >
                Forgot password? →
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="bg-green-800 hover:bg-green-700 text-white text-lg font-semibold rounded-full py-3 px-8 w-full transition mb-6"
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <p className="text-sm text-gray-600 text-center">
              No account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-green-700 underline hover:text-green-800"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}