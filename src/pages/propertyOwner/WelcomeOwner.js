import React from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeOwner({ user, properties = [], topProperties = [] }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full max-w-md mx-auto mt-6 mb-2 px-4">
        <h1 className="text-green-800 text-2xl font-bold text-center mb-2">
          Atlasia
        </h1>
        <h2 className="text-xl font-bold text-black mb-2">
          Bienvenue{" " + (user?.firstName) || ""}:
        </h2>
        <h3 className="text-green-800 text-lg font-bold mb-2">
          Gérer mes propriétés
        </h3>
        <div className="flex gap-2 mb-4 justify-center">
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900"
            onClick={() => navigate("/add-property")}
          >
            Ajouter propriété
          </button>
        </div>
        <h3 className="text-green-800 text-lg font-bold mb-2">
          Gérer mes réservations
        </h3>
        <div className="flex gap-8 border-b mb-4 justify-center">
          <span className="font-semibold text-black border-b-2 border-green-700 pb-1">Réservée</span>
          <span className="font-semibold text-gray-500 pb-1">En Attente</span>
        </div>
        {/* Properties List */}
        <div className="mb-4">
          {properties.map((prop) => (
            <div key={prop.id} className="flex items-center mb-2">
              <img
                src={prop.image}
                alt={prop.name}
                className="w-16 h-16 rounded-lg object-cover mr-3"
              />
              <div>
                <div className="font-semibold">{prop.name}</div>
                <div className="text-gray-500 text-sm">{prop.location}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Top Properties */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-green-800">Top propriétés :</h4>
          <button
            className="text-green-700 flex items-center text-sm"
            onClick={() => navigate("/top-properties")}
          >
            Voir plus <span className="ml-1">→</span>
          </button>
        </div>
        <div>
          {topProperties.map((prop) => (
            <div key={prop.id} className="flex items-center mb-2">
              <img
                src={prop.image}
                alt={prop.name}
                className="w-16 h-16 rounded-lg object-cover mr-3"
              />
              <div>
                <div className="font-semibold">{prop.name}</div>
                <div className="text-gray-500 text-sm">{prop.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button className="flex flex-col items-center text-green-800">
          <span className="material-icons">home</span>
          <span className="text-xs">Accueil</span>
        </button>
        <button className="flex flex-col items-center text-gray-700">
          <span className="material-icons">event</span>
          <span className="text-xs">Activités</span>
        </button>
        <button className="flex flex-col items-center text-gray-700">
          <span className="material-icons">apartment</span>
          <span className="text-xs">Mes propriétés</span>
        </button>
        <button className="flex flex-col items-center text-gray-700">
          <span className="material-icons">mail</span>
          <span className="text-xs">Inbox</span>
        </button>
        <button className="flex flex-col items-center text-gray-700">
          <span className="material-icons">person</span>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}

// Example usage (replace with your data source):
// <WelcomeOwner
//   user={{ firstName: "Mehdi" }}
//   properties={[{ id: 1, name: "Appartement Zephire", location: "Ifrane", image: