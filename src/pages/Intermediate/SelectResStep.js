import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationButton from "../../components/shared/NavigationButtons";

// Dummy restaurants data, replace with your real data or props
const restaurants = [
  {
    id: 1,
    name: "Foodle Restaurants",
    location: "Ifrane - Downtown",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: 2,
    name: "Lyn Restaurant",
    location: "Ifrane - Downtown",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=80&q=80"
  }
];

// Dummy activities data, replace with your real data or props
const activities = [
  {
    id: 1,
    name: "Quad Atlasia",
    location: "Ifrane - Farah Inn",
    duration: "1h",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: 2,
    name: "Paintball",
    location: "Ifrane - Farah Inn",
    duration: "1H30",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=80&q=80"
  }
];

// Dummy services data, replace with your real data or props
const services = [
  {
    id: 1,
    name: "Service de Transport",
    location: "Ifrane - Downtown",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: 2,
    name: "Service de Nettoyage",
    location: "Ifrane - Downtown",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=80&q=80"
  }
];

const stepOrder = [
  { key: "date", label: "Date", to: "/create-package" },
  { key: "property", label: "Propriété", to: "/select-property" },
  { key: "activities", label: "Type de pack", to: "/create-package/activities" },
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

export default function ActivitiesStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, property } = location.state || {};
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeTab, setActiveTab] = useState("restaurants"); // "restaurants", "activities", "services"
  const [stepsCompleted, setStepsCompleted] = useState({ 
    date: true, 
    property: true, 
    activities: false 
  });

  const handleNext = () => {
    const totalSelected = selectedRestaurants.length + selectedActivities.length + selectedServices.length;
    if (totalSelected > 0) {
      setStepsCompleted((prev) => ({ ...prev, activities: true }));
      navigate("/package-name", {
        state: { 
          date, 
          property, 
          restaurants: selectedRestaurants,
          activities: selectedActivities,
          services: selectedServices
        }
      });
    }
  };

  const toggleRestaurant = (restaurant) => {
    setSelectedRestaurants(prev => 
      prev.some(r => r.id === restaurant.id)
        ? prev.filter(r => r.id !== restaurant.id)
        : [...prev, restaurant]
    );
  };

  const toggleActivity = (activity) => {
    setSelectedActivities(prev => 
      prev.some(a => a.id === activity.id)
        ? prev.filter(a => a.id !== activity.id)
        : [...prev, activity]
    );
  };

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const currentStepKey = "activities";
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
        
        {/* Date and Property summary */}
        <div className="w-full rounded-xl border px-4 py-2 mb-2 flex flex-col gap-2 bg-white font-medium">
          <div className="flex items-center">
            <span className="text-gray-600">Date</span>
            <span className="flex-1 text-right text-black">
              {formatDateRange(date)}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Propriété</span>
            <span className="flex-1 text-right text-black">
              {property?.name}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mt-2">
          <h2 className="text-green-800 text-center text-lg font-bold mb-1">
            Etape 3: <span className="text-black">Type de pack</span>
          </h2>
          
          {/* Categories */}
          <div className="flex justify-center gap-4 mb-4">
            <button 
              onClick={() => setActiveTab("restaurants")}
              className={`font-medium pb-1 transition ${
                activeTab === "restaurants" 
                  ? "text-green-800 border-b-2 border-green-800" 
                  : "text-gray-500"
              }`}
            >
              Restaurants
            </button>
            <button 
              onClick={() => setActiveTab("activities")}
              className={`font-medium pb-1 transition ${
                activeTab === "activities" 
                  ? "text-green-800 border-b-2 border-green-800" 
                  : "text-gray-500"
              }`}
            >
              Activités
            </button>
            <button 
              onClick={() => setActiveTab("services")}
              className={`font-medium pb-1 transition ${
                activeTab === "services" 
                  ? "text-green-800 border-b-2 border-green-800" 
                  : "text-gray-500"
              }`}
            >
              Services
            </button>
          </div>

          {/* Dynamic content based on active tab */}
          <div className="flex flex-col gap-3 mb-6">
            {activeTab === "restaurants" && restaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => toggleRestaurant(restaurant)}
                className={`flex items-center w-full rounded-xl border px-2 py-2 transition
                  ${selectedRestaurants.some(r => r.id === restaurant.id)
                    ? "border-green-800 bg-green-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"}
                `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{restaurant.name}</div>
                    <div className="text-gray-500 text-sm">{restaurant.location}</div>
                  </div>
                </div>
              </button>
            ))}
            
            {activeTab === "activities" && activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => toggleActivity(activity)}
                className={`flex items-center w-full rounded-xl border px-2 py-2 transition
                  ${selectedActivities.some(a => a.id === activity.id)
                    ? "border-green-800 bg-green-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"}
                `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{activity.name}</div>
                    <div className="text-gray-500 text-sm">{activity.location} - {activity.duration}</div>
                  </div>
                </div>
              </button>
            ))}
            
            {activeTab === "services" && services.map((service) => (
              <button
                key={service.id}
                onClick={() => toggleService(service)}
                className={`flex items-center w-full rounded-xl border px-2 py-2 transition
                  ${selectedServices.some(s => s.id === service.id)
                    ? "border-green-800 bg-green-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"}
                `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-gray-500 text-sm">{service.location}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {activeTab === "restaurants" && (
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab("activities")}
                className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-900 transition"
              >
                <span className="text-white text-xl font-bold">→</span>
              </button>
            </div>
          )}
          
          {activeTab === "activities" && (
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab("services")}
                className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-900 transition"
              >
                <span className="text-white text-xl font-bold">→</span>
              </button>
            </div>
          )}
          
          {activeTab === "services" && (
            <button
              className={`w-full rounded-full py-2 font-semibold text-lg transition ${
                (selectedRestaurants.length + selectedActivities.length + selectedServices.length) > 0
                  ? "bg-green-800 text-white hover:bg-green-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={(selectedRestaurants.length + selectedActivities.length + selectedServices.length) === 0}
              onClick={handleNext}
            >
              Suivant
            </button>
          )}

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