

//  client\src\components\UserSignIn.js

import { useContext, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import ErrorMessageContext from "../contexts/ErrorMessageContext.js";
import ErrorList from './ErrorList.js';

/**
 * ## `UserSignIn`
 * Page Component
 * 
 * @module UserSignIn
 * @returns {JSX.Element} `<main>` signin form
 * @ReactComponent
 */
const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const { addErrorMessage } = useContext(ErrorMessageContext);
    const nav = useNavigate(); //JARGON: "Call the useNavigate()-hook"
    const location = useLocation();
    const from = location.state?.from || '/';

    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        // References
        const rEmailAddress = emailAddress.current.value;
        const rPassword = password.current.value;

        try {
            const user = await actions.signIn(rEmailAddress, rPassword);
            if (user) {
                // nav('/');
                nav(from);
                return;
            }
            setErrors(['Access Denied.']);
        } catch (err) {
            addErrorMessage(`Encountered a sign-in error.`);
            nav('/error');
        }
    }

    const handleCancel = e => {
        e.preventDefault();
        // nav('/');
        nav(from);
    }

    return (
        <>
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <ErrorList errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            defaultValue=""
                            ref={emailAddress} />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            ref={password}
                            defaultValue="" />
                        <button
                            className="button"
                            type="submit">Sign In</button>
                        <button
                            className="button button-secondary"
                            onClick={handleCancel}>Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>
                </div>
            </main>
        </>
    );
}

export default UserSignIn;