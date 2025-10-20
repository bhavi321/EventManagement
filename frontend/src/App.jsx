import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfiles, setEvents } from './store/store';
import { getProfiles, getEvents } from './api/api';
import Header from './components/Header';
import CreateEvent from './components/CreateEvent';
import EventsList from './components/EventsList';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <CreateEvent onEventCreated={loadData} />
          <EventsList currentProfile={currentProfile} onEventUpdated={loadData} />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}

export default App;


