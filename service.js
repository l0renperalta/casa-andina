const URI = 'http://192.168.1.3:5000/';

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
