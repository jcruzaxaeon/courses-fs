////////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\UserSignOut.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const UserSignOut = () => {
   const { actions } = useContext(UserContext);

   useEffect(() => actions.signOut() );

   return <Navigate to='/' replace />
}

export default UserSignOut