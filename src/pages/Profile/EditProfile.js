import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Ajoute ceci
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'; // Use your edit icon here
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import defaultProfilePic from '../assets/default-pp.png'; // ✅ Ton image par défaut (à adapter)
import { ReactComponent as MyEditIcon } from '../../assets/icons/pen.svg';

export default function EditProfileScreen() {
  const [profile, setProfile] = useState({
    lastName: 'Mellouli',
    firstName: 'Amine',
    email: 'amine.mellouli@gmail.com',
    phone: '+2126-76756534',
  });

  const navigate = useNavigate(); // 👈 Initialise le hook

  const [profileImage, setProfileImage] = useState(defaultProfilePic); // 👈 Par défaut
  const fileInputRef = useRef(null); // 👈 Référence vers input type="file"

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // 👈 Clique programmé
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 👈 Affichage local sans upload
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-green-800 text-white pt-8 flex justify-between relative">
        <h1 className="text-lg font-semibold w-full text-center mb-4">Modifier mon profil</h1>

        {/* 👇 Bouton retour */}
        <button
          onClick={() => navigate('/profile')} // 👈 Va à la page précédente
          className="absolute left-4 top-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Bouton Share */}
       <button className="absolute right-4 top-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <ShareIcon className="w-5 h-5" fill="white" stroke="white" />
       </button>
      </div>

      {/* Profile photo */}
      <div className="flex flex-col mt-12 items-center">
        <div className="relative">
          <img
            src={defaultProfilePic}
            alt="Profil"
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />
          <button
            className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md border"
            onClick={handleImageClick}
          >
            <MyEditIcon className="w-4 h-4 text-gray-600" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <p className="mt-2 font-medium flex text-lg items-center gap-1">
          Modifier la photo de profil
        </p>
      </div>

      {/* Form fields */}
      <div className="mt-12 px-4 md:px-40 space-y-6">
        {[
          { label: 'Nom', value: profile.lastName, key: 'lastName' },
          { label: 'Prénom', value: profile.firstName, key: 'firstName' },
          { label: 'Adresse email', value: profile.email, key: 'email' },
          { label: 'Numéro de téléphone', value: profile.phone, key: 'phone' },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-lg font-medium text-gray-700">{field.label}</label>
            <div className="flex items-center mt-1 bg-white border rounded-lg px-3 py-2">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="flex-1 outline-none text-gray-900 text-lg"
              />
              <MyEditIcon className="w-5 h-5 text-gray-400 ml-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="mt-8 px-4 md:px-40">
        <button className="bg-green-700 w-full text-white py-3 rounded-full font-medium mt-8 text-center">
          Appliquer les changements
        </button>
      </div>

      {/* Shared bottom navbar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        {/* <BottomNav /> */}
      </div>
    </div>
  );
}
