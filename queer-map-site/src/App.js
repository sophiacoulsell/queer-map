import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {APIProvider} from '@vis.gl/react-google-maps';

import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import CustomMap from "./components/CustomMap";
import Event from "./components/Event";

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<WelcomePage />} /> {/* Welcome page route */}
            <Route path="/HomePage" element={<HomePage />} /> {/* Home page route */}
            <Route path="/event" element={<Event />} /> {/* Event route */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
