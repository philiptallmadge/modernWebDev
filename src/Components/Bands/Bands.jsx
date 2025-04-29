import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBands } from "../../Services/Bands.js";

//display a list of bands
const Bands = () => {
  //state to store list of bands
  const [bands, setBands] = useState([]);
  //state to manage loading status
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getAllBands()
      .then((results) => {
        setBands(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bands:", error);
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      <h1>Bands</h1>
      <p>Browse through our bands</p>
      
      {loading ? (
        <p>Loading bands...</p>
      ) : bands.length > 0 ? (
        <div>
          <ul className="event-list">
            {bands.map((band) => (
              <li key={band.id} className="event-card">
                <strong>{band.get("BandName")}</strong> - {band.get("Genre")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bands found. Check back later!</p>
      )}
    </div>
  );
};

export default Bands;