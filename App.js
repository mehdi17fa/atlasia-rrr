import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import WelcomeScreen from './pages/WelcomeScreen';
import SignUpScreen from './pages/SignUp/SignUpScreen';
import IdentificationScreen from './pages/SignUp/IdentificationScreen';
import ProfileSignupScreen from './pages/SignUp/CompleteProfileScreen';
import SignupScreenConf from './pages/SignUp/SignUpConfScreen';
import LoginScreen from './pages/LogIn/LogInScreen';
import PasswordRecoveryScreen from './pages/LogIn/PasswordRecoveryScreen';
import PasswordRecoveryConfirmation from './pages/LogIn/PasswordRecoveryConfirmation';
import Explore from './pages/Explore/Explore';

import DateSelectionScreens from './pages/UserSearch/Date';
import GuestsSelectionScreen from './pages/UserSearch/Invités';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/signup-confirmation" element={<SignupScreenConf />} />
        <Route path="/identification" element={<IdentificationScreen />} />
        <Route path="/complete-profile" element={<ProfileSignupScreen />} />
        <Route path="/password-recovery" element={<PasswordRecoveryScreen />} />
        <Route path="/password-recovery-confirmation" element={<PasswordRecoveryConfirmation />} />
        <Route path="/explore" element={<Explore />} />

        {/* New routes */}
        <Route path="/search-date" element={<DateSelectionScreensWrapper />} />
        <Route path="/search-guests" element={<GuestsSelectionScreenWrapper />} />
      </Routes>
    
  );
}

// Wrapper for DateSelectionScreens to handle navigation and props
function DateSelectionScreensWrapper() {
  const navigate = useNavigate();

  // You might get selectedDestination from previous step or URL, here hardcoded for example
  const selectedDestination = "Paris";

  const handleBack = () => {
    navigate(-1); // Or navigate to previous page explicitly if needed
  };

  return (
    <DateSelectionScreens
      selectedDestination={selectedDestination}
      onBack={handleBack}
    />
  );
}

// Wrapper for GuestsSelectionScreen to get state passed via navigate and handle back & search
function GuestsSelectionScreenWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  // state contains { selectedDestination, dateSelection } from previous screen

  const handleBack = () => {
    navigate(-1); // Go back to DateSelectionScreens
  };

  const handleSearch = (guestData) => {
    // Here you get guestCount, children, pets from GuestsSelectionScreen
    // Combine with previously selectedDestination and dateSelection if needed
    console.log('Final search data:', {
      ...state,
      guests: guestData,
    });
    // For example: navigate to a results page or display a message
    // navigate('/search-results', { state: { ... } });
  };

  return (
    <GuestsSelectionScreen
      onBack={handleBack}
      onSearch={handleSearch}
    />
  );
}

export default App;
