/////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\components\CourseDetail.js
////////////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from "../contexts/UserContext.js";

import { iTry } from '../utils/i-try.js';
// import CourseContext from "../contexts/CourseContext.js";

const CourseDetail = () => {
    const { authUser, pass } = useContext(UserContext);
    const { id } = useParams();
    // const { courseDetail, setCourseDetail } = useContext(CourseContext); // <<< Error occurs here
    // console.log(id);
    const [details, setDetails] = useState(null);
    const nav = useNavigate();

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
            setDetails(data);
        }, 'message');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = () => {
        iTry(async () => {
            const endpoint = `courses/${id}`;
            const method = 'DELETE';
            const url = `http://localhost:5000/api/${endpoint}`;
            const options = {
                method,
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
            };

            console.log(`${authUser.emailAddress}:${pass}`);
            const encodedCredentials = btoa(`${authUser.emailAddress}:${pass}`);
            options.headers.Authorization = `Basic ${encodedCredentials}`;

            const res = await fetch(url, options);

            console.log(res);
            if (res.status === 204) {
                console.log("DELETE Response:", res);
                nav('/');
                return;
            }
            if (res.status === 400) {
                return;
            }
            throw new Error();

        }, 'message');
        nav('/');
    }

    if (details) {
        const fn = details.student.firstName;
        const ln = details.student.lastName;
        let materialsNeeded = ['* No materials needed for this course.'];
        let estimatedTime = 'No estimate available.';

        if (details.materialsNeeded) materialsNeeded = details.materialsNeeded;
        //     materials.pop();
        // }
        if (details.estimatedTime) estimatedTime = details.estimatedTime;
        console.log(materialsNeeded);

        return (
            <>
                <main>
                    <div className="actions--bar">
                        <div className="wrap">
                            <Link
                                className="button"
                                to={`/courses/${id}/update`}>Update Course</Link>
                            <Link
                                className="button"
                                onClick={handleDelete}
                                to="/">Delete Course</Link>
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
                                    <p>By {fn} {ln}</p>
                                    <p>{details.description}</p>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <p>{materialsNeeded}</p>
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
    return <><p>Loading...</p></>
}

export default CourseDetail;