import React from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

// Import both black and green icons for each equipment
import { ReactComponent as WifiBlack } from "../../assets/icons/PropertyEquipment/wifiBlack.svg";
import { ReactComponent as WifiGreen } from "../../assets/icons/PropertyEquipment/wifiGreen.svg";
import { ReactComponent as TvBlack } from "../../assets/icons/PropertyEquipment/tvBlack.svg";
import { ReactComponent as TvGreen } from "../../assets/icons/PropertyEquipment/tvGreen.svg";
import { ReactComponent as WasherBlack } from "../../assets/icons/PropertyEquipment/washerBlack.svg";
import { ReactComponent as WasherGreen } from "../../assets/icons/PropertyEquipment/washerGreen.svg";
import { ReactComponent as AcBlack } from "../../assets/icons/PropertyEquipment/acBlack.svg";
import { ReactComponent as AcGreen } from "../../assets/icons/PropertyEquipment/acGreen.svg";
import { ReactComponent as HeaterBlack } from "../../assets/icons/PropertyEquipment/heaterBlack.svg";
import { ReactComponent as HeaterGreen } from "../../assets/icons/PropertyEquipment/heaterGreen.svg";
import { ReactComponent as KitchenBlack } from "../../assets/icons/PropertyEquipment/kitchenBlack.svg";
import { ReactComponent as KitchenGreen } from "../../assets/icons/PropertyEquipment/kitchenGreen.svg";
import { ReactComponent as ParkingBlack } from "../../assets/icons/PropertyEquipment/parkingBlack.svg";
import { ReactComponent as ParkingGreen } from "../../assets/icons/PropertyEquipment/parkingGreen.svg";
import { ReactComponent as PoolBlack } from "../../assets/icons/PropertyEquipment/poolBlack.svg";
import { ReactComponent as PoolGreen } from "../../assets/icons/PropertyEquipment/poolGreen.svg";
import { ReactComponent as PlaygroundBlack } from "../../assets/icons/PropertyEquipment/playgroundBlack.svg";
import { ReactComponent as PlaygroundGreen } from "../../assets/icons/PropertyEquipment/playgroundGreen.svg";

const equipmentsList = [
  { key: "wifi", label: "Wifi", iconBlack: WifiBlack, iconGreen: WifiGreen },
  { key: "tv", label: "Télévision", iconBlack: TvBlack, iconGreen: TvGreen },
  { key: "washer", label: "Lave-linge", iconBlack: WasherBlack, iconGreen: WasherGreen },
  { key: "ac", label: "Climatisation", iconBlack: AcBlack, iconGreen: AcGreen },
  { key: "heater", label: "chauffage", iconBlack: HeaterBlack, iconGreen: HeaterGreen },
  { key: "kitchen", label: "Cuisine", iconBlack: KitchenBlack, iconGreen: KitchenGreen },
  { key: "parking", label: "Parking", iconBlack: ParkingBlack, iconGreen: ParkingGreen },
  { key: "pool", label: "Piscine", iconBlack: PoolBlack, iconGreen: PoolGreen },
  { key: "playground", label: "aire de jeux", iconBlack: PlaygroundBlack, iconGreen: PlaygroundGreen },
];

export default function PropertyEquipmentsStep() {
  const navigate = useNavigate();
  const { propertyData, setPropertyData } = usePropertyCreation();

  const selectedEquipments = propertyData.equipments || [];

  const toggleEquipment = (key) => {
    setPropertyData((prev) => ({
      ...prev,
      equipments: selectedEquipments.includes(key)
        ? selectedEquipments.filter((k) => k !== key)
        : [...selectedEquipments, key],
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto px-4 pt-4">
        <button
          type="button"
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/")}
        >
          <span className="font-semibold text-lg text-gray-800">Localisation</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/property-type")}
        >
          <span className="font-semibold text-lg text-gray-800">Type de propriété</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-4 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/property-info")}
        >
          <span className="font-semibold text-lg text-gray-800">Information</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
      </div>
      {/* Step 4 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">Etape 4:</h2>
          <h3 className="text-black text-xl font-bold text-center mb-6">Les équipements de votre logement</h3>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {equipmentsList.map(({ key, label, iconBlack: IconBlack, iconGreen: IconGreen }) => {
              const selected = selectedEquipments.includes(key);
              const Icon = selected ? IconGreen : IconBlack;
              const textColor = selected ? "text-green-800" : "text-[#222]";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleEquipment(key)}
                  className={`flex flex-col items-center border-2 rounded-xl p-3 transition-all duration-200 ${
                    selected ? "border-green-800 bg-green-50" : "border-green-800 bg-white"
                  }`}
                >
                  <Icon className="w-8 h-8 mb-1 transition-all duration-200" />
                  <span className={`text-sm font-semibold transition-colors duration-200 ${textColor}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900 transition"
            onClick={() => {
              // Go to next step (replace with your next route)
              navigate("/property-photos");
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}