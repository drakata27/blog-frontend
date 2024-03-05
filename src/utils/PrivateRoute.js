/* eslint-disable no-unused-vars */
import {Route, Routes, Navigate, Outlet} from 'react-router-dom'
import {Children, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    
    return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute