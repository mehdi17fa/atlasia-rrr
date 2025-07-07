import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PropertyCreationProvider } from "./context/PropertyCreationContext";

import WelcomeScreen from './pages/WelcomeScreen';
import SignUpScreen from './pages/SignUp/SignUpScreen';
import IdentificationScreen from './pages/SignUp/IdentificationScreen';
import ProfileSignupScreen from './pages/SignUp/CompleteProfileScreen';
import SignupScreenConf from './pages/SignUp/SignUpConfScreen';
import LoginScreen from './pages/LogIn/LogInScreen';
import PasswordRecoveryScreen from './pages/LogIn/PasswordRecoveryScreen';
import PasswordRecoveryConfirmation from './pages/LogIn/PasswordRecoveryConfirmation';
import Explore from './pages/Explore/Explore';
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

function AppRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    // const profileType = localStorage.getItem("profileType");
    // if (profileType === "owner") {
    //   navigate("/owner-welcome"); // Adjust path as needed
    // }
    // 
  }, [navigate]);

  return null;
}

function App() {
  return (
    
      <PropertyCreationProvider>
        <Routes>
          {/* General routes */}
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/signup-confirmation" element={<SignupScreenConf />} />
          <Route path="/identification" element={<IdentificationScreen />} />
          <Route path="/complete-profile" element={<ProfileSignupScreen />} />
          <Route path="/password-recovery" element={<PasswordRecoveryScreen />} />
          <Route path="/password-recovery-confirmation" element={<PasswordRecoveryConfirmation />} />
          <Route path="/explore" element={<Explore />} />

          {/* Property owner routes */}
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
      </PropertyCreationProvider>
    
  );
}

export default App;
