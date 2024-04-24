////////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\UserSignIn.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useContext, useRef, useState } from 'react';
import { /*Link,*/ useNavigate, useLocation } from 'react-router-dom';
// import ThemeContext from '../context/ThemeContext';
import UserContext from '../contexts/UserContext.js';
import ErrorList from './ErrorList.js';

const UserSignin = () => {
    const { actions } = useContext(UserContext);
    const nav = useNavigate(); //"Call the useNavigate()-hook"
    const location = useLocation();
    const from = location.state?.from || '/';


    // State
    const username = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        const credentials = {
            username: username.current.value,
            password: password.current.value,
        };

        try {
            const user = await actions.signIn(credentials);
            console.log('"user" post signin: ', user);
            if (user) {
                // nav('/');
                nav(from);
                return;
            }
            setErrors(['Access Denied.']);
            // console.log(user);
        } catch (err) { console.log(err); }
    }

    const handleCancel = e => {
        e.preventDefault();
        // nav('/');
        nav(from);
    }

    return (
        <>
            {/* <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><a href="signup.html">Sign Up</a></li>
                            <li><a href="signin.html">Sign In</a></li>
                        </ul>
                    </nav>
                </div>
            </header> */}
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
                            ref={username} />
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
                    <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                </div>
            </main>
        </>
    );
}

export default UserSignin;