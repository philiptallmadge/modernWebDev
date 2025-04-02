import React from "react";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../Auth/AuthService";
import {useEffect} from "react";

const ProtectedRoute = ({ element: Component, ... rest }) => {
    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate("/auth");
    };
    useEffect(() => {
        if (!checkUser()) {
            console.log("Not logged in");
            navigate("/auth");
            return;
        }}
    , [navigate]);
    return <Component />;
};
export default ProtectedRoute;
