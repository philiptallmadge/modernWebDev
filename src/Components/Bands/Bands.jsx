import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBands } from "../../Services/Bands.js";

const Bands = () => {
  const [bands, setBands] = useState([]);
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
          <ul>
            {bands.map((band) => (
              <li key={band.id}>
                <strong>{band.get("BandName")}</strong> - {band.get("Genre")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bands found. Check back later!</p>
      )}
      
      <div style={{ marginTop: "20px" }}>
        <Link to="/venues">Check out venues</Link>
      </div>
    </div>
  );
};

export default Bands;