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
        <div>
          <ul>
            {venues.map((venue) => (
              <li key={venue.id}>
                <strong>{venue.get("Name")}</strong> - {venue.get("GenrePreferred")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No venues found. Check back later!</p>
      )}
    </div>
  );
};

export default Venues;