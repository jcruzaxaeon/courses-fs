////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\contexts\UserContext.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
// import { api } from '../utils/apiHelper.js';

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const nav = useNavigate();
    const cookie = Cookies.get('authenticatedUser');
    const [authUser, setAuthUser] = useState(
        cookie
            ? JSON.parse(cookie)
            : null
    );

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //  SIGN IN
    /////////////////////////////////////////////////////////////////////////////////////////////////
    const signIn = async (credentials) => {
        // Called By: UserSignIn.js
        // `Basic Auth` requires "name:pass"
        // const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

        // const fetchOptions = {
        //    method: 'GET',
        //    headers: { Authorization: `Basic ${encodedCredentials}` },
        // }
        //   const response = await api('/users', 'GET', null, credentials);

        const endpoint = `users`;
        const method = 'GET';
        const url = `http://localhost:5000/api/${endpoint}`;
        const options = {
            method,
            headers: {},
        };

        if (credentials) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers.Authorization = `Basic ${encodedCredentials}`;
        }

        const response = await fetch(url, options);
        const data = await response.json();
        // console.log("API URL: ", url, "DATA: ", data);
        // setCourseDetail(data);
        // Guard Clauses
        if (response.status === 200) {
            console.log(data);
            const user = data;
            console.log(`SUCCESS! ${user.username} is now signed in!`);
            setAuthUser(user);
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1/*day*/ });
            return user;
            // nav('/authenticated');
            // return;
        }
        if (response.status === 401) { 
            console.log('Access Denied');
            // setErrors(['Access Denied']);
            return null; 
        }
        throw new Error();
        ////////////////////////////////////////////////////////////////////////////////////////////
        // END signIn
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //  SIGN OUT
    ////////////////////////////////////////////////////////////////////////////////////////////////
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authenticatedUser');
        // Cookies.remove('defaultTheme');
        nav('/');
    }

    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut,
            },
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;