import React from "react";
import { Link, useNavigate } from "react-router-dom";


//shared used for navbar
const Shared = () => {
  const navigate = useNavigate(); //useNavigate allows programmatic navigation
  return (
    <div class="navbar">
        <ul>
          <li class="navlinks"><Link to="/"> Home </Link></li>
          <li class="navlinks"><Link to="/about"> About </Link></li>
          <li class="navlinks"><Link to="/bands"> Bands </Link></li>
          <li class="navlinks"><Link to="/venues"> Venues </Link></li>
        </ul>
    </div>
  );
};

export default Shared;