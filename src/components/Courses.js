

//  client\src\components\Courses.js
//  - (MAIN-PAGE)

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessageContext from "../contexts/ErrorMessageContext.js";
import CourseContext from "../contexts/CourseContext.js";

/**
 * ## `Courses`
 * Page Component
 * - Fetch and render all courses
 * - MAIN-PAGE (Landing Page)
 * 
 * @module Courses
 * @returns {JSX.Element} `<main>` shows all courses
 * @ReactComponent
 */
const Courses = () => {
   const { fetchCourses } = useContext(CourseContext);
   const { addErrorMessage } = useContext(ErrorMessageContext);
   const [courses, setCourses] = useState(null);
   const nav = useNavigate();

   useEffect(() => {
      (async () => {
         try {
            const endpoint = 'courses';
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
            // (SUCCESS)
            if (res.status === 200) {
               setCourses(data);
               return;
            }
            // (Default) Catch unexpected 200-series HTTP status codes
            addErrorMessage(`HTTP Status Code ${res.status}: ${data.msg}`);
            nav('/error');
         }
         // Catch network issues
         catch (err) {
            console.log(err);
            addErrorMessage(`Encountered a Network Error (Co-uE1)`);
            nav('/error');
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fetchCourses]); // Triggered on course deletion

   if (!courses) return <div className="wrap"><p>Loading...</p></div>;
   // [!TODO] Improve user-experience for "no-courses" error handling
   if (courses.length === 0) return (
      <>
         <div id="root">
            <main>
               <div className="wrap main--grid">
                  <p>No classes found in database.</p>
               </div>
            </main>
         </div>
      </>
   );
   
   // (Main)
   if (courses) {
      return (
         <div id="root">
            <main>
               <div className="wrap main--grid">
                  {courses.map(c => (
                     <Link
                        key={c.title}
                        className="course--module course--link"
                        to={`/courses/${c.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{c.title}</h3>
                     </Link>
                  ))}
                  <Link className="course--module course--add--module" to="/courses/create">
                     <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                           viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                     </span>
                  </Link>
               </div>
            </main>
         </div>
      );
   }
   return <div className="wrap"><p>Loading...</p></div>;
}

export default Courses;