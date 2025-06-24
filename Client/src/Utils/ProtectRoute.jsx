import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
    const token = localStorage.getItem('token');

     if (import.meta.env.DEV) {
    return children;
  }

    return token ? children : <Navigate to="/" replace />
}

export default ProtectRoute