/////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\components\Courses.js
////////////////////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import CourseContext from "../contexts/CourseContext.js";

const Courses = () => {
   const { courses, setCourses } = useContext(CourseContext); // <<< Error occurs here

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

            const response = await fetch(url, options);
            const data = await response.json();
            setCourses(data);
         } catch (err) {
            console.log(err);
         }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   console.log(courses);

   return (
      <div id="root">
         <main>
            <div className="wrap main--grid">
               {/***********************************************************************************
               **  COURSE LIST 
               ***********************************************************************************/}
               {courses.map(c => (
                  <Link 
                     key={c.title} 
                     className="course--module course--link"
                     to={`/${c.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{c.title}</h3>
                  </Link>
               ))}
               <Link className="course--module course--add--module" to="/courses">
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

export default Courses;