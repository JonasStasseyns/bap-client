import React from 'react'
import Login from "../pages/auth/Login";

const Redirect = (props) => <Login destination={window.location.pathname} />
export default Redirect
