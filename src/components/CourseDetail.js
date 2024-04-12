/////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\components\CourseDetail.js
////////////////////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CourseContext from "../contexts/CourseContext.js";

const CourseDetail = () => {
    const { id } = useParams();
    const { courseDetail, setCourseDetail } = useContext(CourseContext); // <<< Error occurs here
    console.log(id);

    useEffect(() => {
        (async () => {
            try {
                console.log("test");
                const endpoint = `courses/${id}`;
                const method = 'GET';
                const url = `http://localhost:5000/api/${endpoint}`;
                const options = {
                    method,
                    headers: {},
                };

                const response = await fetch(url, options);
                const data = await response.json();
                console.log("API URL: ", url, "DATA: ", data);
                setCourseDetail(data);
            } catch (err) {
                console.log(err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(courseDetail);

    if (courseDetail) {
        const fn = courseDetail.student.firstName;
        const ln = courseDetail.student.lastName;
        let materials = ['* No materials needed for this course.'];
        let estimatedTime = 'No estimate available.';

        if (courseDetail.materialsNeeded) {
            materials = courseDetail.materialsNeeded.split('\n');
            materials.pop();
        }
        if (courseDetail.estimatedTime) estimatedTime = courseDetail.estimatedTime;
        console.log(materials);

        return (
            <>
                <header>
                    <div className="wrap header--flex">
                        <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                        <nav>
                            <ul className="header--signedin">
                                <li>Welcome, Joe Smith!</li>
                                <li><a href="sign-out.html">Sign Out</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <div className="actions--bar">
                        <div className="wrap">
                            <a className="button" href="update-course.html">Update Course</a>
                            <a className="button" href="#">Delete Course</a>
                            <a className="button button-secondary" href="index.html">Return to List</a>
                        </div>
                    </div>

                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{courseDetail.title}</h4>
                                    <p>By {fn} {ln}</p>
                                    <p>{courseDetail.description}</p>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        {/**********************************************************
                                        **  MATERIALS LIST 
                                        **********************************************************/}
                                        {materials.map((mat, index) => (
                                            <li key={`mat-${index}`}>{mat.slice(2)}</li>
                                        ))}
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