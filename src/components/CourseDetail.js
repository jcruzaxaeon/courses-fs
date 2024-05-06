//  src\components\CourseDetail.js
//
//
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from "../contexts/UserContext.js";
import ErrorMessageContext from '../contexts/ErrorMessageContext.js';
import ReactMarkdown from 'react-markdown';

// import { iTry } from '../utils/i-try.js';
import { getPassword } from '../utils/cryptoUtils.js';
// import ErrorList from './ErrorList.js';
// import CourseContext from "../contexts/CourseContext.js";


const CourseDetail = () => {
    const { authData, actions /*authUser, pass*/ } = useContext(UserContext);
    const { addErrorMessage } = useContext(ErrorMessageContext);
    const { id } = useParams();
    // const { courseDetail, setCourseDetail } = useContext(CourseContext); // <<< Error occurs here
    // console.log(id);
    const [details, setDetails] = useState(null);
    const [authenticated, setAuthenticated] = useState(null);
    // const [errors, setErrors] = useState(null);


    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            let msg = '';

            try {
                //
                // FETCH
                //
                //[!TEST]
                // const endpoint = `error`;

                //
                // Production
                const endpoint = `courses/${id}`;
                const method = 'GET';
                const url = `http://localhost:5000/api/${endpoint}`;
                const options = {
                    method,
                    headers: {},
                };

                const res = await fetch(url, options);
                if (!res.ok) {
                    // nav('/error', { state: { errors: [msg] } });
                    addErrorMessage(`HTTP Status Code: ${res.status}`);
                    nav('/error');
                    return;
                }
                const data = await res.json();
                if (!data) {
                    msg = `Course ${id} does not exist.`
                    // nav('/notfound',
                    //     { state: { errors: [msg] } });
                    addErrorMessage(msg);
                    nav('/notfound');
                    return;
                }
                if (res.status === 200) setDetails(data);
            } catch (err) {
                // nav('/error',
                //     { state: { errors: [`Error Code: CD-UE-01`] } });
                console.log(err);
                addErrorMessage(`Error Code: CD-UE-01`);
                nav('/error');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        try {
            if (!authData) { setAuthenticated(false); return; }
            if (authenticated === null) {
                (async () => {
                    const pass = await getPassword();
                    const user = await actions.signIn(authData.user.emailAddress, pass);
                    if (user) setAuthenticated(true);
                    else setAuthenticated(false);
                })();
            }
        } catch (err) {
            console.log(err);
            addErrorMessage(`Error Code: CD-UE-02`);
            nav('/error');
            // nav('/error',
            //     { state: { errors: [`Error Code: CD-UE-02`] } });
        }
    }, [authenticated]);

    const handleDelete = async () => {
        if (authData) {
            try {
                // 500 Test
                //
                // const endpoint = `error`;
                // const method = 'GET';

                // React Test
                //
                // const endpoint = `courses/${id}`;
                // endpoint = `error`;
                // const method = 'DELETE';

                // Production
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

                // "Touch" fetchCourses > Trigger Courses.js useEffect() > Re-render
                if (res.status === 204) {
                    actions.setFetchCourses(prevFetchCourses => !prevFetchCourses);
                    nav('/');
                    return;
                }
                // console.log(res);
                const data = await res.json();
                // console.log(data);
                // if (res.status === 400) {
                //     addErrorMessage(data.msg);
                //     nav('/error');
                //     return;                
                // }
                addErrorMessage(`HTTP Status Code ${res.status}: ${data.msg}`);
                nav('/error');
                // nav('/error', { state: { errors: [`HTTP Status Code: ${res.status}`] } });
            } catch (err) {
                console.log(err);
                addErrorMessage(`Error Code: CD-hD-01`);
                nav('/error');
                // nav('/error',
                //     { state: { errors: [`Error Code: CD-hD-01`] } });
            }
        }
    }

    // if authdata
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
                                        {/**********************************************************
                                        **  MATERIALS LIST 
                                        **********************************************************/}
                                        {/* {materials.map((mat, index) => (
                                            <li key={`mat-${index}`}>{mat.slice(2)}</li>
                                        ))} */}
                                        {/* <li>1/2 x 3/4 inch parting strip</li>
                                        <li>1 x 2 common pine</li>
                                        <li>1 x 4 common pine</li>
                                        <li>1 x 10 common pine</li>
                                        <li>1/4 inch thick lauan plywood</li>
                                        <li>Finishing Nails</li>
                                        <li>Sandpaper</li>
                                        <li>Wood Glue</li>
                                        <li>Wood Filler</li>
                                        <li>Minwax Oil Based Polyurethane</li> */}
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </>
        );
    }
    // if (errors) {
    // //if (errors.length > 0) {
    //     return <>
    //         <main>
    //             <div className="actions--bar">
    //                 <div className="wrap">
    //                     <Link
    //                         className="button button-secondary"
    //                         to='/'>Return to List</Link>
    //                 </div>
    //             </div>

    //             <div className="wrap">
    //                 <h2>Course Detail</h2>
    //                 <ErrorList errors={errors} />
    //             </div>
    //         </main>
    //     </>
    // }
    return <div className="wrap"><p>Loading...</p></div>;
}

export default CourseDetail;