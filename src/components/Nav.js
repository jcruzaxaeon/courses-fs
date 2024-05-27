

//  # client\src\components\Header.js

import { useContext } from 'react';
import UserContext from '../contexts/UserContext.js';

import { Link } from "react-router-dom";

/**
 * ## `Nav`-Component
 * Abstracted navigation bar (`<nav>`)
 * - Used by: Header.js
 * 
 * ### Authentication Status
 * 1. !Authenticated shows `Sign up`-, and `Sign in`-Links
 * 2. Authenticated shows a welcome message, and `Sign Out`-Link
 * 
 * @module Nav
 * @returns {JSX.Element} `<nav>` to be used in `<header>`
 * @ReactComponent
 */
const Nav = () => {
    const { authData } = useContext(UserContext);
    let name = 'noname';
    //[!TODO] Update to remove on cookie
    if (authData) name = `${authData.user.firstName} ${authData.user.lastName}`;

    return (
        <nav>
            {authData === null
                ? <ul className="header--signedout">
                    <li><Link className="signup" to="/signup">Sign up</Link></li>
                    <li><Link className="signin" to="/signin">Sign in</Link></li></ul>
                : <ul className="header--signedin">
                    <li><span>Welcome {name} </span></li>
                    <li><Link className="signout" to="/signout">Sign Out</Link></li></ul>}
        </nav>);
}

export default Nav;