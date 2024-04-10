/////////////////////////////////////////////////////////////////////////////////////////////////////
//  src\components\Test.js
////////////////////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useContext } from "react";
import CourseContext from "../contexts/CourseContext.js";

const Test = () => {
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

   return (
      <>
         <h1>Test Page</h1>
         <ul>
            {console.log(courses)}
            {courses.map(c => (
               <li key={c.title}>
                  <h2>{c.title}</h2>
                  <p>{c.description}</p>
               </li>
            ))}
         </ul>
      </>
   );
}

export default Test;