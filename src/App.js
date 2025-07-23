import React, { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import SignUpScreen from './pages/SignUp/SignUpScreen';
import IdentificationScreen from './pages/SignUp/IdentificationScreen';
import ProfileSignupScreen from './pages/SignUp/CompleteProfileScreen';
import SignupScreenConf from './pages/SignUp/SignUpConfScreen';
import LoginScreen from './pages/LogIn/LogInScreen';
import PasswordRecoveryScreen from './pages/LogIn/PasswordRecoveryScreen';
import PasswordRecoveryConfirmation from './pages/LogIn/PasswordRecoveryConfirmation';

import Explore from './pages/Explore/Explore';
import Restauration from './pages/Explore/Restauration';

import Profile from './pages/Profile/Profile';
import Favorites from './pages/Favorite/Favorite';

import Navbar from './components/shared/Navbar';

import WelcomeScreen from './pages/WelcomeScreen';
import HomeIntermédiaire from './pages/Intermédiaire/Acceuil';

import Inbox from './pages/Inbox/Inbox';
import NotificationCenter from './pages/Inbox/NotificationCenter';
import ChatPage from './pages/Inbox/chatPage';

import DateSelectionScreens from './pages/UserSearch/Date';
import GuestsSelectionScreen from './pages/UserSearch/Invités';

import ExploreLayout from './pages/Layout/Layout';

function App() {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    role: '',
    fullName: '',
  });

  return (
    <>
      <Routes>
        {/* Explore layout */}
        <Route path="/" element={<ExploreLayout />}>
          <Route index element={<Explore />} />
          <Route path="restauration" element={<Restauration />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/signup-confirmation" element={<SignupScreenConf />} />
        <Route path="/identification" element={<IdentificationScreen />} />
        <Route
          path="/complete-profile"
          element={<ProfileSignupScreen signupData={signupData} setSignupData={setSignupData} />}
        />
        <Route path="/password-recovery" element={<PasswordRecoveryScreen />} />
        <Route path="/password-recovery-confirmation" element={<PasswordRecoveryConfirmation />} />

        {/* User sections */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/welcomescreen" element={<WelcomeScreen />} />
        <Route path="/partner-welcome" element={<HomeIntermédiaire />} />

        {/* Messages */}
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/notifications" element={<NotificationCenter />} />
        <Route path="/chat/:sender" element={<ChatPage />} />

        {/* Modals */}
        <Route path="/search-date" element={<DateSelectionScreensWrapper />} />
        <Route path="/search-guests" element={<GuestsSelectionScreenWrapper />} />
      </Routes>

      {/* Mobile navbar - Hidden on chat pages */}
      <ConditionalNavbar />
    </>
  );
}

// Component to conditionally show navbar
function ConditionalNavbar() {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat/');
  
  if (isChatPage) {
    return null;
  }
  
  return (
    <div className="block md:hidden">
      <Navbar />
    </div>
  );
}

// Wrapper for date selection
function DateSelectionScreensWrapper() {
  const navigate = useNavigate();
  const selectedDestination = "Paris";

  const handleBack = () => navigate(-1);

  return (
    <DateSelectionScreens
      selectedDestination={selectedDestination}
      onBack={handleBack}
    />
  );
}

// Wrapper for guest selection
function GuestsSelectionScreenWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  const handleBack = () => navigate(-1);

  const handleSearch = (guestData) => {
    console.log('Final search data:', { ...state, guests: guestData });
  };

  return (
    <GuestsSelectionScreen
      onBack={handleBack}
      onSearch={handleSearch}
    />
  );
}

export default App;