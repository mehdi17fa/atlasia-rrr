// components/explore/ExploreFilter.js
import React from 'react';

// Import custom SVGs
import { ReactComponent as LogementIcon } from '../../assets/icons/logement.svg';
import { ReactComponent as RestaurationIcon } from '../../assets/icons/restauration.svg';
import { ReactComponent as ActiviteIcon } from '../../assets/icons/activite.svg';
import { ReactComponent as PacksIcon } from '../../assets/icons/pack.svg';

const categories = [
  { label: 'Logement', icon: LogementIcon },
  { label: 'Restauration', icon: RestaurationIcon },
  { label: 'Activités', icon: ActiviteIcon },
  { label: 'Packs et services', icon: PacksIcon },
];

export default function ExploreFilter() {
  return (
    <div className="flex justify-around border-b border-gray-200 py-2 bg-white">
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <div key={i} className="flex flex-col items-center text-green-800 text-xs">
            <Icon className="w-6 h-6 mb-1" />
            {cat.label}
          </div>
        );
      })}
    </div>
  );
}
