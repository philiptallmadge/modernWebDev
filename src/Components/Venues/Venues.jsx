// Import necessary dependencies and services
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllVenues } from "../../Services/Venues.js";

const Venues = () => {
  // state management for venues and loading status
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // fetch venues data 
  useEffect(() => {
    getAllVenues()
      .then((results) => {
        setVenues(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
        setLoading(false);
      });
  }, []);

  // helper function to format location because the location field in venues is a geopoint obj and cant be directly rendered
  const formatLocation = (location) => {
    if (!location) return "Location not specified";
    if (typeof location === 'string') return location;
    if (location._latitude && location._longitude) {
      return `${location._latitude.toFixed(4)}, ${location._longitude.toFixed(4)}`;
    }
    return "Location not specified";
  };
  
  return (
    <div>
      <h1>Venues</h1>
      <p>Discover venues for bands</p>
      
      {loading ? (
        <p>Loading venues...</p>
      ) : venues.length > 0 ? (
        //Display venues in a grid layout using event-list & event-card classes
        <ul className="event-list">
          {venues.map((venue) => (
            <li key={venue.id} className="event-card">
              <h3 className="band-name">{venue.get("Name")}</h3>
              <p className="band-genre">{venue.get("GenrePreferred")}</p>
              <p className="venue-name">📍 Location: {formatLocation(venue.get("Location"))}</p>
              <p className="event-time">🎵 Preferred Genre: {venue.get("GenrePreferred")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues found. Check back later!</p>
      )}
    </div>
  );
};

export default Venues;