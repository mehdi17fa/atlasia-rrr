import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

const cities = [
  "Ifrane",
  "Fès",
  "Marrakech",
  "Casablanca",
  "Rabat",
  "Agadir",
  "Tanger",
  "Autre",
];

export default function AddProperty() {
  const { propertyData, setPropertyData } = usePropertyCreation();
  const { city, address, postalCode } = propertyData.localisation;
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setPropertyData((prev) => ({
      ...prev,
      localisation: {
        ...prev.localisation,
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Header */}
      <div className="w-full max-w-md mx-auto mt-6 mb-2 px-4">
        <h1 className="text-green-800 text-2xl font-bold text-center mb-2">
          Atlasia
        </h1>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">
            Etape 1:
          </h2>
          <h3 className="text-black text-xl font-bold text-center mb-6">
            Localisation
          </h3>

          {/* Ville */}
          <div className="mb-4">
            <label className="block text-green-800 font-semibold mb-1">
              Ville
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none"
              value={city}
              onChange={(e) => handleChange("city", e.target.value)}
            >
              <option value="">Choisir la ville</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Adresse */}
          <div className="mb-4">
            <label className="block text-green-800 font-semibold mb-1">
              Adresse
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none"
              placeholder="Entre l’adresse"
              value={address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          {/* Code postal */}
          <div className="mb-8">
            <label className="block text-green-800 font-semibold mb-1">
              Code postal
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none"
              placeholder="Entre le code postal"
              value={postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
            />
          </div>

          {/* Suivant Button */}
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900 transition"
            onClick={() => navigate("/property-type")}
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}