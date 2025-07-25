import React, { useState } from "react";
import PropertyCard from "../../components/ListingCard/PropertyCard";
import Calendar from "../../components/shared/Calendar";

const user = {
  firstName: "Mehdi",
  id: 1,
  email: "mehdi@example.com"
};

const properties = [
  {
    id: 1,
    name: "Appartement Zephire",
    description: "Un bel appartement lumineux au centre d'Ifrane, proche de toutes commodités.",
    location: "Ifrane - Downtown",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Villa Makarska",
    description: "Villa spacieuse avec piscine privée et grand jardin.",
    location: "Ifrane - Downtown",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  }
];

export default function MyProperties() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setShowCalendar(true);
  };

  const handleCalendarChange = (dates) => {
    setSelectedDates(dates);
    // You can handle saving here
    console.log("Selected dates for property:", selectedProperty, dates);
  };

  const closeModal = () => {
    setShowCalendar(false);
    setSelectedProperty(null);
    setSelectedDates(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto mt-6 mb-2 px-4">
        <h1 className="text-green-800 text-2xl font-bold text-center mb-2">
          Mes propriétés
        </h1>
        <h2 className="text-xl font-bold text-black mb-4 text-center">
          {user?.firstName ? `Bienvenue ${user.firstName}` : "Mes propriétés"}
        </h2>
        {properties.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">Aucune propriété trouvée.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                name={prop.name}
                description={prop.description}
                location={prop.location}
                image={prop.image}
                onClick={() => handleCardClick(prop)}
              />
            ))}
          </div>
        )}
      </div>
      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 relative w-[350px]">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold" onClick={closeModal}>&times;</button>
            <h3 className="text-lg font-bold mb-2 text-green-900">Disponibilités pour {selectedProperty?.name}</h3>
            <Calendar value={selectedDates} onChange={handleCalendarChange} mode="range" />
            <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition" onClick={closeModal}>Valider</button>
          </div>
        </div>
      )}
    </div>
  );
} 