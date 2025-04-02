import React from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

const MainList = () => {
    const user = Parse.User.current();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        Parse.User.logOut().then(() => {
            // Navigate back to auth page after logout
            navigate("/auth");
        }).catch((error) => {
            console.error("Error logging out: ", error);
        });
    };
    
    return (
        <div>
            <hr />
            <p>Hello {user?.get("username")}</p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default MainList;