import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationButton from "../../components/shared/NavigationButtons";
import EditIcon from "../../assets/icons/edit.svg";

const stepOrder = [
  { key: "date", label: "Date", to: "/create-package" },
  { key: "property", label: "Propriété", to: "/select-property" },
  { key: "activities", label: "Type de pack", to: "/select-res" },
  { key: "name", label: "Nom et description", to: "/package-name" },
  { key: "price", label: "Prix", to: "/package-price" },
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

export default function PackagePriceStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    date, 
    property, 
    restaurants, 
    activities, 
    services, 
    packageName, 
    packageDescription 
  } = location.state || {};
  
  const [packagePrice, setPackagePrice] = useState(310); // Default price
  const [isEditing, setIsEditing] = useState(false);
  const priceInputRef = useRef(null);
  const [stepsCompleted, setStepsCompleted] = useState({ 
    date: true, 
    property: true, 
    activities: true,
    name: true,
    price: false 
  });

  // Auto-select input content when entering edit mode
  useEffect(() => {
    if (isEditing && priceInputRef.current) {
      priceInputRef.current.focus();
      priceInputRef.current.select();
    }
  }, [isEditing]);

  const handleNext = () => {
    if (packagePrice > 0) {
      setStepsCompleted((prev) => ({ ...prev, price: true }));
      navigate("/create-package/next-step", {
        state: { 
          date, 
          property, 
          restaurants, 
          activities, 
          services,
          packageName,
          packageDescription,
          packagePrice
        }
      });
    }
  };

  const handlePriceChange = (value) => {
    // Only allow up to 5 digits
    let val = value.replace(/\D/g, "").slice(0, 5);
    val = Math.max(0, parseInt(val) || 0);
    setPackagePrice(val);
  };

  const currentStepKey = "price";
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
          <div className="w-full rounded-xl border px-4 py-2 bg-white font-medium">
            <div className="flex items-center">
              <span className="text-gray-600">Nom</span>
              <span className="flex-1 text-right text-black">
                {packageName}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mt-2">
          <h2 className="text-green-800 text-center text-lg font-bold mb-1">
            Etape 5: <span className="text-black">Prix</span>
          </h2>
          
          <p className="text-center text-gray-700 mb-6 font-medium">
            Fixer un prix pour votre pack
          </p>

          {/* Price display and edit */}
          <div className="flex flex-col items-center mb-6">
            <span className="text-green-800 font-semibold mb-1">Prix du pack</span>
            {isEditing ? (
              <input
                ref={priceInputRef}
                type="number"
                min={0}
                max={99999}
                className="text-center text-3xl font-bold border-b-2 border-green-800 outline-none w-40 mb-2"
                value={packagePrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                onBlur={() => setIsEditing(false)}
                autoFocus
              />
            ) : (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <span className="text-4xl font-bold">{packagePrice} MAD</span>
                <img src={EditIcon} alt="Editer" className="w-6 h-6" />
              </div>
            )}
          </div>

          <button
            className={`w-full rounded-full py-2 font-semibold text-lg transition ${
              packagePrice > 0
                ? "bg-green-800 text-white hover:bg-green-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={packagePrice <= 0}
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