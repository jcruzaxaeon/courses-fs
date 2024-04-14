/////////////////////////////////////////////////////////////////////////////////////////////////////
//  ## client\src\components\Header.js
//  - App.js
////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import ThemeContext from '../context/ThemeContext';

import Nav from './Nav';

const Header = () => {
    //   const { accentColor } = useContext(ThemeContext);

    return (
        // <div className="header" /*style={{ background: accentColor }}*/>
        <header>
            <div className="wrap header--flex bounds">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <Nav />
            </div>
        </header>
        // {/* </div> */ }
    );
};

export default Header