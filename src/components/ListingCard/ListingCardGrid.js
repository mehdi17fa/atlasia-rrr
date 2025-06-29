// components/ListingCard/ListingCardGrid.js
import React from 'react';
import ListingCard from './ListingCard';

export default function ListingCardGrid({ title, listings }) {
  return (
    <div className="px-4 mt-6">
      <h2 className="text-lg font-semibold text-green-900 mb-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {listings.map((item, i) => (
          <ListingCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
}
