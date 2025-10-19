import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

// User/Profile API
export const getProfiles = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createProfile = async (name, timezone = 'America/New_York') => {
  const response = await axios.post(`${API_URL}/users`, { name, timezone });
  return response.data;
};

export const updateProfileTimezone = async (id, timezone) => {
  const response = await axios.patch(`${API_URL}/users/${id}`, { timezone });
  return response.data;
};

export const getProfile = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// Event API
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const getEventsByProfile = async (profileId) => {
  const response = await axios.get(`${API_URL}/events/profile/${profileId}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/events/${id}`);
  return response.data;
};

export const getEvent = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};


