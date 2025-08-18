import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultAvatar from '../assets/default-pp.png';

const ProfileSignupScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    code: '+212',
    flag: '🇲🇦',
    name: 'Morocco',
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [profileType, setProfileType] = useState('');
  const [gender, setGender] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Get profile type from URL (or localStorage fallback)
  useEffect(() => {
    const typeFromURL = new URLSearchParams(window.location.search).get("type");
    const normalizedType = typeFromURL?.toLowerCase() || localStorage.getItem("profileType")?.toLowerCase();
    setProfileType(normalizedType || '');
    if (typeFromURL) localStorage.setItem("profileType", typeFromURL);
  }, []);

  const countries = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setProfileImage(file); // store file for FormData
  };

  const handleAddPhoto = () => fileInputRef.current?.click();

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handlePhoneNumberChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(onlyNums);
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    if (!/\d/.test(value)) setFullName(value);
  };

  const isFormValid = fullName.trim() !== '' && phoneNumber.length === 10 && gender;

  const handleFinish = async () => {
    if (!isFormValid) return;

    try {
      const formData = new FormData();
      formData.append('email', localStorage.getItem('signupEmail')); // send email to backend
      formData.append('fullName', fullName);
      formData.append('phone', selectedCountry.code + phoneNumber);
      formData.append('country', selectedCountry.name);
      formData.append('gender', gender);
      formData.append('profileType', profileType); // optional
      if (profileImage) formData.append('profilePic', profileImage);

      const response = await axios.post(
        'http://localhost:4000/api/auth/complete-profile', // correct backend route
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('Profile response:', response.data);

      // Navigate based on role
      if (profileType === "owner") navigate("/owner-welcome");
      else if (profileType === "partner") navigate("/partner-welcome");
      else navigate('/');
    } catch (error) {
      console.error('Error uploading profile:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to complete profile. Please try again.');
    }
  };

  return (
    <div className="flex-1 bg-white px-6 mt-8 min-h-screen overflow-auto">
      {/* Header */}
      <div className="w-full mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl hover:opacity-70 absolute top-10 left-6"
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold text-black text-center mb-8">Sign up</h1>
      </div>

      {/* Form Container */}
      <div className="md:flex md:justify-center md:items-start">
        <div className="bg-white px-4 py-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-black text-center mb-6">Profile</h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : DefaultAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAddPhoto}
              className="flex items-center px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-full transition-colors"
            >
              <span className="mr-2 text-lg">📷</span>
              Add photo
            </button>
          </div>

          {/* Gender Selection */}
          <div className="mb-6 flex justify-center gap-4">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 py-2 rounded-full border ${
                  gender === g ? 'bg-green-700 text-white' : 'bg-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Country & Phone */}
          <div className="space-y-4 border border-gray-300 rounded-xl p-4">
            <div className="relative">
              <div className="flex bg-gray-50 rounded-lg border items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center px-3 py-3 border-r border-green-200 bg-transparent hover:bg-green-100 transition-colors"
                  >
                    <span className="mr-2">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                    <span className="ml-1 text-gray-500">▼</span>
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                        >
                          <span className="mr-3">{country.flag}</span>
                          <span className="mr-2 font-medium">{country.code}</span>
                          <span className="text-sm text-gray-600">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="flex-1 px-3 py-3 bg-transparent border-none outline-none placeholder-gray-500"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={handleFullNameChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 placeholder-gray-500"
              />
            </div>
          </div>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Finish Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleFinish}
              disabled={!isFormValid}
              className={`text-white text-lg font-semibold rounded-full py-3 px-8 w-full max-w-xs transition ${
                !isFormValid
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              Finish
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {showCountryDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCountryDropdown(false)}
        />
      )}
    </div>
  );
};

export default ProfileSignupScreen;
