

//  client\src\components\Forbidden.js

import { useContext } from "react";
import ErrorMessageContext from "../contexts/ErrorMessageContext";
import ErrorList from './ErrorList.js';

/**
 * ## `Forbidden`-Component
 * Forbidden "error"-page
 * 
 * ### Returns
 * - `<main>` displaying `errorMessages` from `ErrorMessageContext`
 * - Messages displayed in contained `ErrorList`-component
 * 
 * @module Forbidden
 * @returns {JSX.Element} `<main>` displaying forbidden `errorMessages`
 * @ReactComponent
 */
const Forbidden = () => {
    const { errorMessages } = useContext(ErrorMessageContext);

    return <main>
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
            {errorMessages.length > 0
                ? <ErrorList errors={errorMessages} />
                : null}
        </div>
    </main>
}

export default Forbidden;