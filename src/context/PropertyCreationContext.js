import React, { createContext, useContext, useState } from "react";

const PropertyCreationContext = createContext();

export function PropertyCreationProvider({ children }) {
  const [propertyData, setPropertyData] = useState({
    localisation: {
      city: "",
      address: "",
      postalCode: "",
    },
    propertyType: "",
    info: {
      guests: 2,
      rooms: 2,
      beds: 3,
      baths: 2,
      
    },
  });

  return (
    <PropertyCreationContext.Provider value={{ propertyData, setPropertyData }}>
      {children}
    </PropertyCreationContext.Provider>
  );
}

export function usePropertyCreation() {
  return useContext(PropertyCreationContext);
}