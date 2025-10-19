import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProfile, addProfile, updateProfile } from '../store/store';
// import { createProfile, updateProfileTimezone } from '../api/api';
import { TIMEZONES, getTimezoneLabel } from '../utils/timezones';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.app.currentProfile);
  const profiles = useSelector((state) => state.app.profiles);

  const handleAddProfile = async (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    try {
      const profile = await createProfile(newProfileName, newProfileTimezone);
      dispatch(addProfile(profile));

      dispatch(setCurrentProfile(profile));
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">Event Management</h1>
          <p className="header-subtitle">Create and manage events across multiple timezones</p>
        </div>
        <div className="header-right">
          <div className="profile-selector" ref={dropdownRef}>
            <button
              className="profile-selector-button"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <span>{currentProfile ? currentProfile.name : 'Select current profile...'}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

