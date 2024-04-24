////////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\PrivateRoute.js
////////////////////////////////////////////////////////////////////////////////////////////////////
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const { authData } = useContext(UserContext);
    const location = useLocation();
    console.log("Private Route: ", authData);

    if(authData) return <Outlet />
    return <Navigate replace to='signin' state={{from: location.pathname}} />
}

export default PrivateRoute;