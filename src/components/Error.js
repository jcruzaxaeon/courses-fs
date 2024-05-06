//  client\src\components\Error.js
//
//
import { useContext, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
import ErrorMessageContext from '../contexts/ErrorMessageContext.js';
import ErrorList from './ErrorList.js';

const Error = () => {
    const { errorMessages } = useContext(ErrorMessageContext);
    // const loc = useLocation();

    return <main>
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We encountered an unexpected error.</p>
            {/* {loc.state && loc.state.errors && loc.state.errors != ['']
                ? <ErrorList errors={loc.state.errors} />
                : null} */}
            {errorMessages.length > 0
                ? <ErrorList errors={errorMessages} />
                : null}
        </div>
    </main>
}

export default Error;