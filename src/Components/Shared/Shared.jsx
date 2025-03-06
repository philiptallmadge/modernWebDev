import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Shared = () => {
  const navigate = useNavigate();
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