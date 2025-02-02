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
    <h2 className = "h2">Events Board</h2>
    <div className = "grid">
        <div className = "tile"><b className = "b">Event Name</b><br></br>
        <img src ="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" className = "img"/>
        📍 Location <br></br>
        📆 Date <br></br>
        👤 Organizer<br></br><hr className = "hr"></hr>
         Description</div>
        <div className = "tile">One</div>
        <div className = "tile">One</div>
        <div className = "tile">One</div>
        <div className = "tile">One</div>
    </div>
    </div>
  );
}

export default HomePage;