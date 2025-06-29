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
      // navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-6 py-10"
    >

            
            {/* Header */}
            <div className="w-full mb-4">
              <button
                onClick={() => navigate(-1)}
                className="text-2xl hover:opacity-70 absolute top-10 left-6"
              >
                ✕
              </button>
              <h1 className="text-3xl font-bold text-black text-center">
                Log In
              </h1>
            </div>

             {/* ✅ Full width step bar */}
            <div className="h-1 w-full bg-green-800 relative">
              <div className="absolute top-0 left-0 h-1 bg-green-800" />
            </div>

            {/* Welcome Text */}
            <h2 className="text-4xl font-bold text-green-800 text-center mt-8 mb-10">
              Welcome back !
            </h2>

            {/* Inputs - styled like SignUpScreen */}
            <div className="w-full max-w-md space-y-4 border border-gray-300 rounded-xl p-4">
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
              <div className="mb-6 text-red-500 text-sm flex items-center">
                <span className="mr-2">✗</span>
                <span>{error}</span>
              </div>
            )}

            {/* Forgot Password Button */}
            <div className="w-full flex justify-center mt-4">
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
              className="mt-6 bg-green-800 hover:bg-green-700 text-white text-lg font-semibold rounded-full py-3 px-8 w-full max-w-xs transition"
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <p className="text-sm text-gray-600 mt-8 text-center md:text-left">
              No account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-green-700 underline hover:text-green-800"
              >
                Sign up here
              </button>
            </p>
          </div>

  );
}
