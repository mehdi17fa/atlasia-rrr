import React, { useState } from 'react';
import SearchBar from '../../components/explore/SearchBar';
import ExploreFilter from '../../components/explore/ExplorFilter';
import ListingCardGrid from '../../components/ListingCard/ListingCardGrid';
import MapToggle from '../../components/explore/MapToggle';
import SectionTitle from '../../components/shared/SectionTitle';
import Navbar from '../../components/shared/Navbar';
import DestinationSearchScreens from '../UserSearch/Destination';
import DateSelectionScreens from '../UserSearch/Date';
import GuestsSelectionScreen from '../UserSearch/Invités';

export default function Explore() {
  const [currentStep, setCurrentStep] = useState('explore'); // or 'destination', 'date', 'guests'
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const popularOptions = [
    {
      image: '../../villa1.jpg',
      title: 'Villa Makarska',
      location: 'Ifrane, Farah Inn',
      typelocation: '• City',
      bedrooms: 8,
      guests: 8,
      bathrooms: 4,
      area: 460,
      price: 280,
    },
    {
      image: '../../villa2.jpg',
      title: 'Appartement Zepplin',
      location: 'Ifrane, Zepplin',
      bedrooms: 6,
      guests: 6,
      bathrooms: 3,
      area: 400,
      price: 200,
    },
  ];

  // Navigation handlers
  const handleSearchBarClick = () => setCurrentStep('destination');
  const handleDestinationSelected = (dest) => {
    setSelectedDestination(dest);
    setCurrentStep('date');
  };
  const handleDateSelected = (dateSel) => {
    setSelectedDate(dateSel);
    setCurrentStep('guests');
  };
  const handleGuestsSearch = (guestData) => {
    console.log('Guest data:', guestData);
    setCurrentStep('explore'); // or next step
  };
  const handleBackToExplore = () => setCurrentStep('explore');
  const handleBackToDestination = () => setCurrentStep('destination');
  const handleBackToDate = () => setCurrentStep('date');

  // When any modal is open, dim the background and disable pointer events
  const isModalOpen = currentStep !== 'explore';

  return (
    <div className="relative min-h-screen">
      {/* Explore Page Content */}
      <div
        className={`transition duration-300 ease-in-out ${
          isModalOpen ? 'opacity-30 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        {/* Your entire explore UI here, e.g. */}
        <div className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="text-2xl font-bold text-green-800">Atlasia</div>
          <div className="flex-1 max-w-3xl mx-10">
            <SearchBar onClick={handleSearchBarClick} />
          </div>
          <div className="flex gap-4 text-sm">
            <button className="bg-green-700 text-white px-6 py-2 rounded-full font-medium hover:bg-green-800 transition">
              Log in
            </button>
            <button className="bg-white-700 text-black px-6 py-2 rounded-full font-medium hover:bg-green-600 transition">
              Sign up
            </button>
          </div>
        </div>
        <div className="md:hidden">
          <Navbar title="Découvrir" />
        </div>
        <div className="md:hidden px-4 mt-4">
          <SearchBar onClick={handleSearchBarClick} />
        </div>
        <ExploreFilter />
        <SectionTitle title="Options Populaires:" />
        <ListingCardGrid listings={popularOptions} />
        <SectionTitle title="Logement Downtown:" />
        <ListingCardGrid listings={popularOptions} />
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <MapToggle />
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-20" />
      )}

      {/* Modal Screens */}
      {currentStep === 'destination' && (
        <DestinationSearchScreens
          onBack={handleBackToExplore}
          onDestinationSelected={handleDestinationSelected}
        />
      )}

      {currentStep === 'date' && (
        <DateSelectionScreens
          selectedDestination={selectedDestination}
          onBack={handleBackToDestination}
          onNext={handleDateSelected}
        />
      )}

      {currentStep === 'guests' && (
        <GuestsSelectionScreen
          onBack={handleBackToDate}
          onSearch={handleGuestsSearch}
        />
      )}
    </div>
  );
}