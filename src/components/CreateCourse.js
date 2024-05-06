/////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\CreateCourse.js
/////////////////////////////////////////////////////////////////////////////////////////////////
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext.js";
import ErrorMessageContext from "../contexts/ErrorMessageContext.js";
import ErrorList from "./ErrorList.js";

import { getPassword } from '../utils/cryptoUtils.js';

const CreateCourse = () => {
   const { authData } = useContext(UserContext);
   const { addErrorMessage } = useContext(ErrorMessageContext);
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

         const endpoint = `courses`;
         const url = `http://localhost:5000/api/${endpoint}`;
         const options = {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
               'Content-type': 'application/json; charset=utf-8',
            },
         };

         const pass = await getPassword();
         const encodedCredentials = btoa(`${authData.user.emailAddress}:${pass}`);
         options.headers.Authorization = `Basic ${encodedCredentials}`;

         const res = await fetch(url, options);

         if (res.status === 201) {
            nav('/');
            return;
         }
         // Populate <ErrorList /> for empty required-inputs
         if (res.status === 400) {
            const data = await res.json();
            setErrors(data.errors);
            return;
         }
         if (!res.ok) {
            addErrorMessage(`HTTP Status Code: ${res.status}`);
            nav('/error');
            return;
         }
      } catch (err) {
         console.log(err);
         addErrorMessage(`Error Code: CC-hS-01`);
         nav('/error');
      }
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
   return <div className="wrap"><p>Loading...</p></div>;
}

export default CreateCourse;