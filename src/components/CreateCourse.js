/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\CreateCourse.js
/////////////////////////////////////////////////////////////////////////////////////////////////
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext.js";
import ErrorList from "./ErrorList.js";

const CreateCourse = () => {
   const { authData, pass } = useContext(UserContext);
   const nav = useNavigate();

   // LOCAL
   const title = useRef(null);
   const description = useRef(null);
   const estimatedTime = useRef(null);
   const materialsNeeded = useRef(null);
   const [errors, setErrors] = useState([]);

   const handleSubmit = async e => {
      e.preventDefault();

      try {
         const course = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authData.user.id,
         }

         console.log('In Try-Catch: ', course);
         const endpoint = `courses`;
         const url = `http://localhost:5000/api/${endpoint}`;
         const options = {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
               'Content-type': 'application/json; charset=utf-8',
            },
         };

         const encodedCredentials = btoa(`${authData.user.emailAddress}:${pass}`);
         options.headers.Authorization = `Basic ${encodedCredentials}`;

         const response = await fetch(url, options);

         if (response.status === 201) {
            console.log(response);
            nav('/');
            return;
         }
         if (response.status === 400) {
            const data = await response.json();
            console.log(data.errors);
            setErrors(data.errors);
            return;
         }
         throw new Error();

      } catch (err) { console.log(err) }
   }

   const handleCancel = e => {
      e.preventDefault();
      nav('/');
   }

   if (authData) {
      return (
         <main>
            <div className="wrap">
               <h2>Create Course</h2>
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
                           defaultValue="" />
                        <p>By {`${authData.user.firstName} ${authData.user.lastName}`}</p>

                        {/* COURSE DESCRIPTION */}
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                           ref={description}
                           id="courseDescription"
                           name="courseDescription"></textarea>
                     </div>
                     <div>

                        {/* ESTIMATED TIME */}
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                           ref={estimatedTime}
                           id="estimatedTime"
                           name="estimatedTime"
                           type="text"
                           defaultValue="" />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                           ref={materialsNeeded}
                           id="materialsNeeded"
                           name="materialsNeeded"></textarea>
                     </div>
                  </div>
                  <button className="button" type="submit">Create Course</button>
                  <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
               </form>
            </div>
         </main>
      );
   }
   return <><p>Loading...</p></>
}

export default CreateCourse;