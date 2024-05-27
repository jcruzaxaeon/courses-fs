

//  client\src\components\UserSignOut.js

import { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext.js';
import { Navigate } from 'react-router-dom';

/**
 * ## `UserSignOut`
 * Page Component
 * 
 * @module UserSignOut
 * @returns {JSX.Element} `<main>` signout form
 * @ReactComponent
 */
const UserSignOut = () => {
   const { actions } = useContext(UserContext);

   useEffect(() => actions.signOut() );

   return <Navigate to='/' replace />
}

export default UserSignOut