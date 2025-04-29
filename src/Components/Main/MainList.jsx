import React, { useEffect, useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import { getById } from "../../Services/Bands.js";
import { getById as getVenueById } from "../../Services/Venues.js";

const MainList = () => {
    // state to store user and their band/venue info
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // fetch user's band/venue info when mounted
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = Parse.User.current();
                if (!user) {
                    navigate("/auth");
                    return;
                }

                const userType = user.get("userType");
                let entityInfo = null;

                // fetch band/venue info based on user type
                if (userType === "band") {
                    const bandPointer = user.get("band_pointer");
                    if (bandPointer) {
                        const band = await getById(bandPointer.id);
                        entityInfo = {
                            type: "Band",
                            name: band.get("BandName"),
                            genre: band.get("Genre")
                        };
                    }
                } else if (userType === "venue") {
                    const venuePointer = user.get("venue_pointer");
                    if (venuePointer) {
                        const venue = await getVenueById(venuePointer.id);
                        entityInfo = {
                            type: "Venue",
                            name: venue.get("Name"),
                            location: venue.get("Address")
                        };
                    }
                }

                // Store all user info  in state
                setUserInfo({
                    username: user.get("username"),
                    userType,
                    entityInfo
                });
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);
    
    // handle user logout
    const handleLogout = () => {
        Parse.User.logOut().then(() => {
            navigate("/auth");
        }).catch((error) => {
            console.error("Error logging out: ", error);
        });
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    // display user info and their band/venue details
    return (
        <div className="main-list-container">
            <h2>Welcome, {userInfo?.username}!</h2>
            {userInfo?.entityInfo && (
                <div className="user-info">
                    <h3>Your {userInfo.entityInfo.type}:</h3>
                    <p>Name: {userInfo.entityInfo.name}</p>
                    {userInfo.entityInfo.genre && <p>Genre: {userInfo.entityInfo.genre}</p>}
                    {userInfo.entityInfo.location && <p>Location: {userInfo.entityInfo.location}</p>}
                </div>
            )}
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default MainList;