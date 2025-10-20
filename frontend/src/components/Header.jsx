import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProfile, addProfile, updateProfile } from '../store/store';
import { toast } from 'react-toastify';
import { createProfile, updateProfileTimezone } from '../api/api';
import { TIMEZONES, getTimezoneLabel } from '../utils/timezones';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.app.currentProfile);
  const profiles = useSelector((state) => state.app.profiles);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileTimezone, setNewProfileTimezone] = useState('America/New_York');
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
        setShowAddProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddProfile = async (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    try {
      const profile = await createProfile(newProfileName, newProfileTimezone);
      dispatch(addProfile(profile));
      setNewProfileName('');
      setNewProfileTimezone('America/New_York');
      setShowAddProfile(false);
      setShowProfileDropdown(false);
      dispatch(setCurrentProfile(profile));
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile');
    }
  };

  const handleSelectProfile = (profile) => {
    dispatch(setCurrentProfile(profile));
    setShowProfileDropdown(false);
  };

  const filteredProfiles = profiles.filter(p =>
    p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-search">
                  <input
                    type="text"
                    placeholder="Search current profile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                {showAddProfile ? (
                  <div className="add-profile-form">
                    <input
                      type="text"
                      placeholder="Profile name"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="profile-input"
                      autoFocus
                    />
                    <select
                      value={newProfileTimezone}
                      onChange={(e) => setNewProfileTimezone(e.target.value)}
                      className="profile-select"
                    >
                      {TIMEZONES.map(tz => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                      ))}
                    </select>
                    <div className="form-actions">
                      <button
                        onClick={() => {
                          setShowAddProfile(false);
                          setNewProfileName('');
                        }}
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                      <button onClick={handleAddProfile} className="btn-add">
                        Add
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="profile-list">
                      {filteredProfiles.map(profile => (
                        <div
                          key={profile._id}
                          className={`profile-item ${currentProfile?._id === profile._id ? 'active' : ''}`}
                          onClick={() => handleSelectProfile(profile)}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{profile.name}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn-add-profile"
                      onClick={() => setShowAddProfile(true)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Add Profile
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

