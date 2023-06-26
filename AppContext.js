import React, { createContext, useState } from 'react';

// Crea el contexto
export const AppContext = createContext();

// Crea el proveedor del contexto
export const AppContextProvider = ({ children }) => {
  const [serviceAccepted, setServiceAccepted] = useState(false);

  return <AppContext.Provider value={{ serviceAccepted, setServiceAccepted }}>{children}</AppContext.Provider>;
};
