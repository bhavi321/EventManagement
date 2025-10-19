import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentProfile: null,
  profiles: [],
  events: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
    updateProfile: (state, action) => {
      const { id, updatedProfile } = action.payload;
      state.profiles = state.profiles.map(p => p._id === id ? updatedProfile : p);
      if (state.currentProfile?._id === id) {
        state.currentProfile = updatedProfile;
      }
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const { id, updatedEvent } = action.payload;
      state.events = state.events.map(e => e._id === id ? updatedEvent : e);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e._id !== action.payload);
    },
  },
});

export const {
  setCurrentProfile,
  setProfiles,
  setEvents,
  addProfile,
  updateProfile,
  addEvent,
  updateEvent,
  deleteEvent,
} = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;

