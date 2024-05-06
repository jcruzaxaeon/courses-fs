//  client\src\components\Forbidden.js
//
// import ErrorList from './ErrorList.js';
// import { useLocation } from "react-router-dom";
import { useContext } from "react";
import ErrorMessageContext from "../contexts/ErrorMessageContext";
import ErrorList from './ErrorList.js';

const Forbidden = () => {
    // const loc = useLocation();
    const { errorMessages } = useContext(ErrorMessageContext);

    return <main>
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
            {/* {loc.state.errors
                ? <ErrorList errors={loc.state.errors} />
                : null} */}
            {errorMessages.length > 0
                ? <ErrorList errors={errorMessages} />
                : null}
        </div>
    </main>
}

export default Forbidden;