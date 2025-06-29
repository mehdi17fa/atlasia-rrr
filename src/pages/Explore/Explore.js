// screens/Explore.js
import React from 'react';
import SearchBar from '../../components/explore/SearchBar';
import ExploreFilter from '../../components/explore/ExplorFilter';
import ListingCardGrid from '../../components/ListingCard/ListingCardGrid';
import MapToggle from '../../components/explore/MapToggle';
import SectionTitle from '../../components/shared/SectionTitle';
import Navbar from '../../components/shared/Navbar';

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
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-bold text-green-800">Atlasia</div>

        <div className="flex-1 max-w-3xl mx-10">
          <SearchBar />
        </div>

        <div className="flex gap-4 text-sm">
          <button className="bg-green-700 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-green-800 transition">Log in</button>
          <button className="bg-white-700 text-black px-6 py-2 rounded-full font-medium text-sm hover:bg-green-600 transition">Sign up</button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <Navbar title="Découvrir" />
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 mt-4">
        <SearchBar />
      </div>

      {/* Filters and Listings */}
      <ExploreFilter />

      <SectionTitle title="Option Populaires:" />
      <ListingCardGrid listings={popularOptions} />

      <SectionTitle title="Logement Downtown:" />
      <ListingCardGrid listings={popularOptions} />

      {/* Floating Map Toggle Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <MapToggle />
      </div>
    </div>
  );
}
