import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

// Import icons for each info type
import { ReactComponent as GuestsIcon } from "../../assets/icons/Properties/guests.svg";
import { ReactComponent as RoomsIcon } from "../../assets/icons/Properties/rooms.svg";
import { ReactComponent as BedsIcon } from "../../assets/icons/Properties/beds.svg";
import { ReactComponent as BathsIcon } from "../../assets/icons/Properties/baths.svg";

const infoTypes = [
  {
    label: "Invités",
    icon: GuestsIcon,
    key: "guests",
    min: 1,
  },
  {
    label: "Chambres",
    icon: RoomsIcon,
    key: "rooms",
    min: 1,
  },
  {
    label: "Lits",
    icon: BedsIcon,
    key: "beds",
    min: 1,
  },
  {
    label: "Salles de bain",
    icon: BathsIcon,
    key: "baths",
    min: 1,
  },
];

export default function PropertyInfoStep() {
  const navigate = useNavigate();
  const { propertyData, setPropertyData } = usePropertyCreation();

  const info = propertyData.info;

  const handleChange = (key, delta, min) => {
    setPropertyData((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [key]: Math.max(min, prev.info[key] + delta),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto px-4 pt-4">
        <div
          className="rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between cursor-pointer transition hover:bg-gray-50"
          onClick={() => navigate("/")}
        >
          <span className="font-semibold text-lg text-gray-800">Localisation</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </div>
        <div
          className="rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-4 flex items-center justify-between cursor-pointer transition hover:bg-gray-50"
          onClick={() => navigate("/property-type")}
        >
          <span className="font-semibold text-lg text-gray-800">Type de propriété</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </div>
      </div>
      {/* Step 3 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">Etape 3:</h2>
          <h3 className="text-black text-xl font-bold text-center mb-6">Informations</h3>
          <div className="flex flex-col gap-5 mb-8">
            {infoTypes.map(({ label, icon: Icon, key, min }) => (
              <div key={key} className="flex items-center gap-3">
                <Icon className="w-8 h-8 text-green-800" />
                <span className="flex-1 font-semibold text-lg text-green-800">{label}</span>
                <button
                  className="w-8 h-8 rounded-full bg-green-800 text-white text-xl flex items-center justify-center"
                  onClick={() => handleChange(key, -1, min)}
                  disabled={info[key] <= min}
                  aria-label={`Moins de ${label}`}
                >
                  –
                </button>
                <span className="w-6 text-center font-bold text-lg">{info[key]}</span>
                <button
                  className="w-8 h-8 rounded-full bg-green-800 text-white text-xl flex items-center justify-center"
                  onClick={() => handleChange(key, 1, min)}
                  aria-label={`Plus de ${label}`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900 transition"
            onClick={() => {
              // Go to next step (replace with your next route)
              navigate("/property-equipments");
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}