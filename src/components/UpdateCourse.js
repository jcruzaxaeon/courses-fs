/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\UpdateCourse.js
/////////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import UserContext from "../contexts/UserContext.js";
import ErrorList from "./ErrorList.js";
import { iTry } from "../utils/i-try.js";
import { getPassword } from "../utils/cryptoUtils.js";

const UpdateCourse = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { authData } = useContext(UserContext);
    const [course, setCourse] = useState(null);
    let [fn, ln, courses] = [null, null, null];
    const [errors, setErrors] = useState([]);

    // Course Data
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    useEffect(() => {
        iTry(async () => {
            const endpoint = `courses/${id}`;
            const method = 'GET';
            const url = `http://localhost:5000/api/${endpoint}`;
            const options = {
                method,
                headers: {},
            };

            const response = await fetch(url, options);

            const data = await response.json();
            setCourse(data);

            if (!data) { setErrors([`Course ${id} not found.`]); return; }
            console.log("Course: ", data);
            // if (courses) {
            //     iTry(() => {
            //         const i = courses.findIndex(c => +c.id === +id);
            //         setCourse(courses[i]);
            //     }, `Course "${id}" not found.`);
            //     // try {
            //     //     const i = courses.findIndex(c => +c.id === +id);
            //     //     setCourse(courses[i]);

            //     // } catch (err) {
            //     //     throw new Error(`Course "${id}" not found.`);
            //     // }
            // }
            // const data = response.json();

        }, 'Async-error in UpdateCourse.');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        iTry(async () => {
            const newCourse = {
                title: title.current.value,
                description: description.current.value,
                estimatedTime: estimatedTime.current.value,
                materialsNeeded: materialsNeeded.current.value,
                userId: authData.user.id,
            }

            const endpoint = `courses/${id}`;
            // const method = 'PUT';
            const url = `http://localhost:5000/api/${endpoint}`;
            console.log("New Course: ", newCourse);
            const options = {
                method: 'PUT',
                body: JSON.stringify(newCourse),
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                 },
            };

            const pass = await getPassword();
            const encodedCredentials = btoa(`${authData.user.emailAddress}:${pass}`);
            options.headers.Authorization = `Basic ${encodedCredentials}`;

            const response = await fetch(url, options);

            if (response.status === 204) {
                console.log(response);
                nav(`/courses/${id}`);
                return;
             }
             if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
                return;
             }
             // [!TODO] Create generalized status=500 error pattern
             throw new Error();

        }, 'Submit Issue');
    }

    const handleCancel = e => {
        e.preventDefault();
        nav(`/courses/${id}`);
    }

    const handleReturn = e => {
        e.preventDefault();
        nav(`/`);
    }

    if (course) {
        fn = course.student.firstName;
        ln = course.student.lastName;
        console.log("if(courses) course: ", course);
        console.log('courseMaterials: ', course.materialsNeeded);
    }

    console.log('authData: ', authData);
    console.log('Course: ', course);
    if (authData && course) {
        console.log("inside", errors);
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <ErrorList errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input
                                    ref={title}
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    defaultValue=
                                    {errors.length === 0
                                        ? course.title
                                        : null} />

                                <p>By {fn} {ln}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    ref={description}
                                    id="courseDescription"
                                    name="courseDescription"
                                    defaultValue={errors.length === 0
                                        ? course.description
                                        : null} />
                                {/* </textarea> */}
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    ref={estimatedTime}
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    defaultValue={errors.length === 0
                                        ? course.estimatedTime
                                        : null} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    ref={materialsNeeded}
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    defaultValue={errors.length === 0
                                        ? course.materialsNeeded
                                        : null} />
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
    return <main>
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorList errors={errors} />
            <button className="button button-secondary" onClick={handleReturn}>Return to List</button>
        </div>
    </main>
}

export default UpdateCourse;