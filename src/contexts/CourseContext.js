////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\contexts\CourseContext.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { createContext, useState } from 'react';
// import Cookies from 'js-cookie';

const CourseContext = createContext(null);

export const CourseProvider = (props) => {
    const [courses, setCourses] = useState([
        {
            title: 'Default Title 1',
            description: 'Default description 1.'
        },
        {
            title: 'Default Title 2',
            description: 'Default description 2.'
        },
    ]);

    return (
        <CourseContext.Provider value={
            {
                courses,
                setCourses,
            }
        }>
            {props.children}
        </CourseContext.Provider>
    );
}

export default CourseContext;