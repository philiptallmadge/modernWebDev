import React from "react";
import Parse from "parse";

const MainList = () => {
    const user = Parse.User.current(); //get the current logged-in user
    
    return (
        <div>
            <hr />
            <p> Hello {user?.get("username")} </p>
        </div>
    );
};

export default MainList;