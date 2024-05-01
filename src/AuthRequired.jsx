import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const AuthRequired = ({}) => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   logout();
  // }, [isTokenValid,!isLoggedIn && !expirationTime]);
  const logout = () => {
    // Remove token and expiration time from local storage
    // navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    return <Navigate to="/login"/>
  };
  const isLoggedIn = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (isLoggedIn && expirationTime) {
    // Check if the token has expired
    const isTokenValid = new Date().getTime() < expirationTime;
    if (!isTokenValid) {
      // Token has expired, delete it
      logout();
    } else {
      // console.log(isLoggedIn);
      return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    }
  } else {
    // logout();
    return <Navigate to="/login"/>
  }
};

export default AuthRequired;
