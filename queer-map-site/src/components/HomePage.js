import React from "react";
import CustomMap from "./CustomMap";
import Navbar from "./NavigationBar"
import { APIProvider } from "@vis.gl/react-google-maps"; // Correctly using APIProvider

import "../styles/HomePage.css";

function HomePage() {
  console.log(process.env.REACT_APP_TEST_VARIABLE);

  return (
    
    <div>
      <Navbar></Navbar>

      <div className="search-bar">
        <p>search</p>
      </div>
    <div className="app">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <CustomMap/>
      </APIProvider>

      <div className="filter-container">
        <p>filters</p>
    </div>
    </div>
    </div>
  );
}

export default HomePage;