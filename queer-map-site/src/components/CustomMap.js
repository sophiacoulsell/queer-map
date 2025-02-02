import React, { useState, useEffect } from "react";
import { Map, Marker} from "@vis.gl/react-google-maps";
import "../styles/HomePage.css";
import loadingImage from "../media/rainbowloading.gif";  // Adjust the path as needed
import userLocationIcon from "../media/user-location-icon.png";  // Import the custom icon

function CustomMap() {
  const [location, setLocation] = useState({
    lat: 34.0721388,  // Default location (UCLA)
    lng: -118.4498274,  // Default location (UCLA)
  });

  const [mapCenter, setMapCenter] = useState(location);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [markers, setMarkers] = useState([]);  // State to hold markers

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

  // Fetch markers from the Flask backend and pass the current latitude and longitude
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/places?latitude=${location.lat}&longitude=${location.lng}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });  // Adjust the URL as needed
        const data = await response.json();
        console.log(data);
        const filteredData = data.map((location) => ({
          lat: location.lat,
          lng: location.lng,
        }));
        console.log(location.lat, location.lng);
        setMarkers(filteredData);  // Use the filtered data with only lat and lng
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchMarkers();
  }, [location]);  // Add location as a dependency to refetch markers when location changes

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
        zoom={11}  // Adjusted zoom level to zoom out
        center={mapCenter}  // Center the map based on the marker's location
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker 
          position={location} 
          icon={{
            url: userLocationIcon,
            scaledSize: new window.google.maps.Size(30, 30),  // Adjust the size as needed
          }}  // Use the custom icon for the user's location
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </Map>
    </div>
  );
}

export default CustomMap;
