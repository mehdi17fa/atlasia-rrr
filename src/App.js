import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { PropertyCreationProvider } from "./context/PropertyCreationContext";

// Auth & Welcome
import WelcomeScreen from './pages/WelcomeScreen';
import SignUpScreen from './pages/SignUp/SignUpScreen';
import IdentificationScreen from './pages/SignUp/IdentificationScreen';
import ProfileSignupScreen from './pages/SignUp/CompleteProfileScreen';
import SignupScreenConf from './pages/SignUp/SignUpConfScreen';
import LoginScreen from './pages/LogIn/LogInScreen';
import PasswordRecoveryScreen from './pages/LogIn/PasswordRecoveryScreen';
import PasswordRecoveryConfirmation from './pages/LogIn/PasswordRecoveryConfirmation';

// Explore & User
import Explore from './pages/Explore/Explore';
import Restauration from './pages/Explore/Restauration';
import Profile from './pages/Profile/Profile';
import Favorites from './pages/Favorite/Favorite';

// Property Owner
import WelcomeOwner from './pages/propertyOwner/WelcomeOwner';
import AddProperty from './pages/propertyOwner/addProperty';
import PropertyTypeStep from './pages/propertyOwner/PropertyTypeStep';
import PropertyInfoStep from './pages/propertyOwner/PropertyInfoStep';
import PropertyEquipmentsStep from './pages/propertyOwner/PropertyEquipmentsStep';
import PropertyPhotosStep from './pages/propertyOwner/PropertyPhotosStep';
import PropertyTitleStep from './pages/propertyOwner/PropertyTitleStep';
import PropertyDescriptionStep from './pages/propertyOwner/PropertyDescriptionStep';
import PropertyPriceStep from './pages/propertyOwner/PropertyPriceStep';
import PropertyDocumentsStep from './pages/propertyOwner/PropertyDocumentsStep';

// Intermédiaire
import HomeIntermédiaire from './pages/Intermediate/Acceuil';

// Inbox / Chat
import Inbox from './pages/Inbox/Inbox';
import NotificationCenter from './pages/Inbox/NotificationCenter';
import ChatPage from './pages/Inbox/chatPage';

// Modals / Search
import DateSelectionScreens from './pages/UserSearch/Date';
import GuestsSelectionScreen from './pages/UserSearch/Invités';

// Layout & Navbar
import ExploreLayout from './pages/Layout/Layout';
import Navbar from './components/shared/Navbar';

// Redirector logic (if needed)
function AppRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    // const profileType = localStorage.getItem("profileType");
    // if (profileType === "owner") {
    //   navigate("/owner-welcome");
    // }
  }, [navigate]);

  return null;
}

// Date selection wrapper
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

// Guest selection wrapper
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

// Conditional mobile navbar
function ConditionalNavbar() {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat/');

  if (isChatPage) return null;

  return (
    <div className="block md:hidden">
      <Navbar />
    </div>
  );
}

// Main App
function App() {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    role: '',
    fullName: '',
  });

  return (
    <Router>
      <PropertyCreationProvider>
        <Routes>
          {/* Explore layout */}
          <Route path="/" element={<ExploreLayout />}>
            <Route index element={<Explore />} />
            <Route path="restauration" element={<Restauration />} />
          </Route>

          {/* General / Auth */}
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
          <Route path="/welcomescreen" element={<WelcomeScreen />} />

          {/* User sections */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/partner-welcome" element={<HomeIntermédiaire />} />

          {/* Messages */}
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/chat/:sender" element={<ChatPage />} />

          {/* Modals */}
          <Route path="/search-date" element={<DateSelectionScreensWrapper />} />
          <Route path="/search-guests" element={<GuestsSelectionScreenWrapper />} />

          {/* Property owner flow */}
          <Route path="/owner-welcome" element={<WelcomeOwner />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property-type" element={<PropertyTypeStep />} />
          <Route path="/property-info" element={<PropertyInfoStep />} />
          <Route path="/property-equipments" element={<PropertyEquipmentsStep />} />
          <Route path="/property-photos" element={<PropertyPhotosStep />} />
          <Route path="/property-title" element={<PropertyTitleStep />} />
          <Route path="/property-description" element={<PropertyDescriptionStep />} />
          <Route path="/property-price" element={<PropertyPriceStep />} />
          <Route path="/property-documents" element={<PropertyDocumentsStep />} />
        </Routes>

        <AppRedirector />
        <ConditionalNavbar />
      </PropertyCreationProvider>
    </Router>
  );
}

export default App;
