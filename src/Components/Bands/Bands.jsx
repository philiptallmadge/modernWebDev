import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBands } from "../../Services/Bands.js";

//display a list of bands
const Bands = () => {
  //state to store list of bands
  const [bands, setBands] = useState([]);
  //state to manage loading status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchBands = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await getAllBands();
      console.log("Fetched bands:", results);
      setBands(results);
    } catch (error) {
      console.error("Error fetching bands:", error);
      setError("Failed to load bands. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBands();
  }, []);
  
  return (
    <div>
      <h1>Bands</h1>
      <p>Browse through our bands</p>
      
      {loading ? (
        <p>Loading bands...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : bands.length > 0 ? (
        <ul className="event-list">
          {bands.map((band) => (
            <li key={band.id} className="event-card">
              <h3 className="band-name">{band.get("BandName")}</h3>
              <p className="band-genre">{band.get("Genre")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bands found. Check back later!</p>
      )}
    </div>
  );
};

export default Bands;