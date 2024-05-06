// client\src\contexts\ErrorMessageContext.js
//
//
import { useState, createContext } from "react";

const ErrorMessageContext = createContext(null);

export const ErrorMessageProvider = (props) => {
    const [errorMessages, setErrorMessages] = useState([]);

    const addErrorMessage = (message) => {
        setErrorMessages(prevMessages => {
            if(!prevMessages.includes(message)) return [...prevMessages, message];
            return prevMessages;
        });
    };

    return (
        <ErrorMessageContext.Provider value={{
            errorMessages,
            setErrorMessages,
            addErrorMessage,
        }}>
            {props.children}
        </ErrorMessageContext.Provider>
    );
}

export default ErrorMessageContext;
