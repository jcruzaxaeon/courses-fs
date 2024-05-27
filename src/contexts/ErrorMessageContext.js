

// [!TODO] Find a good place to clean up the errorMessage array
// client\src\contexts\ErrorMessageContext.js

import { useState, createContext } from "react";

/**
 * ## `ErrorMessageContext`
 * Provides an array and methods for global error-messages
 * - Module implemented as a Context-Object
 * 
 * ### `.fetchCourses`
 * - Acts as a global toggle-flag, triggering a (course-list/MAIN-PAGE) re-render
 * - Watched by (`Courses` > useEffect() > dependency-array)
 * - A toggle triggers the useEffect() callback > re-fetch course-list from DB
 * - Toggled by (`CourseDetail` > handleDelete() > SUCCESS) using `setFetchCourses`
 * 
 * @module ErrorMessageContext
 * @type React.Context<{
 *      errorMessages: string[], 
 *      setErrorMessages: function,
 *      addErrorMessage: function,
 * }>
 * @property {string[]} errorMessages - Global
 * @property {function} setErrorMessages - Local
 * @property {function} addErrorMessage - Global
 * @Context
 */
const ErrorMessageContext = createContext(null);

/**
 * ## `ErrorMessageProvider` 
 * Wraps the app to provide `ErrorMessageContext`
 * @param {Object} props
 * @returns {JSX.Element} Provider wrapper
 * @ReactComponent
 */
export const ErrorMessageProvider = (props) => {
    const [errorMessages, setErrorMessages] = useState([]);

    /**
     * Adds an error message to the error messages array if it's not already included.
     * @function addErrorMessage
     * @param {string} message - The error message to add.
     */
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
