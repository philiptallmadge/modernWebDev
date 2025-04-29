import React from "react";
import { Link } from "react-router-dom";


//landing page
const Home = () => {
  return (
    <div>
      <h1>Welcome to our Band & Venues Manager</h1>
      <p>Explore the bands and venues registered on our service, or view calendar events below!</p>
      
      <div style={{ marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center"}}>
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px"}}>
          <h2>Bands</h2>
          <p>Browse our collection of bands</p>
          <Link to="/bands">View Bands</Link>
        </div>
        
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
          <h2>Venues</h2>
          <p>Explore available venues</p>
          <Link to="/venues">View Venues</Link>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
          <h2>Calendar</h2>
          <p>Explore Calendar</p>
          <Link to="/calendar">View Calendar</Link>
        </div>
      </div>
    </div>
  );
};

export default Home; //exporting home to use in routing- same in other components