

//  client\src\components\UpdateCourse.js

import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import UserContext from "../contexts/UserContext.js";
import ErrorMessageContext from "../contexts/ErrorMessageContext.js";
import ErrorList from "./ErrorList.js";
import { getPassword } from "../utils/cryptoUtils.js";

/**
 * ## `UpdateCourse`-Component
 * 
 * @module UpdateCourse
 * @returns {JSX.Element} `<main>` course-update form
 * @ReactComponent
 */
const UpdateCourse = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { authData } = useContext(UserContext);
    const { addErrorMessage } = useContext(ErrorMessageContext);
    const [loading, setLoading] = useState(null);
    const [course, setCourse] = useState(null);
    const [fn, setFn] = useState(null);
    const [ln, setLn] = useState(null);
    // let [fn, ln] = [null, null];
    const [errors, setErrors] = useState([]);

    // Course Data from Form-Inputs
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // Try to find course data to populate inputs 
    useEffect(() => {
        (async () => {
            try {
                const endpoint = `courses/${id}`;
                const method = 'GET';
                const url = `http://localhost:5000/api/${endpoint}`;
                const options = {
                    method,
                    headers: {},
                };

                const res = await fetch(url, options);
                let data = null;
                try { data = await res.json(); } catch {}

                // ERROR GUARD-CLAUSES
                // Catch codes != 200-series HTTP status codes
                if (!res.ok) {
                    addErrorMessage(`HTTP Status Code: ${res.status}`);
                    nav('/error');
                    return;
                }
                // Catch falsy `data` when requested `id` DNE.
                if (!data) {
                    addErrorMessage(`Course ${id} does not exist.`);
                    nav('/notfound');
                    return;
                }
                // Check for write permission
                const writePermission = authData.user.id === data.userId;
                if (!writePermission) {
                    addErrorMessage(`Course is owned by a different user.`);
                    nav('/forbidden');
                    return;
                }
                // (SUCCESS)
                if (res.status === 200) {
                    setCourse(data);
                    setLoading(false);
                    setFn(data.student.firstName);
                    setLn(data.student.lastName);
                    return;
                }
                // (Default) Catch unexpected 200-series HTTP status codes
                addErrorMessage(`HTTP Status Code ${res.status}: ${data.msg}`);
                nav('/error');
            } catch (err) {
                // Catch network issues 
                addErrorMessage(`Error Code: UpCo-uE1`);
                nav('/error');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        (async () => {
            try {
                const newCourse = {
                    title: title.current.value,
                    description: description.current.value,
                    estimatedTime: estimatedTime.current.value,
                    materialsNeeded: materialsNeeded.current.value,
                    userId: authData.user.id,
                }

                const endpoint = `courses/${id}`;
                const url = `http://localhost:5000/api/${endpoint}`;
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

                // HTTP:500 Test
                // console.log("Start Test")
                // const url = `http://localhost:5000/api/error`;
                // const options = {
                //     method: 'GET',
                //     headers: {},
                // }

                const res = await fetch(url, options);
                let data = null;
                try { data = await res.json(); } catch {}

                // ERROR GUARD-CLAUSES
                // (SUCCESS) Course updated
                if (res.status === 204) {
                    nav(`/courses/${id}`);
                    return;
                }
                // Catch empty required-fields; Populate errors for <ErrorList />
                if (res.status === 400) {
                    setErrors(data.errors);
                    return;
                }
                // Catch codes != 200-series HTTP status codes
                if (!res.ok) {
                    addErrorMessage(`HTTP Status Code: ${res.status}`);
                    nav('/error');
                    return;
                }
                // (Default) Catch unexpected 200-series HTTP status codes
                addErrorMessage(`HTTP Status Code ${res.status}: ${data.msg}`);
                nav('/error');
            }
            catch (err) {
                // Catch network issues 
                console.log(err);
                addErrorMessage(`Error Code: UpCo-hS1`);
                nav('/error');
            }
        })();
    }

    const handleCancel = e => {
        e.preventDefault();
        nav(`/courses/${id}`);
    }

    if (authData && course && !loading) {
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <ErrorList errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                {/* COURSE TITLE */}
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

                                {/* COURSE DESCRIPTION */}
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    ref={description}
                                    id="courseDescription"
                                    name="courseDescription"
                                    defaultValue={errors.length === 0
                                        ? course.description
                                        : null} />
                            </div>
                            <div>
                                {/* ESTIMATED TIME */}
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    ref={estimatedTime}
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    defaultValue={errors.length === 0
                                        ? course.estimatedTime
                                        : null} />

                                {/* MATERIALS NEEDED */}
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    ref={materialsNeeded}
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    defaultValue={errors.length === 0
                                        ? course.materialsNeeded
                                        : null} />
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
    return <main><div className="wrap"><p>Loading ...</p></div></main>
}

export default UpdateCourse;