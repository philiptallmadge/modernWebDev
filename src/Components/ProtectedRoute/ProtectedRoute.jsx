import React from "react";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../Auth/AuthService";

const ProtectedRoute = ({ element: Component, ... rest }) => {
    console.log("element: ", Component);
    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate("/auth");
    };
    if (checkUser()) {
        return <Component />;
    }
    else {
        console.log("Not logged in");
        return goBackHandler();
    }
};
export default ProtectedRoute;
