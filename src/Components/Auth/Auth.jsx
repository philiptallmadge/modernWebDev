import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";
import { getCurrentUser } from "../../Services/Auth.js";
import { getById } from "../../Services/Bands.js";
import { getById as getVenueById } from "../../Services/Venues.js";

const AuthModule = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user and fetch their band/venue info
  useEffect(() => {
    const checkUserAndFetchInfo = async () => {
      if (checkUser()) {
        try {
          const currentUser = getCurrentUser();
          const userType = currentUser.get("userType");
          let entityInfo = null;

          if (userType === "band") {
            const bandPointer = currentUser.get("band_pointer");
            if (bandPointer) {
              const band = await getById(bandPointer.id);
              entityInfo = {
                type: "Band",
                name: band.get("BandName"),
                genre: band.get("Genre")
              };
            }
          } else if (userType === "venue") {
            const venuePointer = currentUser.get("venue_pointer");
            if (venuePointer) {
              const venue = await getVenueById(venuePointer.id);
              entityInfo = {
                type: "Venue",
                name: venue.get("Name"),
                location: venue.get("Address")
              };
            }
          }

          setUserInfo({
            username: currentUser.get("username"),
            userType,
            entityInfo
          });
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      setLoading(false);
    };

    checkUserAndFetchInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userInfo) {
    return (
      <div className="auth-container">
        <h2>Welcome, {userInfo.username}!</h2>
        {userInfo.entityInfo && (
          <div className="user-info">
            <h3>Your {userInfo.entityInfo.type}:</h3>
            <p>Name: {userInfo.entityInfo.name}</p>
            {userInfo.entityInfo.genre && <p>Genre: {userInfo.entityInfo.genre}</p>}
            {userInfo.entityInfo.location && <p>Location: {userInfo.entityInfo.location}</p>}
          </div>
        )}
        <div className="auth-buttons">
          <Link to="/register">
            <button className="auth-button">Register</button>
          </Link>
          <Link to="/login">
            <button className="auth-button">Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Welcome to BandConnect</h2>
      <p>Please choose an option:</p>
      <div className="auth-buttons">
        <Link to="/register">
          <button className="auth-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="auth-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthModule;
