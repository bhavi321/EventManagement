import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/store';
import { updateProfileTimezone } from '../api/api';
import { TIMEZONES, getTimezoneLabel } from '../utils/timezones';
import EventCard from './EventCard';
import EditEventModal from './EditEventModal';
import UpdateLogsModal from './UpdateLogsModal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './EventsList.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function EventsList({ currentProfile, onEventUpdated }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.app.events);
  const profiles = useSelector((state) => state.app.profiles);

  return (
    <div className="events-card">
      <h2 className="card-title">Events</h2>
      
      <div className="events-header">
        <label className="form-label">View in Timezone</label>
        <select
          value={selectedTimezone}
          onChange={(e) => handleTimezoneChange(e.target.value)}
          className="timezone-select"
        >
          {TIMEZONES.map(tz => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
      </div>

      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div className="no-events">No events found</div>
        ) : (
          filteredEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              timezone={selectedTimezone}
              onEdit={() => setEditingEvent(event)}
              onViewLogs={() => setViewingLogs(event)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default EventsList;


