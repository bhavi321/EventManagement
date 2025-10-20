# Event Management System

A full-stack event management application that allows users to create and manage events across multiple profiles and timezones with complete event update history tracking.

## 🚀 Features

- **Multi-Profile Management**: Create and manage multiple user profiles
- **Timezone Support**: Full timezone support with automatic conversion using dayjs
- **Event Creation**: Create events for one or multiple profiles simultaneously
- **Event Editing**: Update events with automatic change tracking
- **Update History**: View complete history of event changes with old/new value comparisons
- **Responsive UI**: Modern, clean interface that works on all devices
- **Real-time Timezone Conversion**: Events display in user's selected timezone
- **Toast Notifications**: User-friendly notifications instead of browser alerts

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with Mongoose ODM
- **dayjs** for timezone management
- ES6 Modules

### Frontend
- **React 18** with **Vite**
- **Redux Toolkit** for state management
- **Axios** for API calls
- **dayjs** for date/time handling
- **react-toastify** for notifications
- Modern CSS with responsive design

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection URI)
- npm or yarn package manager

## 🔧 Quick Start

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "PORT=3000" > .env
echo "MONGO_URI=mongodb://localhost:27017/event-management" >> .env

# Start the server
npm run dev
```

**Backend will run on:** `http://localhost:3000`

### Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start the development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

## 🎯 Usage

1. **Create a Profile**
   - Click "Select current profile..." in the header
   - Click "+ Add Profile"
   - Enter name and select timezone
   - Click "Add"

2. **Create an Event**
   - Select profile(s) from the dropdown
   - Choose timezone
   - Pick start and end date/time
   - Click "Create Event"

3. **View Events**
   - Events appear on the right side
   - Change timezone to see automatic conversion
   - Click "Edit" to modify events
   - Click "View Logs" to see update history

## 📚 API Endpoints

### User/Profile Endpoints
- `GET /api/users` - Get all profiles
- `POST /api/users` - Create a new profile
- `GET /api/users/:id` - Get a specific profile
- `PATCH /api/users/:id` - Update profile timezone

### Event Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/profile/:profileId` - Get events for a specific profile
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get a specific event
- `PUT /api/events/:id` - Update an event

**Built with ❤️ for the Event Management Assignment**