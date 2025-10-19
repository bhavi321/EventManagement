import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createEvent } from '../api/api';
import { TIMEZONES, getTimezoneLabel } from '../utils/timezones';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './CreateEvent.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function CreateEvent({ onEventCreated }) {
  const profiles = useSelector((state) => state.app.profiles);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('09:00');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileToggle = (profile) => {
    setSelectedProfiles(prev => {
      const exists = prev.find(p => p._id === profile._id);
      if (exists) {
        return prev.filter(p => p._id !== profile._id);
      } else {
        return [...prev, profile];
      }
    });
  };

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
      
      // Reset form
      setSelectedProfiles([]);
      setSelectedTimezone('America/New_York');
      setStartDate('');
      setStartTime('09:00');
      setEndDate('');
      setEndTime('09:00');
      
      onEventCreated();
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
        <div className="form-group">
          <label className="form-label">Profiles</label>
          <div className="profile-select-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className="profile-select-button"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <span>
                {selectedProfiles.length === 0
                  ? 'Select profiles...'
                  : `${selectedProfiles.length} profile${selectedProfiles.length > 1 ? 's' : ''} selected`}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          
            {showProfileDropdown && (
              <div className="profile-dropdown">
                {/* {selectedProfiles.length > 0 && (
                  <div className="selected-profiles-header">
                    <span>{selectedProfiles.length} profile{selectedProfiles.length > 1 ? 's' : ''} selected</span>
                  </div>
                )} */}
                
                <div className="dropdown-search">
                  <input
                    type="text"
                    placeholder="Search profiles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <div className="profile-list">
                  {filteredProfiles.map(profile => {
                    const isSelected = selectedProfiles.find(p => p._id === profile._id);
                    return (
                      <div
                        key={profile._id}
                        className={`profile-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleProfileToggle(profile)}
                      >
                        <div className="checkbox">
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span>{profile.name}</span>
                      </div>
                    );
                  })}
                </div>
                
                {selectedProfiles.length > 0 && (
                  <div className="selected-profiles-list">
                    {selectedProfiles.map(profile => (
                      <div key={profile._id} className="selected-profile-tag">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M9 3L4.5 7.5L2 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{profile.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  type="button"
                  className="btn-add-profile-inline"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Add Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Timezone</label>
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="form-select"
            required
          >
            {TIMEZONES.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Start Date & Time</label>
          <div className="datetime-inputs">
            <div className="date-input-wrapper">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-input"
                placeholder="Pick a date"
                required
              />
            </div>
            <div className="time-input-wrapper">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-input time-input"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">End Date & Time</label>
          <div className="datetime-inputs">
            <div className="date-input-wrapper">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-input"
                placeholder="Pick a date"
                required
              />
            </div>
            <div className="time-input-wrapper">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-input time-input"
                required
              />
            </div>
          </div>
        </div>

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

