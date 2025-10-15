// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import Location from './pages/Location';
import History from './pages/History';
import ParkingSlip from './pages/ParkingSlip';
import Services from './pages/Services';
import Contact from './components/Contact';
import Chatbot from "./components/Chatbot";
import Feedback from "./components/Feedback";


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/location" element={<Location />} />
          <Route path="/history" element={<History />} />
          <Route path="/form" element={<ParkingSlip />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
        {/* Chatbot outside the route so it shows on all pages */}
        <Chatbot />
      </>
    </Router>
  );
}

export default App;
