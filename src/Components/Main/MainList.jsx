import React from "react";

const MainList = () => {
    return (
        <div>
            <hr />
            <p> Hello {user?.get("username")} </p>
        </div>
    );
};

export default MainList;