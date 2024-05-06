////////////////////////////////////////////////////////////////////////////////////////////////////
//  client\src\components\UserSignUp.js
////////////////////////////////////////////////////////////////////////////////////////////////////

import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext.js";
import ErrorList from "./ErrorList.js";

const UserSignUp = () => {
   const { actions } = useContext(UserContext);
   const nav = useNavigate();

   // State
   const rFirstName = useRef(null);
   const rLastName = useRef(null);
   const rEmailAddress = useRef(null);
   const rPassword = useRef(null);
   const [errors, setErrors] = useState([]);

   const handleSubmit = async e => {
      e.preventDefault();

      try {
         // [!REVIEW] Check variable-name compatibility
         const user = {
            firstName: rFirstName.current.value,
            lastName: rLastName.current.value,
            emailAddress: rEmailAddress.current.value,
            password: rPassword.current.value,
         }

         const endpoint = `users`;
         const url = `http://localhost:5000/api/${endpoint}`;
         const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
               'Content-type': 'application/json; charset=utf-8',
            },
         };



         // if (credentials) {
         //    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
         //    options.headers.Authorization = `Basic ${encodedCredentials}`;
         // }

         const res = await fetch(url, options);

         if (res.status === 201) {
            await actions.signIn(user.emailAddress, user.password);
            nav('/');
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
         addErrorMessage(`Error Code: USU-hS-01`);
         nav('/error');
      }
   }

   const handleCancel = e => {
      e.preventDefault();
      nav('/');
   }

   return (
      <main>
         <div className="form--centered">
            <h2>Sign Up</h2>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
               <label htmlFor="firstName">First Name</label>
               <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  ref={rFirstName}
                  defaultValue="Joe" />
               <label htmlFor="lastName">Last Name</label>
               <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  ref={rLastName}
                  defaultValue="Smith" />
               <label htmlFor="emailAddress">Email Address</label>
               <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  ref={rEmailAddress}
                  defaultValue="joe@smith.com" />
               <label htmlFor="password">Password</label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  ref={rPassword}
                  defaultValue="" />
               <button className="button" type="submit">Sign Up</button>
               <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
         </div>
      </main>
   );
}

export default UserSignUp;