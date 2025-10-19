const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };  

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// User API endpoints
export const userAPI = {
  create: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  getAll: () => apiRequest('/users'),
  
  getById: (userId) => apiRequest(`/users/${userId}`),
};

// Event API endpoints
export const eventAPI = {
  create: (eventData) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  
  getAll: () => apiRequest('/events'),
  
  getByProfile: (profileId) => apiRequest(`/events/profile/${profileId}`),
  
  update: (eventId, eventData) => apiRequest(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),
};

