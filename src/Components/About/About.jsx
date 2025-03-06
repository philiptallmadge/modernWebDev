import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <section>
      <h1>About</h1>
      <p>LeBron is the Goat, idk.</p>
    </section>
  );
};

export default About;