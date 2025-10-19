import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfiles, setEvents } from './store/store';
import { getProfiles, getEvents } from './api/api';
import Header from './components/Header';
import CreateEvent from './components/CreateEvent';
import EventsList from './components/EventsList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.app.currentProfile);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profilesData, eventsData] = await Promise.all([
        getProfiles(),
        getEvents()
      ]);
      dispatch(setProfiles(profilesData));
      dispatch(setEvents(eventsData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="main-content">
          <CreateEvent />
          <EventsList />
        </div>
      </div>
    </div>
  );
}

export default App;


