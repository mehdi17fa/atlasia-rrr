import React, { useState } from "react";
import Calendar from "../../components/shared/Calendar";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../../components/shared/NavigationButtons";

const stepOrder = [
  { key: "date", label: "Date", to: "/create-package" },
  { key: "property", label: "Propriété", to: "/select-property" },
  { key: "activities", label: "Activités", to: "/create-package/activities" },
  // Add more steps as needed
];

function formatDateRange(dateRange) {
  if (!dateRange) return "";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  if (Array.isArray(dateRange) && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
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

export default function CreatePackage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [stepsCompleted, setStepsCompleted] = useState({ date: false });
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedDate) {
      setStepsCompleted((prev) => ({ ...prev, date: true }));
      navigate("/select-property", { state: { date: selectedDate } });
    }
  };

  const currentStepKey = "date";
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
        <div className="bg-white rounded-xl shadow p-4 mt-2">
          {/* Completed steps before current */}
          <div className="mb-4">
            {stepOrder.slice(0, currentStepIndex).map((step) =>
              step.key === "date" && selectedDate && Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1] ? (
                <NavigationButton
                  key={step.key}
                  left={step.label}
                  right={formatDateRange(selectedDate)}
                  to={step.to}
                  active={false}
                />
              ) : stepsCompleted[step.key] ? (
                <NavigationButton
                  key={step.key}
                  left={step.label}
                  right="✓"
                  to={step.to}
                  active={false}
                />
              ) : null
            )}
          </div>
          <h2 className="text-green-800 text-center text-lg font-bold mb-1">
            Etape 1: <span className="text-black">Date</span>
          </h2>
          <p className="text-center text-gray-700 mb-4 font-medium">
            Sélectionner une date:
          </p>
          <div className="flex justify-center mb-6">
            <Calendar value={selectedDate} onChange={setSelectedDate} mode="range" />
          </div>
          <button
            className={`w-full rounded-full py-2 font-semibold text-lg transition ${
              selectedDate && Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1]
                ? "bg-green-800 text-white hover:bg-green-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!(selectedDate && Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1])}
            onClick={handleNext}
          >
            Suivant
          </button>
          {/* Completed steps after current, below Suivant */}
          <div className="mt-4 flex flex-col gap-2">
            {stepsAfter.map((step) =>
              stepsCompleted[step.key] ? (
                <NavigationButton
                  key={step.key}
                  left={step.label}
                  right="✓"
                  to={step.to}
                  active={false}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}