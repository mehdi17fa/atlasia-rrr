import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyCreation } from "../../context/PropertyCreationContext";

export default function PropertyDocumentsStep() {
  const navigate = useNavigate();
  const { propertyData, setPropertyData } = usePropertyCreation();
  const fileInputRef = useRef(null);

  // Remember uploaded files in context
  const documents = propertyData.documents || [];

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyData((prev) => ({
      ...prev,
      documents: [...(prev.documents || []), ...files],
    }));
  };

  const handleRemoveDocument = (idx) => {
    setPropertyData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto px-4 pt-4">
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/")}>
          <span className="font-semibold text-lg text-gray-800">Localisation</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-type")}>
          <span className="font-semibold text-lg text-gray-800">Type de propriété</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-info")}>
          <span className="font-semibold text-lg text-gray-800">Information</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-equipments")}>
          <span className="font-semibold text-lg text-gray-800">Equipements</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-photos")}>
          <span className="font-semibold text-lg text-gray-800">Photos</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-title")}>
          <span className="font-semibold text-lg text-gray-800">Titre</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-description")}>
          <span className="font-semibold text-lg text-gray-800">Description</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
        <button type="button" className="w-full rounded-xl border border-[#a084e8] bg-white px-4 py-2.5 mb-2 flex items-center justify-between transition hover:bg-gray-50 focus:outline-none" onClick={() => navigate("/property-price")}>
          <span className="font-semibold text-lg text-gray-800">Prix</span>
          <span className="text-green-800 text-2xl">&#10003;</span>
        </button>
      </div>
      {/* Step 9 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 pt-4">
          <h2 className="text-green-800 text-lg font-bold text-center mb-1">Etape 9:</h2>
          <h3 className="text-black text-xl font-bold text-center mb-2">Documents légaux</h3>
          <p className="text-center text-gray-700 mb-4">
            Veuillez télécharger les documents prouvant que vous êtes autorisé à louer ce bien (titre de propriété, contrat de location, etc.).
          </p>
          <div className="mb-8">
            <div className="flex flex-col gap-3">
              {/* Always render the input, but hide it */}
              <input
                type="file"
                accept="application/pdf,image/*"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFilesChange}
              />
              {documents.length === 0 && (
                <button
                  type="button"
                  className="border-2 border-dashed border-[#a084e8] rounded-lg w-full h-32 flex flex-col items-center justify-center text-[#a084e8] hover:bg-[#f5f5f5] transition"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <span className="text-4xl mb-2">+</span>
                  <span className="text-base font-semibold">Ajouter un document</span>
                </button>
              )}
              {documents.map((file, idx) => (
                <div key={idx} className="relative border-2 border-dashed rounded-lg w-full h-20 px-4 flex items-center justify-between bg-gray-50">
                  <span className="truncate max-w-xs">{file.name}</span>
                  <button
                    type="button"
                    className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center ml-2"
                    onClick={() => handleRemoveDocument(idx)}
                    aria-label="Supprimer le document"
                  >
                    ×
                  </button>
                </div>
              ))}
              {documents.length > 0 && (
                <button
                  type="button"
                  className="border-2 border-dashed border-[#a084e8] rounded-lg w-full h-20 flex flex-col items-center justify-center text-[#a084e8] hover:bg-[#f5f5f5] transition"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <span className="text-3xl mb-1">+</span>
                  <span className="text-xs font-semibold">Ajouter</span>
                </button>
              )}
            </div>
          </div>
          <button
            className="w-full bg-green-800 text-white rounded-full py-3 font-semibold text-lg hover:bg-green-900 transition"
            disabled={documents.length === 0}
            onClick={() => navigate("/next-step")}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}