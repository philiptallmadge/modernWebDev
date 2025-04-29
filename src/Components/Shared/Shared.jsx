import React from "react";
import { Link, useNavigate } from "react-router-dom";


//shared used for navbar
const Shared = () => {
  const navigate = useNavigate(); //useNavigate allows programmatic navigation
  return (
    <div className="navbar">
        <ul >
          <li><Link className="navlinks" to="/"> Home </Link></li>
          <li><Link className="navlinks" to="/bands"> Bands </Link></li>
          <li><Link className="navlinks" to="/venues"> Venues </Link></li>
          <li><Link className="navlinks" to="/calendar"> Calendar </Link></li>
          <li><Link className="navlinks" to="/loggedIn"> User </Link></li>
          <li><Link className="navlinks" to="/about"> About </Link></li>
        </ul>
    </div>
  );
};

export default Shared;