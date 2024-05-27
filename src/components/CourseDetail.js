

//  client\src\components\CourseDetail.js

// External
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Internal
import { getPassword } from '../utils/cryptoUtils.js';
import UserContext from "../contexts/UserContext.js";
import ErrorMessageContext from '../contexts/ErrorMessageContext.js';
import CourseContext from '../contexts/CourseContext.js';

/**
 * ## `CourseDetail`
 * Page Component
 * - Fetch details of *one* course specified by URL parameter, `id`
 * 
 * ### Privileged Buttons/Links (`Update Course`, `Delete Course`)
 * 1. Show if: (`authenticated` AND `writePermission`) = TRUE
 * 2. Hide if: (`authenticated` OR `writePermission`) = FALSE
 * 
 * @module CourseDetail
 * @returns {JSX.Element} `<main>` shows course detail
 * @ReactComponent
 */
const CourseDetail = () => {
    const { authData, actions } = useContext(UserContext);
    const { addErrorMessage } = useContext(ErrorMessageContext);
    const { setFetchCourses } = useContext(CourseContext);
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [authenticated, setAuthenticated] = useState(null);

    const nav = useNavigate();

    // Fetch Course Details
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
                    addErrorMessage(`HTTP Error ${res.status} ${res.statusText}`);
                    nav('/error');
                    return;
                }
                // Catch falsy `data` when requested `id` DNE.
                if (!data) {
                    addErrorMessage(`Course ${id} does not exist.`);
                    nav('/notfound');
                    return;
                }
                // (SUCCESS)
                if (res.status === 200) {
                    setDetails(data);
                    return;
                }
                // (Default) Catch unexpected 200-series HTTP status codes
                addErrorMessage(`HTTP Status ${res.status}: ${data.msg}`);
                nav('/error');
            } 
            // Catch network issues
            catch (err) {
                console.log(err);
                addErrorMessage(`Encountered a Network Error (CD-uE1)`);
                nav('/error');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Authenticate
    useEffect(() => {
        try {
            if (!authData) { setAuthenticated(false); return; }
            if (authenticated === null) { //(!!!) Infinite-loop stop-condition.
                (async () => {
                    const pass = await getPassword();
                    const user = await actions.signIn(authData.user.emailAddress, pass);
                    if (user) setAuthenticated(true);
                    else setAuthenticated(false);
                })();
            }
        } catch (err) {
            console.log(err);
            addErrorMessage(`Error Code: CD-uE2`);
            nav('/error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]); //Tempting fate with infinite-loop. See "stop-condition".

    /**
     * ## `handleDelete`
     * Asynchronously delete a course from the database.
     * - If `authData` exists, try to DELETE.
     * - HTTP 204 for successful-delete triggers a re-render of the Courses component
     * - Navigate to Courses/"course list"
     * @function handleDelete
     * @async
     */
    const handleDelete = async () => {
        if (authData) {
            try {
                const endpoint = `courses/${id}`;
                const method = 'DELETE';

                const url = `http://localhost:5000/api/${endpoint}`;
                const options = {
                    method,
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                    },
                };

                const pass = await getPassword();
                const encodedCredentials = btoa(`${authData.user.emailAddress}:${pass}`);
                options.headers.Authorization = `Basic ${encodedCredentials}`;

                const res = await fetch(url, options);
                let data = null;
                try { data = await res.json(); } catch {}

                // ERROR GUARD-CLAUSES
                // Catch codes != 200-series HTTP status codes
                if (!res.ok) {
                    addErrorMessage(`HTTP Error ${res.status} ${res.statusText}`);
                    nav('/error');
                    return;
                }
                // (SUCCESS)
                // - Touch fetchCourses > Trigger Courses useEffect() > Re-render, Load Courses
                if (res.status === 204) {
                    setFetchCourses(prevFetchCourses => !prevFetchCourses);
                    nav('/');
                    return;
                }
                // (Default) Catch unexpected 200-series HTTP status codes
                addErrorMessage(`HTTP Status ${res.status}: ${data.msg}`);
                nav('/error');
            }
            // Catch network issues
            catch (err) {
                console.log(err);
                addErrorMessage(`Encountered a Network Error (CD-hD1)`);
                nav('/error');
            }
        }
    }

    if (details) {
        const firstName = details.student.firstName;
        const lastName = details.student.lastName;
        let materialsNeeded = '* No materials needed for this course.'; //V1 - ['* No materials ...']
        let estimatedTime = 'No time estimate available.';
        const courseOwner = details.userId;
        let currentUserId = null;
        let writePermission = false;
        if (authenticated) {
            currentUserId = authData.user.id;
            writePermission = courseOwner === currentUserId;
        }

        if (details.materialsNeeded) materialsNeeded = details.materialsNeeded;
        if (details.estimatedTime) estimatedTime = details.estimatedTime;

        return (
            <>
                <main>
                    <div className="actions--bar">
                        <div className="wrap">
                            {authenticated && writePermission
                                ? <Link
                                    className="button"
                                    to={`/courses/${id}/update`}>Update Course</Link>
                                : null}
                            {authenticated && writePermission
                                ? <Link
                                    className="button"
                                    onClick={handleDelete}>Delete Course</Link>
                                : null}
                            <Link
                                className="button button-secondary"
                                to='/'>Return to List</Link>
                        </div>
                    </div>

                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{details.title}</h4>
                                    <p>By {firstName} {lastName}</p>
                                    <ReactMarkdown>{details.description}</ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </>
        );
    }
    return <div className="wrap"><p>Loading...</p></div>;
}

export default CourseDetail;