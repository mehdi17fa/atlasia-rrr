import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function IdentificationScreen() {
  const navigate = useNavigate();

  const handleProfileSelect = (profileType) => {
    navigate(`/complete-profile?type=${profileType}`);
  };

  return (
    <div className="flex-1 bg-white px-6 mt-8 min-h-screen overflow-auto">
      {/* Header */}
      <div className="w-full mb-4">
        <button onClick={() => navigate(-1)} className="text-2xl hover:opacity-70 absolute top-10 left-6">
          ✕
        </button>
        <h1 className="text-3xl font-bold text-black text-center mb-8">Sign up</h1>
      </div>


      {/* Step Line */}
      <div className="h-0.5 w-full bg-gray-300 relative mb-6 sm:mb-8">
        <div className="absolute left-0 top-0 h-0.5 w-2/3 bg-[#005D20]" />
      </div>

      {/* Title & Subtitle */}
      <div className="flex flex-col items-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center">Identification</h2>
        <p className="text-[#005D20] mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl lg:text-2xl font-bold text-center px-4">
          Please select your profile type:
        </p>
      </div>

      {/* Profile Options */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mt-8 sm:mt-16 lg:mt-20 pb-8">
        {/* Tourist Button */}
        <button
          onClick={() => handleProfileSelect('tourist')}
          className="border-2 border-[#005D20] rounded-lg py-4 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-10 
                     w-full max-w-xs sm:w-32 sm:max-w-none lg:w-40 xl:w-44
                     h-32 sm:h-36 lg:h-40 xl:h-44
                     flex flex-col items-center justify-center 
                     hover:bg-[#005D20] hover:text-white transition-colors group
                     focus:outline-none focus:ring-2 focus:ring-[#005D20] focus:ring-opacity-50"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#005D20] group-hover:text-white mb-2 sm:mb-3" 
               fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
          </svg>
          <span className="text-[#005D20] text-base sm:text-lg lg:text-xl font-semibold group-hover:text-white text-center">
            Touriste
          </span>
        </button>

        {/* Owner Button */}
        <button
          onClick={() => handleProfileSelect('owner')}
          className="border-2 border-[#005D20] rounded-lg py-4 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-10 
                     w-full max-w-xs sm:w-32 sm:max-w-none lg:w-40 xl:w-44
                     h-32 sm:h-36 lg:h-40 xl:h-44
                     flex flex-col items-center justify-center 
                     hover:bg-[#005D20] hover:text-white transition-colors group
                     focus:outline-none focus:ring-2 focus:ring-[#005D20] focus:ring-opacity-50"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#005D20] group-hover:text-white mb-2 sm:mb-3" 
               fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.4l6 6V18h-3v-4H9v4H6v-6.6l6-6z"/>
          </svg>
          <span className="text-[#005D20] text-base sm:text-lg lg:text-xl font-semibold group-hover:text-white text-center">
            Propriétaire
          </span>
        </button>

        {/* Partner Button */}
        <button
          onClick={() => handleProfileSelect('partner')}
          className="border-2 border-[#005D20] rounded-lg py-4 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-10 
                     w-full max-w-xs sm:w-32 sm:max-w-none lg:w-40 xl:w-44
                     h-32 sm:h-36 lg:h-40 xl:h-44
                     flex flex-col items-center justify-center 
                     hover:bg-[#005D20] hover:text-white transition-colors group
                     focus:outline-none focus:ring-2 focus:ring-[#005D20] focus:ring-opacity-50"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#005D20] group-hover:text-white mb-2 sm:mb-3" 
               fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.5 12c0-.28-.05-.54-.12-.79l2.08-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C12.25 2.25 11.95 2 11.64 2h-4c-.31 0-.61.25-.69.63L6.57 5.28c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.08 1.63C2.05 11.46 2 11.72 2 12s.05.54.12.79l-2.08 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98L6.95 21.37c.08.38.38.63.69.63h4c.31 0 .61-.25.69-.63l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.08-1.63c.07-.25.12-.51.12-.79zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
            <path d="M19.5 18c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
          </svg>
          <span className="text-[#005D20] text-base sm:text-lg lg:text-xl font-semibold group-hover:text-white text-center">
            Partenaire
          </span>
        </button>
      </div>
    </div>
  );
}