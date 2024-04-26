/////
//  client\src\components\PrivateRoute.js
/////
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getPassword } from "../utils/cryptoUtils";

const PrivateRoute = () => {
    const { authData, actions } = useContext(UserContext);
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        if (!authData) { setAuthenticated(false); return; }
        if (authenticated === null) {
            (async () => {
                const pass = await getPassword();

                const user = await actions.signIn(authData.user.emailAddress, pass);

                if (user) setAuthenticated(true);
                else setAuthenticated(false);
                // Test for race-condition
                // setTimeout(async () => {
                //     if (user) setAuthenticated(true);
                //     else setAuthenticated(false);
                // }, 5000);
            })();
        }
        // [!TRY] eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]); // Infinite Loop = [authData, actions] || [authData]

    console.log("authenticated: ", authenticated);
    if (authenticated === true) return <Outlet />;
    if (authenticated === false) return <Navigate replace to='signin' state={{ from: location.pathname }} />;
    return <p>Loading...</p>
}

export default PrivateRoute;