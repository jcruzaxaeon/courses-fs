

//  client\src\components\NotFound.js

import { useContext } from 'react';
import ErrorMessageContext from '../contexts/ErrorMessageContext.js';
import ErrorList from './ErrorList.js';

/**
 * ## `NotFound`-Component
 * Not Found "error"-page
 * 
 * ### Returns
 * - `<main>` displaying `errorMessages` from `ErrorMessageContext`
 * - Messages displayed in contained `ErrorList`-component
 * 
 * @module NotFound
 * @returns {JSX.Element} `<main>` displaying forbidden `errorMessages`
 * @ReactComponent
 */
const NotFound = () => {
    const { errorMessages } = useContext(ErrorMessageContext);

    return <main>
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            {errorMessages.length>0
                ? <ErrorList errors={errorMessages} />
                : null}
        </div>
    </main>
}

export default NotFound;