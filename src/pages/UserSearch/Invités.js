import React, { useState } from 'react';

const GuestsSelectionScreen = ({ onBack, onSearch }) => {
  const [guestCount, setGuestCount] = useState(2);
  const [children, setChildren] = useState(false);
  const [pets, setPets] = useState(false);

  const increment = () => setGuestCount(count => Math.min(count + 1, 20));
  const decrement = () => setGuestCount(count => Math.max(count - 1, 1));

  const handleSubmit = () => {
    onSearch({ guestCount, children, pets });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-md h-full overflow-auto shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button
            onClick={onBack}
            className="mr-4"
            aria-label="Retour"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex ml-8 space-x-14">
            <span className="text-gray-400">Destination</span>
            <span className="text-gray-400">Date</span>
            <span className="text-green-600 font-medium border-b-2 border-green-600 pb-2">Invités</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-8 pb-6 flex flex-col flex-grow overflow-auto">
          {/* Title */}
          <div className="flex flex-col items-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-700 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 11a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="text-lg font-medium">Combien êtes-vous ?</h2>
          </div>

          {/* Guest counter */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <button
              onClick={decrement}
              className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold"
              aria-label="Réduire le nombre d'invités"
            >
              −
            </button>
            <span className="text-2xl font-semibold">{guestCount}</span>
            <button
              onClick={increment}
              className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold"
              aria-label="Augmenter le nombre d'invités"
            >
              +
            </button>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col space-y-4 mb-10 px-8 text-gray-700 text-sm">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={children}
                onChange={() => setChildren(!children)}
                className="form-checkbox h-5 w-5 text-green-700"
              />
              <span>Enfants</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={pets}
                onChange={() => setPets(!pets)}
                className="form-checkbox h-5 w-5 text-green-700"
              />
              <span>Animaux Domestique</span>
            </label>
          </div>

          {/* Search button */}
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white rounded-full py-3 text-center font-medium text-lg shadow-md hover:bg-green-800 transition"
          >
            Chercher
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestsSelectionScreen;
