import { useState, useRef, useEffect } from 'react';
import { updateEvent } from '../api/api';
import { toast } from 'react-toastify';
import { TIMEZONES } from '../utils/timezones';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './EditEventModal.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function EditEventModal({ event, profiles, onClose, onUpdate }) {
  const [selectedProfiles, setSelectedProfiles] = useState(event.profiles);
  const [selectedTimezone, setSelectedTimezone] = useState(event.timezone);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const start = dayjs(event.startDate).tz(event.timezone);
    const end = dayjs(event.endDate).tz(event.timezone);
    
    setStartDate(start.format('YYYY-MM-DD'));
    setStartTime(start.format('HH:mm'));
    setEndDate(end.format('YYYY-MM-DD'));
    setEndTime(end.format('HH:mm'));
  }, [event]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
      toast.warn('Please select at least one profile');
      return;
    }

    try {
      const startDateTime = dayjs.tz(`${startDate} ${startTime}`, selectedTimezone);
      const endDateTime = dayjs.tz(`${endDate} ${endTime}`, selectedTimezone);

      if (endDateTime.isBefore(startDateTime)) {
        toast.error('End date/time cannot be before start date/time');
        return;
      }

      const eventData = {
        profiles: selectedProfiles.map(p => p._id),
        timezone: selectedTimezone,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
      };

      await updateEvent(event._id, eventData);
      onUpdate();
      toast.success('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  const filteredProfiles = profiles.filter(p =>
    p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Event</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
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
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-input time-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">End Date & Time</label>
            <div className="datetime-inputs">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-input time-input"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-update">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventModal;

