const URI = 'http://192.168.1.2:5000/';

// Turista
export const uploadImageToCollection = async (formatedImage) => {
  const response = await fetch(URI + 'indexFaces', {
    method: 'POST',
    body: formatedImage,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const searchFaceByImage = async (formatedImage) => {
  const response = await fetch(URI + 'searchFaceByImage', {
    method: 'POST',
    body: formatedImage,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const searchPlaceByText = async (place) => {
  const response = await fetch(URI + 'searchPlaceByText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ place }),
  });
  return await response.json();
};

export const searchPlaceByCoordinates = async (coordinates) => {
  const response = await fetch(URI + 'searchPlaceByCoordinates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coordinates }),
  });
  return await response.json();
};

export const registerService = async (values) => {
  const response = await fetch(URI + 'registerService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });
  return await response.json();
};

// Admin
export const registerTourist = async (data) => {
  const response = await fetch(URI + 'registerTourist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const registerConductor = async (data) => {
  const response = await fetch(URI + 'registerConductor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// Conductor
export const getAvalibleServices = async () => {
  const response = await fetch(URI + 'getAvalibleServices', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

// Login tourest
export const loginTourist = async (data) => {
  const response = await fetch(URI + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// AWS LOCATION Get Transport locations
export const getTransportPositions = async () => {
  const response = await fetch(URI + 'getPositions', {
    method: 'GET',
  });
  const { positions } = await response.json();
  return positions;
};
