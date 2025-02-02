import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import Event from "./components/Event";
import ChatBox from "./components/Chatbox";  // Adjust if the path is incorrect


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<WelcomePage />} /> {/* Welcome page route */}
            <Route path="/home" element={<HomePage />} /> {/* Home page route */}
            <Route path="/event" element={<Event />} /> {/* Event route */}
          </Routes>
        </div>
        <div className="chatbox-container">
          <ChatBox />
        </div>
      </Router>
  );
}

export default App;
