import React from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

export default function PropertyTitleStep() {
  const navigate = useNavigate();
  const { propertyData, setPropertyData } = usePropertyCreation();

  // Ensure title is always a string
  const title = propertyData.title || "";

  const handleChange = (e) => {
    setPropertyData((prev) => ({
      ...prev,
      title: e.target.value.slice(0, 25), // Limit to 25 chars
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
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/property-info")}
        >
          <span className="font-semibold text-lg text-gray-800">Information</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/property-equipments")}
        >
          <span className="font-semibold text-lg text-gray-800">Equipements</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-4 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/property-photos")}
        >
          <span className="font-semibold text-lg text-gray-800">Photos</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
      </div>
      {/* Step 6 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">Etape 6:</h2>
          <h3 className="text-black text-xl font-bold text-center mb-2">Attribuer un titre à votre annonce</h3>
          <p className="text-center text-gray-700 mb-4">Vous pourrez toujours le modifier plus tard!</p>
          <textarea
            className="w-full border-2 border-green-800 rounded-xl px-4 py-3 text-gray-700 focus:outline-none resize-none text-lg mb-2"
            rows={4}
            maxLength={25}
            value={title}
            onChange={handleChange}
            placeholder="Titre de l'annonce"
          />
          <div className="text-xs text-gray-500 mb-4 text-right">{title.length}/25</div>
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900 transition"
            disabled={title.length === 0}
            onClick={() => {
              navigate("/property-description");
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}