/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\UpdateCourse.js
/////////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import UserContext from "../contexts/UserContext.js";
import ErrorMessageContext from "../contexts/ErrorMessageContext.js";
import ErrorList from "./ErrorList.js";
import { iTry } from "../utils/i-try.js";
import { getPassword } from "../utils/cryptoUtils.js";

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

    // Course Data
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // Try to find Course
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
                if(!res.ok) {
                    addErrorMessage(`HTTP Status Code: ${res.status}`);
                    nav('/error');
                    return;
                }

                const data = await res.json();
                if (!data) {
                    addErrorMessage(`Course ${id} does not exist.`);
                    nav('/notfound');
                    // nav('/notfound',
                    //     { state: { errors: [`Course ${id} does not exist.`] }, },);
                    return;
                }

                const writePermission = authData.user.id === data.userId;
                if (!writePermission) {
                    addErrorMessage(`Course is owned by a different user.`);
                    nav('/forbidden');
                    // nav('/forbidden',
                    // { state: { errors: [`Course is owned by a different user.`] }, },);
                    return;
                }

                setCourse(data);
                setLoading(false);
                setFn(data.student.firstName);
                setLn(data.student.lastName);
            } catch (err) {
                console.log(err);
                addErrorMessage(`Error Code: UpCo-uE-01`);
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

                // HTTP:500 Test
                // console.log("Start Test")
                // const url = `http://localhost:5000/api/error`;
                // const options = {
                //     method: 'GET',
                //     headers: {},
                // }

                const res = await fetch(url, options);

                if (res.status === 204) {
                    nav(`/courses/${id}`);
                    return;
                }
                if (res.status === 400) {
                    const data = await res.json();
                    setErrors(data.errors);
                    return;
                }
                if(!res.ok) {
                    addErrorMessage(`HTTP Status Code: ${res.status}`);
                    nav('/error');
                    return;
                }
            } catch (err) {
                console.log(err);
                addErrorMessage(`Error Code: UpCo-hS-01`);
                nav('/error');
            }
        })();
    }

    const handleCancel = e => {
        e.preventDefault();
        nav(`/courses/${id}`);
    }

    // const handleReturn = e => {
    //     e.preventDefault();
    //     nav(`/`);
    // }

    // if (course) {
    //     // console.log("authData: ", authData);
    //     // console.log("if(courses) course: ", course);
    //     const writePermission = authData.user.id === course.userId;
    //     if (!writePermission) {
    //         addErrorMessage(`Course is owned by a different user.`);
    //         nav('/forbidden');
    //         // nav('/forbidden',
    //         // { state: { errors: [`Course is owned by a different user.`] }, },);
    //         return;
    //     }

    //     fn = course.student.firstName;
    //     ln = course.student.lastName;
    // }

    // setTimeout(() => { console.log('wait') }, 5000);

    if (authData && course && !loading) {
        // console.log("inside", errors);
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
    return <main><div className="wrap"><p>Loading ...</p></div></main>
}

export default UpdateCourse;