import React from "react";
import CustomMap from "./CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps";

import "../styles/HomePage.css";

function HomePage () {
  return (
    <div className="app">
      <APIProvider apiKey={process.env.AIzaSyBDlsV5eONJjKPPPiqe3F3tVaiD3WXcdQg}>
        <CustomMap />
      </APIProvider>
    </div>
  );
};

export default HomePage;