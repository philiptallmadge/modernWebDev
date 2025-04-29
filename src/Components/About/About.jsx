import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <section>
      <h1>About us</h1>
      <p> This project solves issues available bands and venues have of finding each other. Moreover, it can be used by customers to find where their favorite band is playing, or find new places to visit. </p>
      <br />
      <br />
      <br />
      <br />
      <p> Created by Philip Tallmadge and Cesar DeLeon </p>
    </section>
  );
};

export default About;