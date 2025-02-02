import React from "react";
import CustomMap from "./CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps"; // Correctly using APIProvider

import "../styles/HomePage.css";

function HomePage() {
  console.log(process.env.REACT_APP_TEST_VARIABLE);

  return (
    

    <div className="app">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <CustomMap />
      </APIProvider>
    </div>
  );
}

export default HomePage;