//  client\src\components\NotFound.js
//
//
import { useContext } from 'react';
import ErrorMessageContext from '../contexts/ErrorMessageContext.js';
import ErrorList from './ErrorList.js';

const NotFound = () => {
    const { errorMessages } = useContext(ErrorMessageContext);
    // const loc = useLocation();

    return <main>
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            {/* {loc.state && loc.state.errors
                ? <ErrorList errors={loc.state.errors} />
                : null} */}
            {errorMessages.length>0
                ? <ErrorList errors={errorMessages} />
                : null}
        </div>
    </main>
}

export default NotFound;