import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

export default function PropertyPhotosStep() {
  const navigate = useNavigate();
  const { propertyData, setPropertyData } = usePropertyCreation();
  const fileInputRef = useRef();

  // Ensure photos is always an array
  const photos = propertyData.photos || [];

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ...files].slice(0, 10), // Limit to 10 photos if you want
    }));
  };

  const handleRemovePhoto = (idx) => {
    setPropertyData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
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
          className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-4 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none"
          onClick={() => navigate("/property-equipments")}
        >
          <span className="font-semibold text-lg text-gray-800">Equipements</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
      </div>
      {/* Step 5 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">Etape 5:</h2>
          <h3 className="text-black text-xl font-bold text-center mb-6">Choisissez au moins 4 photos</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {photos.length === 0 ? (
              <div className="col-span-2 flex justify-center">
                <button
                  type="button"
                  className="border-2 border-dashed border-[#a084e8] rounded-lg w-64 h-40 flex flex-col items-center justify-center text-[#a084e8] hover:bg-[#f5f5f5] transition"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span className="text-4xl mb-2">+</span>
                  <span className="text-base font-semibold">Ajouter une photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFilesChange}
                  />
                </button>
              </div>
            ) : (
              <>
                {photos.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative border-2 border-dashed rounded-lg w-92 h-32 p-2 flex flex-col items-center justify-center"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`photo-${idx + 1}`}
                      className="w-98 h-28 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleRemovePhoto(idx)}
                      aria-label="Supprimer la photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 10 && (
                  <button
                    type="button"
                    className={
                      photos.length % 2 === 0
                        ? "col-span-2 border-2 border-dashed border-[#a084e8] rounded-lg w-94 h-32 flex flex-col items-center justify-center text-[#a084e8] hover:bg-[#f5f5f5] transition"
                        : "border-2 border-dashed border-[#a084e8] rounded-lg w-42 h-32 flex flex-col items-center justify-center text-[#a084e8] hover:bg-[#f5f5f5] transition"
                    }
                    onClick={() => fileInputRef.current.click()}
                  >
                    <span className={photos.length % 2 === 0 ? "text-4xl mb-2" : "text-3xl mb-1"}>+</span>
                    <span className={photos.length % 2 === 0 ? "text-base font-semibold" : "text-xs font-semibold"}>
                      Ajouter
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFilesChange}
                    />
                  </button>
                )}
              </>
            )}
          </div>
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900 transition"
            disabled={photos.length < 4}
            onClick={() => {
              navigate("/property-title");
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}