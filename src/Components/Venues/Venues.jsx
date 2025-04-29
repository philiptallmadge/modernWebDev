import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllVenues } from "../../Services/Venues.js";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
  
  return (
    <div>
      <h1>Venues</h1>
      <p>Discover venues for bands</p>
      
      {loading ? (
        <p>Loading venues...</p>
      ) : venues.length > 0 ? (
        <ul className="event-list">
          {venues.map((venue) => (
            <li key={venue.id} className="event-card">
              <h3 className="band-name">{venue.get("Name")}</h3>
              <p className="band-genre">{venue.get("GenrePreferred")}</p>
              <p className="venue-name">📍 Location: {venue.get("Location")}</p>
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