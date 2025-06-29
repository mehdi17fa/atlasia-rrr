import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate

export default function SignUpScreen() {
  const navigate = useNavigate(); // ✅ initialize
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
      navigate('/signup-confirmation'); // ✅ navigate to confirmation screen
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-6 py-10">
      {/* Header */}
      <div className="w-full mb-4">
        <button onClick={() => navigate(-1)} className="text-2xl hover:opacity-70 absolute top-10 left-6">
          ✕
        </button>
        <h1 className="text-3xl font-bold text-black text-center">Sign up</h1>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-300 mb-8 relative">
        <div className="absolute top-0 left-0 h-1 w-1/6 bg-green-800" />
      </div>

      <h2 className="text-4xl font-bold text-green-900 text-center mb-10">Welcome</h2>

      {/* Input Fields */}
      <div className="w-full max-w-md space-y-4 border border-gray-300 rounded-xl p-4">
        <input
          type="email"
          placeholder="Email"
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
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full pb-1 text-gray-700 h-12 text-lg focus:outline-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-600 text-sm mt-4 max-w-md w-full">
          ✗ {error}
          {error.includes('already registered') && (
            <div className="text-xs text-green-800 mt-1">
              Try <span className="underline cursor-pointer">logging in</span> instead.
            </div>
          )}
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleVerify}
        className="mt-6 bg-green-800 hover:bg-green-700 text-white text-lg font-semibold rounded-full py-3 px-8 w-full max-w-xs transition"
      >
        Continue
      </button>
    </div>
  );
}
