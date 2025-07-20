import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

// Import icons for both active (green) and inactive (black) states
import { ReactComponent as AppartementIconBlack } from "../../assets/icons/Properties/appartementBlack.svg";
import { ReactComponent as AppartementIconGreen } from "../../assets/icons/Properties/appartementGreen.svg";
import { ReactComponent as VillaIconBlack } from "../../assets/icons/Properties/villaBlack.svg";
import { ReactComponent as VillaIconGreen } from "../../assets/icons/Properties/villaGreen.svg";
import { ReactComponent as ChaletIconBlack } from "../../assets/icons/Properties/chaletBlack.svg";
import { ReactComponent as ChaletIconGreen } from "../../assets/icons/Properties/chaletGreen.svg";
import { ReactComponent as StudioIconBlack } from "../../assets/icons/Properties/studioBlack.svg";
import { ReactComponent as StudioIconGreen } from "../../assets/icons/Properties/studioGreen.svg";
import AddProperty from "./addProperty";

const propertyTypes = [
  {
    label: "Appartement",
    iconActive: AppartementIconGreen,
    iconInactive: AppartementIconBlack,
  },
  {
    label: "Villa",
    iconActive: VillaIconGreen,
    iconInactive: VillaIconBlack,
  },
  {
    label: "Chalet",
    iconActive: ChaletIconGreen,
    iconInactive: ChaletIconBlack,
  },
  {
    label: "Studio / Chambre",
    iconActive: StudioIconGreen,
    iconInactive: StudioIconBlack,
  },
];

export default function PropertyTypeStep() {
  const { propertyData, setPropertyData } = usePropertyCreation();
  const navigate = useNavigate();
  const selected = propertyTypes.findIndex((t) => t.label === propertyData.propertyType);

  const handleSelect = (idx) => {
    setPropertyData((prev) => ({
      ...prev,
      propertyType: propertyTypes[idx].label,
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Localisation rectangle top bar */}
      <div className="w-full max-w-md mx-auto px-4 pt-4">
        <div
          className="flex items-center rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-4 cursor-pointer shadow-sm transition hover:bg-gray-50"
          onClick={() => navigate("/")}
        >
          <span className="font-semibold text-lg text-gray-800 text-left flex-1">Localisation</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </div>
      </div>

      {/* Step 2 */}
      <div className="w-full max-w-md mx-auto mt-4 px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">Etape 2:</h2>
          <h3 className="text-black text-xl font-bold text-center mb-6">Type de propriété</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {propertyTypes.map((type, idx) => {
              const Icon = selected === idx ? type.iconActive : type.iconInactive;
              const textColor = selected === idx ? "text-green-800" : "text-[#222]";
              return (
                <button
                  key={type.label}
                  onClick={() => handleSelect(idx)}
                  className={`border-2 rounded-xl p-4 flex flex-col items-center transition-all duration-300 ${
                    selected === idx
                      ? "border-green-800 bg-green-50"
                      : "border-green-800 bg-white"
                  }`}
                >
                  <Icon className="w-12 h-12 mx-auto mb-2 transition-all duration-300" />
                  <span className={`font-semibold ${textColor}`}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900"
            disabled={selected === null}
            onClick={() => {
              navigate("/property-info");
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}