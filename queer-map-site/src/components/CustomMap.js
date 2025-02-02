import React, { useState, useEffect } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import "../styles/HomePage.css";

// If the image is in the public folder
import loadingImage from "../media/rainbowloading.gif";  // Adjust the path as needed

function CustomMap() {
  const [location, setLocation] = useState({
    lat: 51.509865,  // Default location (London)
    lng: -0.118092,  // Default location (London)
  });

  const [mapCenter, setMapCenter] = useState(location);
  const [loading, setLoading] = useState(true);  // Track loading state

  // Get the current geolocation when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = {
            lat: latitude,
            lng: longitude,
          };
          setLocation(newLocation);
          setMapCenter(newLocation);  // Update the map center with the user's location
          setLoading(false);  // Mark loading as false after location is fetched
        },
        () => {
          console.error("Geolocation error");
          setLoading(false);  // Still mark as done even if there's an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);  // Mark as done if geolocation is not supported
    }
  }, []);  // Empty dependency array to run only once when the component mounts

  // If still loading, show a loading image
  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingImage} alt="Loading..." className="loading-image" />
      </div>
    );
  }

  return (
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        zoom={13}
        center={mapCenter}  // Center the map based on the marker's location
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={location} />
      </Map>
    </div>
  );
}

export default CustomMap;
