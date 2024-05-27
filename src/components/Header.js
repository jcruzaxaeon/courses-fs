

//  ## client\src\components\Header.js

import { Link } from 'react-router-dom';

import Nav from './Nav';

/**
 * ## `Header`-Component
 * Site-wide Header
 * - Used by: App.js
 * 
 * @module Header
 * @returns {JSX.Element} `<header>` as site-wide template
 * @ReactComponent
 */
const Header = () => {

    return (
        <header>
            <div className="wrap header--flex bounds">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <Nav />
            </div>
        </header>
    );
};

export default Header