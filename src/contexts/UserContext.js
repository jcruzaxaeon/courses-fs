////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\contexts\UserContext.js
//  ## Used by:
//  
//     ### Components
//     - UpdateCourse.js
//     - CreateCourse.js
//     - CourseDetail.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { arrayBufferToBase64 } from "../utils/cryptoUtils";
import ErrorMessageContext from "./ErrorMessageContext";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const nav = useNavigate();
    const cookie = Cookies.get('authData');
    const [authData, setAuthData] = useState(
        cookie
            ? JSON.parse(cookie)
            : null
    );
    const [fetchCourses, setFetchCourses] = useState(false);
    const secretKeyHex = process.env.REACT_APP_SECRET_KEY_HEX;
    const { addErrorMessage } = useContext(ErrorMessageContext);


    //
    //  SIGN IN
    const signIn = async (emailAddress, password) => {
        // Called By: 
        // 1. UserSignIn.js
        // 2. UserSignUp.js
        // `Basic Auth` requires "name:pass"
        // const encodedCredentials = btoa(`${username}:${password}`);

        // const fetchOptions = {
        //    method: 'GET',
        //    headers: { Authorization: `Basic ${encodedCredentials}` },
        // }
        //   const response = await api('/users', 'GET', null, credentials);

        // [!TODO] Add the "from" pattern for login to return user to previous page vs landing page

        try {
            const endpoint = `users`;
            const method = 'GET';
            const url = `http://localhost:5000/api/${endpoint}`;
            const options = {
                method,
                headers: {},
            };

            console.log(emailAddress, password);
            if (emailAddress && password) {
                const encodedCredentials = btoa(`${emailAddress}:${password}`);
                options.headers.Authorization = `Basic ${encodedCredentials}`;
            }


            const res = await fetch(url, options);
            // console.log("API URL: ", url, "DATA: ", data);
            // setCourseDetail(data);
            // Guard Clauses
            if (res.status === 200) {
                const data = await res.json();
                // console.log(data);
                const user = data;
                console.log(`SUCCESS! ${user.emailAddress} is now signed in!`);

                // Encryption
                const encoder = new TextEncoder();
                // const decoder = new TextDecoder();
                const secretKeyUint8 = new Uint8Array(
                    secretKeyHex.match(/.{2}/g)
                        .map(byte => parseInt(byte, 16))
                );
                const iv = window.crypto.getRandomValues(new Uint8Array(16));

                // console.log("Uint8 : ", secretKeyUint8);
                // console.log("Pass: ", password);

                let key = await window.crypto.subtle.importKey(
                    'raw',
                    secretKeyUint8,
                    { name: 'AES-GCM', length: 256 },
                    false,
                    ['encrypt', 'decrypt']
                );

                let encodedPass = encoder.encode(`${password}`);
                let cipherText = await window.crypto.subtle.encrypt(
                    { name: 'AES-GCM', iv: iv },
                    key,
                    encodedPass,
                );

                // console.log("Encoded Password: ", encodedPass);
                // console.log("Cipher Text: ", cipherText);

                // const decrypted = await window.crypto.subtle.decrypt(
                //     { name: 'AES-GCM', iv: iv },
                //     key,
                //     cipherText,
                // );

                // const plainPass = decoder.decode(decrypted);

                const cipherTextBase64 = arrayBufferToBase64(cipherText);
                const ivBase64 = arrayBufferToBase64(iv);

                const authDataPackage = { user, ivBase64, cipherTextBase64 };

                Cookies.set('authData', JSON.stringify(authDataPackage), { expires: 1/*day*/ });
                setAuthData(authDataPackage);

                return authDataPackage.user;
                // nav('/authenticated');
                // return;
            }
            if (res.status === 401) {
                console.log('Access Denied');
                // setErrors(['Access Denied']);
                return null;
            }
            if(!res.ok) {
                addErrorMessage(`HTTP Status Code: ${res.status}`);
                nav('/error');
                return;
            }
            ////////////////////////////////////////////////////////////////////////////////////////////
            // END signIn
        } catch (err) {
            console.log(err);
            // nav('/error',
            //     { state: { errors: ['1Network error occurred. Please try again later.', `${err}`] }, },
            // );
            addErrorMessage(`Error Code (UsCo-sI-01). Network error (${err}).`);
            nav('/error');
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //  SIGN OUT
    ////////////////////////////////////////////////////////////////////////////////////////////////
    const signOut = () => {
        //[!TODO] Reset welcom message state in top-banner
        setAuthData(null);
        // setPass(null);
        Cookies.remove('authData');
        // Cookies.remove('defaultTheme');
        nav('/');
    }

    return (
        <UserContext.Provider value={{
            authData,
            fetchCourses,
            actions: {
                signIn,
                signOut,
                setFetchCourses,
            },
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;