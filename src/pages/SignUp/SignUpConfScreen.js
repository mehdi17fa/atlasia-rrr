import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupScreenConf() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleVerify = () => {
    const inputCode = code.join('');
    if (inputCode === '123456') {
      setError(false);
      navigate('/identification');  // Navigate on success
    } else {
      setError(true);
    }
  };
  const handleSendAgain = () => {
    setTimer(15);
    setIsTimerActive(true);
    setError(false);
    // Here you would typically make an API call to resend the code
  };

  const handleChange = (text, index) => {
    const updated = [...code];
    updated[index] = text.slice(-1); // single char
    setCode(updated);
    
    // Auto-focus next input
    if (text && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex-1 bg-white px-6 mt-8 min-h-screen overflow-auto">
      {/* Header */}
      <div className="w-full mb-4">
        <button onClick={() => navigate(-1)} className="text-2xl hover:opacity-70 absolute top-10 left-6">
          ✕
        </button>
        <h1 className="text-3xl font-bold text-black text-center">Sign up</h1>
      </div>


      {/* Step Line */}
      <div className="h-0.5 w-full bg-gray-300 relative mb-6">
        <div className="absolute left-0 top-0 h-0.5 w-2/6 bg-[#005D20]" />
      </div>

      {/* Title */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 hover:opacity-70 transition-opacity"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-center text-2xl font-bold mb-2">Enter the 6 digits</h2>
      </div>

      {/* Code Input */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-[#005D20] rounded text-center text-lg text-black focus:outline-none focus:border-[#007D30] transition-colors"
          />
        ))}
      </div>


      {/* Message */}
      <p className="text-center text-xl text-gray-700 mb-1 mt-12">
        A code was sent to your email address.<br />
        Please enter it below to verify your account.
      </p>

      {/* Timer Message */}
      {isTimerActive && (
        <p className="text-center text-blue-600 text-sm mt-4">
          You can request a new code in {timer} seconds
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 text-sm mb-2">
         Incorrect code. Please try again
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={handleVerify} 
          className="bg-[#005D20] w-80 py-4 px-8 rounded-full hover:bg-[#007D30] transition-colors"
        >
          <span className="text-white font-bold text-lg">Verify</span>
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button 
          onClick={handleSendAgain}
          disabled={isTimerActive}
          className={`w-80 py-4 rounded-full mt-2 transition-colors ${
            isTimerActive 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          <span className="text-white text-center font-bold text-lg">
            {isTimerActive ? `Send again (${timer}s)` : 'Send again'}
          </span>
        </button>
      </div>
    </div>
  );
}