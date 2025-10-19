import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { createEvent } from '../api/api';
import { TIMEZONES, getTimezoneLabel } from '../utils/timezones';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// import './CreateEvent.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function CreateEvent({ onEventCreated }) {
  const profiles = useSelector((state) => state.app.profiles);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProfiles.length === 0) {
      alert('Please select at least one profile');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }

    try {
      // Combine date and time
      const startDateTime = dayjs.tz(`${startDate} ${startTime}`, selectedTimezone);
      const endDateTime = dayjs.tz(`${endDate} ${endTime}`, selectedTimezone);
      console.log("startDateTime: ", startDateTime);
      console.log("endDateTime: ", endDateTime);
      if (endDateTime.isBefore(startDateTime)) {
        alert('End date/time cannot be before start date/time');
        return;
      }

      const eventData = {
        profiles: selectedProfiles.map(p => p._id),
        timezone: selectedTimezone,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
      };

      await createEvent(eventData);
      
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  const filteredProfiles = profiles.filter(p =>
    p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="create-event-card">
      <h2 className="card-title">Create Event</h2>
      
      <form onSubmit={handleSubmit} className="event-form">
       

        <button type="submit" className="btn-create">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;

