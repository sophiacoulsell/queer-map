import React, { useState, useEffect } from "react";
import CustomMap from "./CustomMap";
import Navbar from "./NavigationBar";
import FilterTags from './FilterTags';
import { APIProvider } from "@vis.gl/react-google-maps"; // Correctly using APIProvider
import "../styles/HomePage.css";

function HomePage() {
  const allTags = ["Pride", "Music", "Diversity", "Sustainability", "LGBTQ+ Networking", "Eco-Conscious", "Free", "Other"];
  const [selectedTags, setSelectedTags] = useState([]); // Make sure this is initialized as an empty array
  const [events, setEvents] = useState([]); // State to store events data

  const getPlacePhotoUrl = (photoReference) => {
    console.log("photoReference", photoReference);
    const baseUrl = "https://maps.googleapis.com/maps/api/place/photo";
    const maxWidth = 400; // Adjust the max width as needed
    const apiKey = 'AIzaSyBT1ESbcowGmDSAir-C5_TkLQxE3aeog1s';
    return `${baseUrl}?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
  };

  // Fetch events from the Flask API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setEvents(data); // Set the fetched events data in state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once when the component is mounted

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
          <p>Filter by: </p>
          <FilterTags
            filterList={allTags} 
            selectedTags={selectedTags} 
            onTagSelect={toggleTagSelection}
          />
        </div>
      </div>

      <h2 className="h2">Events Board</h2>

      <div className="grid">
      {events.length === 0 ? (
  <p>No events available</p>
) : (
  events.map((event) => {
    const photoUrl = event.photo_reference 
      ? getPlacePhotoUrl(event.photo_reference) 
      : "https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg";

    return (
      <div className="tile" key={event._id}>
        <b className="b">{event.name}</b>
        <br />
        
        {/* Display event image dynamically */}
        <img 
          src={photoUrl}
          className="img"
          alt={event.name}
        />
        
        {/* Render location details individually */}
        📍 {event.location ? event.location.address1 : "Unknown location"} <br />
        📆 {event.date} <br />
        👤 {event.organizer} <br />
        <hr className="hr" />
        {event.description}
      </div>
    );
  })
)}
</div>

    </div>
  );
}

export default HomePage;
