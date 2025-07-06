import React, { useState } from 'react';
import { ReactComponent as MyIllustration } from '../../assets/icons/map_pin.svg';


const DestinationSearchScreens = ({ onBack, onDestinationSelected }) => {
  const [currentScreen, setCurrentScreen] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');

  const destinations = [
    { id: 1, name: 'Ifrane, Downtown', type: 'city' },
    { id: 2, name: 'Ifrane, Zéphire', type: 'area' },
    { id: 3, name: 'Ifrane, Farah Inn', type: 'hotel' },
    { id: 4, name: 'Ifrane', type: 'city' }
  ];

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentScreen(value.trim() ? 'results' : 'search');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-md h-full overflow-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button className="mr-4" onClick={onBack}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex ml-8 space-x-14">
            <span className="text-green-800 font-medium border-b-2 border-green-800 pb-2">Destination</span>
            <span className="text-gray-400">Date</span>
            <span className="text-gray-400">Invités</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher votre destination"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>

        {/* Content: Results or Illustration */}
        {currentScreen === 'search' ? (
          <div className="flex-1 flex items-center justify-center py-8">
            <MyIllustration className="w-32 h-32 text-green-600" />
        </div>

        ) : (
          <div className="px-4 pb-8">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="flex items-center py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSearchQuery(destination.name);
                  onDestinationSelected(destination.name);
                }}
              >
                <div className="mr-4">
                  <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-800">{destination.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationSearchScreens;
