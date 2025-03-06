import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Shared = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h1>Shared</h1>
      <p>LeBron is the Goat.</p>
      
      <div style={{ marginTop: "20px" }}>
        {/* Button to go back home */}
        <button onClick={() => navigate("/")}>
          Return to Home
        </button>
        <p>
          Go to
          <Link to="/about" style={{ marginLeft: "10px" }}>About</Link>
        </p>
      </div>
    </section>
  );
};

export default Shared;