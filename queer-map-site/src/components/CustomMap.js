import React, { useState, useEffect } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import "../styles/HomePage.css";

function CustomMap() {
  const [location, setLocation] = useState({
    lat: 51.509865,  // Default location (London)
    lng: -0.118092,  // Default location (London)
  });

  const [mapCenter, setMapCenter] = useState(location);


  // Get the current geolocation when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = ({
            lat: latitude,
            lng: longitude,
          });
          setLocation(newLocation);
          setMapCenter(newLocation);  // Update the map center with the user's location
        },
        () => {
          console.error("Geolocation error");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);  // Empty dependency array to run only once when the component mounts

  return (
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={mapCenter}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={location} />
      </Map>
    </div>
  );
}

export default CustomMap;
