import React, { useState } from "react";
import CustomMap from "./CustomMap";
import Navbar from "./NavigationBar";
import FilterTags from './FilterTags';
import { APIProvider } from "@vis.gl/react-google-maps"; // Correctly using APIProvider
import "../styles/HomePage.css";

function HomePage() {
  const allTags = ["Pride", "Music", "Diversity", "Sustainability", "LGBTQ+ Networking", "Eco-Conscious", "Free", "Other"];
  const [selectedTags, setSelectedTags] = useState([]); // Make sure this is initialized as an empty array

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
      <Navbar className="navbar"></Navbar>
      
      <div className="search-bar">
        <p>search</p>
      </div>

      <div className="app">
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <CustomMap />
        </APIProvider>

        <div className="filter-container">
          <FilterTags
            filterList={allTags} // Pass the list of all tags
            selectedTags={selectedTags} // Pass the selectedTags state
            onTagSelect={toggleTagSelection} // Pass the function to toggle tags
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
