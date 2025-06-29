import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PasswordRecoveryConfirmation() {
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSendAgain = () => {
    if (cooldown > 0) return;

    console.log('Resend password recovery email');
    setCooldown(15); // start 15 second cooldown
  };

  // Countdown effect
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-6 py-10">
      {/* Header */}
      <div className="w-full mb-4">
        <button
          onClick={handleClose}
          className="text-2xl hover:opacity-70 absolute top-10 left-6"
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold text-black text-center">
          Password Recovery
        </h1>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-300 mb-8 relative">
        <div className="absolute top-0 left-0 h-1 w-full bg-green-800" />
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl">📧</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-center text-gray-700 text-lg mb-10">
        An email has been sent to your email address.
      </p>

      {/* Buttons */}
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={handleBackToLogin}
          className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition"
        >
          Back to Log In
        </button>

        <button
          onClick={handleSendAgain}
          disabled={cooldown > 0}
          className={`w-full ${
            cooldown > 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-300 hover:bg-gray-400 text-black'
          } py-3 rounded-full text-lg font-semibold transition`}
        >
          {cooldown > 0 ? `Send again in ${cooldown}s` : 'Send again'}
        </button>
      </div>
    </div>
  );
}
