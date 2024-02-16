import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthRequired = () => {
    const isLoggedIn = localStorage.getItem('token'); // Check if token exists in local storage
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRequired;
