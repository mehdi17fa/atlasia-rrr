import React from 'react';

export default function SectionTitle({ title }) {
  return (
    <h2 className="text-lg md:text-xl font-semibold text-green-900 px-4 mt-6 mb-3">
      {title}
    </h2>
  );
}
