//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TouristProfile from './TouristProfile'; // Adjust path if necessary
import SearchPageHeader from './SearchPageHeader';
import SiteSearchPage from './SiteSearchPage'; // Your search components
import ActivitySearchPage from './ActivitySearchPage';
import ItinerarySearchPage from './ItinerarySearchPage';
import UpcomingActivities from './UpcomingActivities';
import UpcomingItineraries from './UpcomingItineraries';
import CompletedItineraries from './components/CompletedItineraries'; //added in sprint 2
import CompletedActivities from './components/CompletedActivities'; //added in sprint 2
import FlightBooking from './components/FlightBooking.jsx';
import HotelBooking from './components/HotelBooking.jsx';
import EventActivityItineraryBooking from './components/EventActivityItineraryBooking.jsx';

function App() {
  return (
    <Router>
      <div>
       <Routes>
        <Route path="/" element={<TouristProfile/>} /> 
        <Route path="/SearchPageHeader" element={<SearchPageHeader/>} />
        <Route path="/SiteSearchPage" element={<SiteSearchPage/>} />
        <Route path="/ActivitySearchPage" element={<ActivitySearchPage/>} />
        <Route path="/ItinerarySearchPage" element={<ItinerarySearchPage/>} />
        <Route path="/UpcomingActivities" element={<UpcomingActivities/>} />
        <Route path="/UpcomingItineraries" element={<UpcomingItineraries/>} />
        <Route path="/CompletedItineraries" element={<CompletedItineraries />} />  
        <Route path="/CompletedActivities" element={<CompletedActivities />} />
        <Route path="/FlightBooking" element={<FlightBooking/>} />
        <Route path="/HotelBooking" element={<HotelBooking/>} />
        <Route path="/EventActivityItineraryBooking" element={<EventActivityItineraryBooking/>} />
       </Routes>
     </div>
    </Router>
  );
}

export default App;
