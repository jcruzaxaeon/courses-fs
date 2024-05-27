

//  client\src\components\Error.js

import { useContext } from 'react';
import ErrorMessageContext from '../contexts/ErrorMessageContext.js';
import ErrorList from './ErrorList.js';

/**
 * ## `Error`-Component
 * General "error"-page
 * 
 * ### Returns
 * - `<main>` displaying `errorMessages` from `ErrorMessageContext`
 * - Messages displayed in contained `ErrorList`-component
 * 
 * @module Error
 * @returns {JSX.Element} `<main>` displaying general `errorMessages`
 * @ReactComponent
 */
const Error = () => {
    const { errorMessages } = useContext(ErrorMessageContext);

    return <main>
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We encountered an unexpected error.</p>
            {errorMessages.length > 0
                ? <ErrorList errors={errorMessages} />
                : null}
        </div>
    </main>
}

export default Error;