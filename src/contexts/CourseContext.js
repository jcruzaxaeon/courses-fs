

//  client\src\contexts\CourseContext.js

import { createContext, useState } from 'react';

/**
 * ## `CourseContext`
 * Module implemented as a Context-Object
 * - Provides a global, boolean, toggle-flag: `fetchCourses`
 * - Used to syncs course-list with database after successful course-deletion
 * - Toggle `fetchCourses` to re-render course-list on MAIN-PAGE
 * 
 * ### `.fetchCourses`
 * - Acts as a global toggle-flag, triggering a (course-list/MAIN-PAGE) re-render
 * - Watched by (`Courses` > useEffect() > dependency-array)
 * - A toggle triggers the useEffect() callback > re-fetch course-list from DB
 * - Toggled by (`CourseDetail` > handleDelete() > SUCCESS) using `setFetchCourses`
 * 
 * @module CourseContext
 * @type React.Context<{
 *      fetchCourses: boolean, 
 *      setFetchCourses: function,
 * }>
 * @property {boolean} fetchCourses - Global toggle-flag for re-rendering MAIN-PAGE
 * @property {function} setFetchCourses
 * @Context
 */
const CourseContext = createContext(null);

/**
 * ## `CourseProvider` 
 * Wraps the app to provide `CourseContext`
 * @param {Object} props
 * @returns {JSX.Element} Provider wrapper
 * @ReactComponent
 */
export const CourseProvider = (props) => {
    // Flags for re-rendering MAIN-PAGE
    const [fetchCourses, setFetchCourses] = useState(false);

    return (
        <CourseContext.Provider value={
            {
                fetchCourses,
                setFetchCourses,
            }
        }>
            {props.children}
        </CourseContext.Provider>
    );
}

export default CourseContext;