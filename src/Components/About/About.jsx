import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <section>
      <h1>About</h1>
      <p>LeBron is the Goat, idk.</p>
      
      <div style={{ marginTop: "20px" }}>
        {/* Button with programmatic navigation */}
        <button onClick={() => navigate("/")}>
          Return to Home
        </button>
        
        {/* Link to shared page */}
        <p>
          Go to <Link to="/shared">Shared</Link>
        </p>
      </div>
    </section>
  );
};

export default About;