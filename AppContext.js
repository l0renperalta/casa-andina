import React, { createContext, useState } from 'react';

// Crea el contexto
export const AppContext = createContext();

// Crea el proveedor del contexto
export const AppContextProvider = ({ children }) => {
  const [serviceAccepted, setServiceAccepted] = useState(false);

  const [serviceData, setServiceData] = useState({
    displayModal: false,
    ubicacion: '',
    destino: '',
    horaReserva: null,
    niños: 0,
    adultos: 0,
  });

  const [driverData, setDriverData] = useState({
    nombres: '',
    apellidos: '',
    marca: '',
    modelo: '',
    placa: '',
    color: '',
    asientos: 0,
  });

  const [userType, setUserType] = useState({
    type: {
      user: '',
      data: {},
    },
  });

  return <AppContext.Provider value={{ serviceAccepted, setServiceAccepted, serviceData, setServiceData, driverData, setDriverData }}>{children}</AppContext.Provider>;
};
