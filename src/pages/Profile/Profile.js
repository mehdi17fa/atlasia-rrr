// src/pages/Profile/Profile.js
import React from 'react';
import SectionTitle from '../../components/shared/SectionTitle';
import DefaultAvatar from '../assets/default-pp.png';

export default function Profile() {
  return (
    <div className="pb-20 px-4 mt-24">
        <div className="text-center mt-6">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-600">
            <img
            src={DefaultAvatar} 
            alt="Profile"
            className="w-full h-full object-cover"
            />
        </div>
        <h1 className="font-semibold text-3xl mt-2">Test</h1>
        <p className="text-sm text-gray-600">View profile</p>
        <div className="mt-4 text-green-700 font-medium">
            Devenir partenaire avec Atlasia<br />
            <span className="text-sm underline">voir plus</span>
        </div>
        </div>

      <SectionTitle title="Account Settings" />
      <ul className="space-y-4 ml-4">
        {[
          'Info Personnel',
          'Ma Balance et Payments',
          'Language',
          'Notifications',
          'Mes Données',
          'Séjour de travaille',
        ].map((label) => (
          <li key={label} className="flex justify-between items-center py-2 border-b">
            <span>{label}</span>
            <span>&gt;</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button className="bg-green-700 text-white py-2 px-6 rounded-full font-medium">
          Devenir propriétaire
        </button>
      </div>
    </div>
  );
}
