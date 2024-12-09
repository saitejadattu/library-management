import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

import React from 'react'

const ProtechtedRoute = () => {
    const jwtToken = Cookies.get("jwtToken")
    return jwtToken ? <Outlet /> : <Navigate to="/login" />
}

export default ProtechtedRoute