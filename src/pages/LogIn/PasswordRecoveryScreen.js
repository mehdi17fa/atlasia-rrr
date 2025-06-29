import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PasswordRecoveryScreen() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendEmail = () => {
    console.log('Send email to:', email);
    // Simulate sending email and navigate to confirmation screen
    navigate('/password-recovery-confirmation');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-6 py-10">
      
      {/* Header */}
      <div className="w-full mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl hover:opacity-70 absolute top-10 left-6"
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold text-black text-center">
          Password Recovery
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-300 mb-8 relative">
        <div className="absolute top-0 left-0 h-1 w-2/3 bg-green-800" />
      </div>

      <h2 className="text-2xl font-semibold text-green-900 text-center mb-10">
        Reset your password
      </h2>

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto px-4 space-y-6">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Enter your Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 h-12 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Send Email Button */}
        <button
          onClick={handleSendEmail}
          className="bg-green-800 hover:bg-green-700 text-white text-lg font-semibold rounded-full py-3 px-8 w-full transition"
        >
          Send Email
        </button>

        {/* Back to Login */}
        <p className="text-sm text-gray-600 text-center">
          Remembered your password?{' '}
          <button
            onClick={handleBackToLogin}
            className="text-green-700 underline hover:text-green-800"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}
