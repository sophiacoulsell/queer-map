import React, { useState, useEffect } from "react";
import CustomMap from "./CustomMap";
import Navbar from "./NavigationBar";
import FilterTags from './FilterTags';
import { APIProvider } from "@vis.gl/react-google-maps"; // Correctly using APIProvider
import "../styles/HomePage.css";

function geocodeAddress(address) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        const lat = location.lat;
        const lng = location.lng;
        console.log('Latitude:', lat, 'Longitude:', lng);
        getPlacePhotos(lat, lng);  // Call next step to search for photos
      } else {
        console.error('Geocode error:', data.status);
      }
    })
    .catch(error => console.error('Error:', error));
}

function getPlacePhotos(lat, lng) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&key=${apiKey}`;

  fetch(placeSearchUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        console.log('Place:', place.name);
        if (place.photos && place.photos.length > 0) {
          const photoReference = place.photos[0].photo_reference;
          console.log('Photo Reference:', photoReference);
          fetchPlacePhoto(photoReference);  // Call the next step to get the photo
        }
      } else {
        console.log('No places found.');
      }
    })
    .catch(error => console.error('Error:', error));
}
function fetchPlacePhoto(photoReference) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

  const img = document.createElement('img');  // Create an image element
  img.src = photoUrl;  // Set the photo URL as the image source
  document.body.appendChild(img);  // Append the image to the body or any other container
}

function HomePage() {
  const allTags = ["Pride", "Music", "Diversity", "Sustainability", "LGBTQ+ Networking", "Eco-Conscious", "Free", "Other"];
  const [selectedTags, setSelectedTags] = useState([]); // Make sure this is initialized as an empty array
  const [events, setEvents] = useState([]); // State to store events data

  // Fetch events from the Flask API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.1:5000/get_events");
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
    <p>No events available</p> // Display message if no events are fetched
  ) : (
    events.map((event) => (
      <div className="tile" key={event._id}>
        <b className="b">{event.name}</b>
        <br />
        <img 
          src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg"
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
    ))
  )}
</div>
    </div>
  );
}

export default HomePage;
