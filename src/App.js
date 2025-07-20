import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { useState } from 'react';


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
          {/* Existing routes */}
          <Route path="/" element={<ExploreLayout />}>
            <Route index element={<Explore />} />
            <Route path="restauration" element={<Restauration />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/password-recovery" element={<PasswordRecoveryScreen />} />
          <Route path="/password-recovery-confirmation" element={<PasswordRecoveryConfirmation />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/signup-confirmation" element={<SignupScreenConf />} />
          <Route path="/identification" element={<IdentificationScreen />} />
          <Route path="/complete-profile" element={<ProfileSignupScreen signupData={signupData} setSignupData={setSignupData} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search-date" element={<DateSelectionScreensWrapper />} />
          <Route path="/search-guests" element={<GuestsSelectionScreenWrapper />} />
          <Route path="/welcomescreen" element={<WelcomeScreen />} />
          <Route path="/partner-welcome" element={<HomeIntermédiaire />} />
        </Routes>

        {/* ✅ Always render Navbar, but only show on mobile */}
        <div className="block md:hidden">
          <Navbar />
        </div>
      </>
    
  );
}


// Explore affiché en fond avec modal devant
function ModalLayout({ children }) {
  return (
    <div className="relative">
      <div className="opacity-30 pointer-events-none">
        <ExploreLayout/>
      </div>
      {children}
    </div>
  );
}

// Wrapper pour l'écran de sélection de date
function DateSelectionScreensWrapper() {
  const navigate = useNavigate();
  const selectedDestination = "Paris"; // à remplacer par une vraie valeur

  const handleBack = () => navigate(-1);

  return (
    <DateSelectionScreens
      selectedDestination={selectedDestination}
      onBack={handleBack}
    />
  );
}

// Wrapper pour l'écran d'invités
function GuestsSelectionScreenWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  const handleBack = () => navigate(-1);

  const handleSearch = (guestData) => {
    console.log('Final search data:', { ...state, guests: guestData });
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



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PropertyCreationProvider } from "./context/PropertyCreationContext";


// import SignUpScreen from './pages/SignUp/SignUpScreen';
// import IdentificationScreen from './pages/SignUp/IdentificationScreen';
// import ProfileSignupScreen from './pages/SignUp/CompleteProfileScreen';
// import SignupScreenConf from './pages/SignUp/SignUpConfScreen';
// import LoginScreen from './pages/LogIn/LogInScreen';
// import PasswordRecoveryScreen from './pages/LogIn/PasswordRecoveryScreen';
// import PasswordRecoveryConfirmation from './pages/LogIn/PasswordRecoveryConfirmation';
// import Explore from './pages/Explore/Explore';
// import AddProperty from './pages/propertyOwner/addProperty';
// import PropertyTypeStep from './pages/propertyOwner/PropertyTypeStep';
// import PropertyInfoStep from './pages/propertyOwner/PropertyInfoStep';
// import PropertyEquipmentsStep from './pages/propertyOwner/PropertyEquipmentsStep';
// import PropertyPhotosStep from './pages/propertyOwner/PropertyPhotosStep';
// import PropertyTitleStep from './pages/propertyOwner/PropertyTitleStep'; 
// import PropertyDescriptionStep from './pages/propertyOwner/PropertyDescriptionStep';
// import PropertyPriceStep from './pages/propertyOwner/PropertyPriceStep';
// import PropertyDocumentsStep from './pages/propertyOwner/PropertyDocumentsStep'; 



// function App() {
//   return (
    
//       <PropertyCreationProvider>
//         <Routes>
//           {/* General routes */}
//           {/* <Route path="/" element={<WelcomeScreen />} />
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="/signup" element={<SignUpScreen />} />
//           <Route path="/signup-confirmation" element={<SignupScreenConf />} />
//           <Route path="/identification" element={<IdentificationScreen />} />
//           <Route path="/complete-profile" element={<ProfileSignupScreen />} />
//           <Route path="/password-recovery" element={<PasswordRecoveryScreen />} />
//           <Route path="/password-recovery-confirmation" element={<PasswordRecoveryConfirmation />} />
//           <Route path="/explore" element={<Explore />} /> */}

//           {/* Property owner routes */}
//           <Route path="/" element={<AddProperty />} />
//           <Route path="/property-type" element={<PropertyTypeStep />} />
//           <Route path="/property-info" element={<PropertyInfoStep />} />
//           <Route path="/property-equipments" element={<PropertyEquipmentsStep />} />
//           <Route path="/property-photos" element={<PropertyPhotosStep />} />
//           <Route path="/property-title" element={<PropertyTitleStep />} />
//           <Route path="/property-description" element={<PropertyDescriptionStep />} />
//           <Route path="/property-price" element={<PropertyPriceStep />} />
//           <Route path="/property-documents" element={<PropertyDocumentsStep />} />
          
//           {/* Add other sections here as needed */}
//         </Routes>
//       </PropertyCreationProvider>
    
//   );
// }

// export default App;