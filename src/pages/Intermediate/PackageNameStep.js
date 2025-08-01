import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationButton from "../../components/shared/NavigationButtons";

const stepOrder = [
  { key: "date", label: "Date", to: "/create-package" },
  { key: "property", label: "Propriété", to: "/select-property" },
  { key: "activities", label: "Type de pack", to: "/select-res" },
  { key: "name", label: "Nom et description", to: "/package-name" },
  // Add more steps as needed
];

function formatDateRange(dateRange) {
  if (!dateRange) return "";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  if (Array.isArray(dateRange) && dateRange.length === 2) {
    const [start, end] = dateRange;
    return (
      start.toLocaleDateString("fr-FR", options) +
      " - " +
      end.toLocaleDateString("fr-FR", options)
    );
  }
  if (dateRange instanceof Date) {
    return dateRange.toLocaleDateString("fr-FR", options);
  }
  return "";
}

function getSelectedTypes(restaurants, activities, services) {
  const types = [];
  if (restaurants && restaurants.length > 0) types.push("Restaurants");
  if (activities && activities.length > 0) types.push("Activités");
  if (services && services.length > 0) types.push("Services");
  return types.join(" + ");
}

export default function PackageNameStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, property, restaurants, activities, services } = location.state || {};
  
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [stepsCompleted, setStepsCompleted] = useState({ 
    date: true, 
    property: true, 
    activities: true,
    name: false 
  });

  const handleNext = () => {
    if (packageName.trim() && packageDescription.trim()) {
      setStepsCompleted((prev) => ({ ...prev, name: true }));
      navigate("/package-price", {
        state: { 
          date, 
          property, 
          restaurants, 
          activities, 
          services,
          packageName: packageName.trim(),
          packageDescription: packageDescription.trim()
        }
      });
    }
  };

  const currentStepKey = "name";
  const currentStepIndex = stepOrder.findIndex((step) => step.key === currentStepKey);
  const stepsAfter = stepOrder.slice(currentStepIndex + 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md mx-auto pt-4 pb-2 px-4">
        <div className="flex items-center mb-2">
          <button
            onClick={() => navigate(-1)}
            className="text-green-800 text-2xl mr-2"
          >
            &#8592;
          </button>
          <span className="text-green-800 font-bold text-xl">Atlasia</span>
        </div>
        
        {/* Summary of previous steps */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="w-full rounded-xl border px-4 py-2 bg-white font-medium">
            <div className="flex items-center">
              <span className="text-gray-600">Date</span>
              <span className="flex-1 text-right text-black">
                {formatDateRange(date)}
              </span>
            </div>
          </div>
          <div className="w-full rounded-xl border px-4 py-2 bg-white font-medium">
            <div className="flex items-center">
              <span className="text-gray-600">Propriété</span>
              <span className="flex-1 text-right text-black">
                {property?.name}
              </span>
            </div>
          </div>
          <div className="w-full rounded-xl border px-4 py-2 bg-white font-medium">
            <div className="flex items-center">
              <span className="text-gray-600">Type</span>
              <span className="flex-1 text-right text-black">
                {getSelectedTypes(restaurants, activities, services)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mt-2">
          <h2 className="text-green-800 text-center text-lg font-bold mb-1">
            Etape 4: <span className="text-black">Nom et description</span>
          </h2>
          
          {/* Name input */}
          <div className="mb-4">
            <label className="block text-green-800 font-medium mb-2">
              Nom
            </label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Entrer un nom à votre pack"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800"
            />
          </div>

          {/* Description input */}
          <div className="mb-6">
            <label className="block text-green-800 font-medium mb-2">
              Description
            </label>
            <textarea
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              placeholder="Entrer un description à votre pack"
              rows={4}
              maxLength={25}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-800 resize-none"
            />
            <div className="text-right text-gray-500 text-sm mt-1">
              {packageDescription.length}/25
            </div>
          </div>

          <button
            className={`w-full rounded-full py-2 font-semibold text-lg transition ${
              packageName.trim() && packageDescription.trim()
                ? "bg-green-800 text-white hover:bg-green-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!packageName.trim() || !packageDescription.trim()}
            onClick={handleNext}
          >
            Suivant
          </button>

          {/* Navigation buttons for upcoming steps */}
          <div className="mt-4 flex flex-col gap-2">
            {stepsAfter.map((step) => (
              <NavigationButton
                key={step.key}
                left={step.label}
                right="→"
                to={step.to}
                active={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 