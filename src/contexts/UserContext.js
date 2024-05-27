

//  src\contexts\UserContext.js

import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { arrayBufferToBase64 } from "../utils/cryptoUtils";
import ErrorMessageContext from "./ErrorMessageContext";

/**
 * ## `UserContext`
 * Provides global user-related variables and methods
 * - Module implemented as a Context-Object
 * 
 * ### Used-By Components
 * - `UpdateCourse`
 * - `CreateCourse`
 * - `CourseDetail`
 * 
 * ### `.authData`
 * - Sub notes
 * 
 * @module UserContext
 * @type React.Context<{
 *      authData: {
 *          user: {
 *              id: number,
 *              firstName: string,
 *              lastName: string,
 *              emailAddress: string,
 *          },
 *          cipherTextBase64: string,
 *          ivBase64: string,
 *      },
 *      actions: {
 *          signIn: function,
 *          signOut: function,
 *      },
 * }>
 * @property {Object} authData
 * @property {integer} authData.user.id
 * @property {string} authData.user.firstName
 * @property {string} authData.user.lastName
 * @property {string} authData.user.emailAddress
 * @property {string} authData.cipherTextBase64
 * @property {string} authData.ivBase64
 * @property {Object} actions
 * @property {Function} actions.signIn
 * @property {Function} actions.signOut
 * @Context
 */
const UserContext = createContext(null);

/**
 * ## `UserProvider` 
 * Wraps the app to provide `UserContext`
 * @param {Object} props
 * @returns {JSX.Element} Provider wrapper
 * @ReactComponent
 */
export const UserProvider = (props) => {
    const nav = useNavigate();
    const cookie = Cookies.get('authData');
    const [authData, setAuthData] = useState(
        cookie
            ? JSON.parse(cookie)
            : null
    );
    // [!TODO] Test if fetchCourse toggle for update is needed here
    // Flag for re-rendering main-page
    // - Used in `Courses` useEffect()-dependency array
    // const [fetchCourses, setFetchCourses] = useState(false);

    // Import "Secret Key"
    const secretKeyHex = process.env.REACT_APP_SECRET_KEY_HEX;
    const { addErrorMessage } = useContext(ErrorMessageContext);

    /**
     * ## `signIn`
     * Returns a `user`-object on successful login or `null` on failure.
     * 
     * ### Used-By Components
     * 1. UserSignIn
     * 2. UserSignUp
     * 3. CourseDetail
     * 4. PrivateRoute
     * 
     * ### Notes
     * - `Basic Auth` requires "name:pass"
     * 
     * @param {string} emailAddress
     * @param {string} password
     * @returns {object | null}
     */
    const signIn = async (emailAddress, password) => {
        try {
            const endpoint = `users`;
            const method = 'GET';
            const url = `http://localhost:5000/api/${endpoint}`;
            const options = {
                method,
                headers: {},
            };

            if (emailAddress && password) {
                // Credentials to Base64-encoded string
                const encodedCredentials = btoa(`${emailAddress}:${password}`);
                // Set `Basic Authorization` header
                options.headers.Authorization = `Basic ${encodedCredentials}`;
            }

            const res = await fetch(url, options);
            let data = null;
            try { data = await res.json(); } catch { }

            // ERROR GUARD-CLAUSES
            // (SUCCESS)
            if (res.status === 200) {
                const user = data;
                console.log(`SUCCESS! ${user.emailAddress} is now signed in!`);

                //     ENCRYPTION

                // Create `Web Crypto API`-formatted (WCA-formatted) key {Uint8Array}
                // - {Typed-array of 8-bit unsigned integers / ArrayBuffer-view}
                // - {array of 1-byte integers; (0-255)/element}
                const secretKeyUint8 = new Uint8Array(
                    // Expression returns {array of 1-byte-integers (0-255)}
                    // - Original Secret Key (OSK) > 32 elements
                    secretKeyHex //> {string} hex-chars (0-F); OSK (64 hex-char/32 bytes)
                        // - .match() builds 
                        //    - {array of 1-byte hex-strings (hex-character pairs: 00-FF)}
                        //    - OSK: 32 elements
                        //    - 2 hex/element: [00, 0a, ... F0, FF]
                        .match(/.{2}/g)
                        // - `parseInt` arg `16`: Base-16 indicates characters in `byte` are hex
                        // - `parseInt`: Turns a hex-pair into an integer (0-255)
                        // - .map() returns:
                        //    - {array of 32 1-byte integers}
                        //    - (0-255)/element: [9, 10, ... 240, 255]
                        //    - OSK: 32 elements
                        .map(byte => parseInt(byte, 16)) //>  
                );

                // Create WCA-formatted inizialization vector for user session {Uint8Array}
                // - {Typed-array of 8-bit unsigned integers / ArrayBuffer-view}
                // - {array of 1-byte integers; (0-255)/element}
                // - 12-byte `iv` recommended by NIST for AES-GCM to balance security & performance
                // - 12-element array
                const iv = window.crypto.getRandomValues(new Uint8Array(12));

                // Import a raw key into WCA-system
                let key = await window.crypto.subtle.importKey(
                    'raw', //Format
                    secretKeyUint8, //Raw Uint8 key
                    { name: 'AES-GCM', length: 256 }, //Algorithm, length
                    false, //Allow key extraction?
                    ['encrypt', 'decrypt'] //Intended use
                );

                // Encode password for WCA as binary
                // - encodedPass: {Uint8Array}
                // - {Typed-array of 8-bit unsigned integers / ArrayBuffer-view}
                // - {array of 1-byte integers; (0-255)/element}
                const encoder = new TextEncoder();
                let encodedPass = encoder.encode(`${password}`);

                // Create cipher from password, raw binary 
                // - cipherBinary: {ArrayBuffer} 
                let cipherBinary = await window.crypto.subtle.encrypt(
                    { name: 'AES-GCM', iv: iv }, //Algorithm, initialization vector
                    key,
                    encodedPass,
                );

                // Convert binary ArrayBuffers to Base-64 encoded strings to enable cookie storage
                const cipherBase64 = arrayBufferToBase64(cipherBinary);
                const ivBase64 = arrayBufferToBase64(iv.buffer); // param: ...(iv)

                // Set cookie and `authData`
                const authDataPackage = { user, ivBase64, cipherBase64 };
                Cookies.set('authData', JSON.stringify(authDataPackage), { expires: 1/*day*/ });
                setAuthData(authDataPackage);

                return user;
            }
            // (Default) If not successfull, return `null`
            return null;
            // //todo
            // if (res.status === 401) {
            //     console.log(res, data);
            //     addErrorMessage(`HTTP Status Code ${res.status}: ${data.msg}`);
            //     // setErrors(['Access Denied']);
            //     return;
            // }
            // if (!res.ok) {
            //     addErrorMessage(`HTTP Status Code: ${res.status}`);
            //     nav('/error');
            //     return;
            // }
            // (Default) Catch unexpected 200-series HTTP status codes
            // addErrorMessage(`HTTP Status ${res.status}: ${data.msg}`);
            // nav('/error');
        }
        // Catch network errors
        catch (err) {
            console.log(err);
            addErrorMessage(`Encountered a Network Error (UserContext-sI1)`);
            nav('/error');
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //  SIGN OUT
    ////////////////////////////////////////////////////////////////////////////////////////////////
    const signOut = () => {
        //[!TODO] Reset welcome message state in top-banner
        setAuthData(null);
        // setPass(null);
        Cookies.remove('authData');
        // Cookies.remove('defaultTheme');
        nav('/');
    }

    return (
        <UserContext.Provider value={{
            authData,
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