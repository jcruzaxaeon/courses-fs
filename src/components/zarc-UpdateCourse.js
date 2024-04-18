/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\UpdateCourse.js
/////////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import UserContext from "../contexts/UserContext";
// import CourseContext from "../contexts/CourseContext";
import { asyncTry } from "../utils/async-try";

const UpdateCourse = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { authUser, pass } = useContext(UserContext);
    // const { courses, setCourses } = useContext(CourseContext);
    const [course, setCourse] = useState(null);
    let [fn, ln, courses] = [null, null, null];

    useEffect(() => {
        asyncTry((async () => {
            const endpoint = 'courses';
            const method = 'GET';
            const url = `http://localhost:5000/api/${endpoint}`;
            const options = {
                method,
                headers: {},
            };

            const response = await fetch(url, options);
            courses = await response.json();
            console.log("Courses: ", courses)
            if (courses) {
                try {
                    const i = courses.findIndex(c => +c.id === +id);
                    setCourse(courses[i]);

                } catch (err) {
                    throw new Error(`Course "${id}" not found.`);
                }
            }
            // setCourses(data);
        })());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (course) {
    //         fn = course.student.firstName;
    //         ln = course.student.lastName;
    //         console.log("if(courses) course: ", course);
    //         console.log('courseMaterials: ', course.materialsNeeded);
    //     }
    // }, [course]);
    // if (!courses) {
    //     // useEffect(() => {
    //     (async () => {
    //         try {
    //             const endpoint = 'courses';
    //             const method = 'GET';
    //             const url = `http://localhost:5000/api/${endpoint}`;
    //             const options = {
    //                 method,
    //                 headers: {},
    //             };

    //             const response = await fetch(url, options);
    //             const data = await response.json();
    //             setCourses(data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     })();
    //     // xxxeslint-disable-next-line react-hooks/exhaustive-deps
    //     //  }, []);
    // }

    const handleSubmit = e => {
        e.preventDefault();

        try {

        } catch (err) { console.log(err) }
    }

    const handleCancel = e => {
        e.preventDefault();
        nav('/');
    }

    // if (authUser && course) {
    //     return (
    //         <main>
    //             <div className="wrap">
    //                 <h2>Update Course</h2>
    //                 <form onSubmit={handleSubmit}>
    //                     <div className="main--flex">
    //                         <div>
    //                             <label htmlFor="courseTitle">Course Title</label>
    //                             <input
    //                                 id="courseTitle"
    //                                 name="courseTitle"
    //                                 type="text"
    //                                 defaultValue={course.title} />

    //                             <p>By {fn} {ln}</p>

    //                             <label htmlFor="courseDescription">Course Description</label>
    //                             <textarea
    //                                 id="courseDescription"
    //                                 name="courseDescription"
    //                                 defaultValue={course.description} />
    //                             {/* </textarea> */}
    //                         </div>
    //                         <div>
    //                             <label htmlFor="estimatedTime">Estimated Time</label>
    //                             <input
    //                                 id="estimatedTime"
    //                                 name="estimatedTime"
    //                                 type="text"
    //                                 defaultValue={course.estimatedTime} />

    //                             <label htmlFor="materialsNeeded">Materials Needed</label>
    //                             <textarea
    //                                 id="materialsNeeded"
    //                                 name="materialsNeeded"
    //                                 defaultValue={course.materialsNeeded} />
    //                             {/* </textarea> */}
    //                         </div>
    //                     </div>
    //                     <button className="button"
    //                         type="submit">Update Course</button>
    //                     <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    //                 </form>
    //             </div>
    //         </main>
    //     );
    // }
    if (course) {
        fn = course.student.firstName;
        ln = course.student.lastName;
        console.log("if(courses) course: ", course);
        console.log('courseMaterials: ', course.materialsNeeded);
    }

    console.log("authUser: ", authUser, ':: "Course": ', course);
    if (authUser && course) {
        console.log("inside");
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    defaultValue={course.title} />

                                <p>By {fn} {ln}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    id="courseDescription"
                                    name="courseDescription"
                                    defaultValue={course.description} />
                                {/* </textarea> */}
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    defaultValue={course.estimatedTime} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    defaultValue={course.materialsNeeded} />
                                {/* </textarea> */}
                            </div>
                        </div>
                        <button className="button"
                            type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </main>
        );
    }
    return <><p>Loading...</p></>
}

export default UpdateCourse;