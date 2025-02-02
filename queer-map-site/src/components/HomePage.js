import React, { useState } from "react";
import CustomMap from "./CustomMap";
import Navbar from "./NavigationBar";
import FilterTags from './FilterTags';
import { APIProvider } from "@vis.gl/react-google-maps"; // Correctly using APIProvider
import "../styles/HomePage.css";

function HomePage() {
  const allTags = ["Pride", "Music", "Diversity", "Sustainability", "LGBTQ+ Networking", "Eco-Conscious", "Free", "Other"];
  const [selectedTags, setSelectedTags] = useState([]); // Make sure this is initialized as an empty array
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTagSelection = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter(t => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  return (
    <div>
      <div className="home-page">
      <Navbar className="navbar"></Navbar>
      
      <div className="search-bar">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Save input value
            className="search-input"
          />
        </div>

      <div className="app">
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <CustomMap />
        </APIProvider>

        <div className="filter-container">
          <div classname = "filters-h">
           <p>Event filters: </p>
          </div>
          <FilterTags
            filterList={allTags} 
            selectedTags={selectedTags} 
            onTagSelect={toggleTagSelection}
          />
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
    </div>
  );
}

export default HomePage;
