////////////////////////////////////////////////////////////////////////////////////////////////////
//  # client\src\components\Header.js
//  - Header.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useContext } from 'react';
import UserContext from '../contexts/UserContext.js';

import { Link } from "react-router-dom";

const Nav = () => {
    const { authUser } = useContext(UserContext);
    console.log(authUser);
    let name = 'noname';
    if( authUser ) name = `${authUser.firstName} ${authUser.lastName}`;
    //console.log(authUser);

    return (
        <nav>
            {/* Turnery Expression */}
            {authUser === null
                ? <ul className="header--signedout">
                    <li><Link className="signup" to="/signup">Sign up</Link></li>
                    <li><Link className="signin" to="/signin">Sign in</Link></li>
                </ul>
                : <ul className="header--signedin">
                    <li><span>Welcome {name} </span></li>
                    {/* <Link className="settings" to="/settings">Settings</Link> */}
                    <li><Link className="signout" to="/signout">Sign Out</Link></li>
                </ul>
            }

        </nav>
    );
}

export default Nav;