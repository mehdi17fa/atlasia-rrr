import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'; // Use your edit icon here

export default function EditProfileScreen() {
  const [profile, setProfile] = useState({
    lastName: 'Mecifi',
    firstName: 'Khadéja',
    email: 'k.mec@gmail.com',
    phone: '+2126-76756534',
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-green-800 text-white p-32 flex items-center justify-between relative">
        {/* Back button */}
        <button className="absolute left-4 top-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-lg font-semibold w-full text-center">Modifier mon profil</h1>

        {/* Share button */}
        <button className="absolute right-4 top-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
          </svg>
        </button>
      </div>

      {/* Profile photo */}
      <div className="flex flex-col items-center mt-16">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md border">
            <EditIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>  
        <p className="mt-2 font-medium flex items-center gap-1">
          Modifier la photo de profil
          <EditIcon className="w-4 h-4 text-black" />
        </p>
      </div>

      {/* Form fields */}
      <div className="mt-6 px-4 md:px-40 space-y-4">
        {[
          { label: 'Nom', value: profile.lastName, key: 'lastName' },
          { label: 'Prénom', value: profile.firstName, key: 'firstName' },
          { label: 'Adresse email', value: profile.email, key: 'email' },
          { label: 'Numéro de téléphone', value: profile.phone, key: 'phone' },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <div className="flex items-center mt-1 bg-white border rounded-lg px-3 py-2">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="flex-1 outline-none text-gray-900 text-sm"
              />
              <EditIcon className="w-4 h-4 text-gray-400 ml-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="mt-8 px-4 md:px-40">
        <button className="bg-green-700 w-full text-white py-3 rounded-full font-medium text-center">
          Appliquer les changements
        </button>
      </div>

      {/* Shared bottom navbar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        {/* Replace with your imported shared navbar */}
        {/* <BottomNav /> */}
      </div>
    </div>
  );
}
