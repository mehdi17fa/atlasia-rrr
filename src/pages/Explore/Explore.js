// pages/Explore/Explore.js
import React from 'react';
import ListingCardGrid from '../../components/ListingCard/ListingCardGrid';
import SectionTitle from '../../components/shared/SectionTitle';

export default function Explore() {
  const popularOptions = [
    {
      image: '../../villa1.jpg',
      title: 'Villa Makarska',
      location: 'Ifrane, Farah Inn',
      typelocation: '• City',
      bedrooms: 8,
      guests: 8,
      bathrooms: 4,
      area: 460,
      price: 280,
    },
    {
      image: '../../villa2.jpg',
      title: 'Appartement Zepplin',
      location: 'Ifrane, Zepplin',
      bedrooms: 6,
      guests: 6,
      bathrooms: 3,
      area: 400,
      price: 200,
    },
  ];

  return (
    <div>
      <SectionTitle title="Options Populaires:" />
      <ListingCardGrid listings={popularOptions} />
      
      <SectionTitle title="Logement Downtown:" />
      <ListingCardGrid listings={popularOptions} />
    </div>
  );
}
