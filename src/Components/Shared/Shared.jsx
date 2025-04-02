import React from "react";
import { Link, useNavigate } from "react-router-dom";


//shared used for navbar
const Shared = () => {
  const navigate = useNavigate(); //useNavigate allows programmatic navigation
  return (
    <div className="navbar">
        <ul >
          <li className="navlinks"><Link to="/"> Home </Link></li>
          <li className="navlinks"><Link to="/about"> About </Link></li>
          <li className="navlinks"><Link to="/bands"> Bands </Link></li>
          <li className="navlinks"><Link to="/venues"> Venues </Link></li>
          <li className="navlinks"><Link to="/loggedIn"> User </Link></li>
        </ul>
    </div>
  );
};

export default Shared;