import React from "react"
import { Outlet, Navigate } from "react-router-dom"

const AuthRequired = () => {
    const isLoggedIn = true
    return isLoggedIn ? <Outlet/> : <Navigate to = "/login"/>
}
 export default AuthRequired


