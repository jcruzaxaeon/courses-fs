

//  client\src\components\UserSignUp.js

import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext.js";
import ErrorMessageContext from "../contexts/ErrorMessageContext.js";
import ErrorList from "./ErrorList.js";

/**
 * ## `UserSignUp`
 * Page Component
 * 
 * @module UserSignUp
 * @returns {JSX.Element} `<main>` signup form
 * @ReactComponent
 */
const UserSignUp = () => {
   const { actions } = useContext(UserContext);
   const { addErrorMessage } = useContext(ErrorMessageContext);
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

         const res = await fetch(url, options);
         let data = null;
         try { data = await res.json(); } catch {}

         // (SUCCESS) User signed up
         if (res.status === 201) {
            await actions.signIn(user.emailAddress, user.password);
            nav('/');
            return;
         }
         // Catch empty required-fields; Populate errors for <ErrorList />
         if (res.status === 400) {
            setErrors(data.errors);
            return;
         }
         // Catch codes != 200-series HTTP status codes
         if (!res.ok) {
            addErrorMessage(`HTTP Status Code: ${res.status}`);
            nav('/error');
            return;
         }
         // (Default) Catch unexpected 200-series HTTP status codes
         addErrorMessage(`HTTP Status Code ${res.status}: ${data.msg}`);
         nav('/error');
      }
      catch (err) {
         // Catch network issues 
         console.log(err);
         addErrorMessage(`Error Code: USU-hS1`);
         nav('/error');
      }
   }

   /**
    * Handles click on Cancel-button
    * - Navigates back to the home page
    * @function handleCancel
    * @param {Event} e - Click-event object
    */
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
                  placeholder="Joe" />
               <label htmlFor="lastName">Last Name</label>
               <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  ref={rLastName}
                  placeholder="Smith" />
               <label htmlFor="emailAddress">Email Address</label>
               <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  ref={rEmailAddress}
                  placeholder="joe@smith.com" />
               <label htmlFor="password">Password</label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  ref={rPassword}
                  placeholder="" />
               <button className="button" type="submit">Sign Up</button>
               <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
         </div>
      </main>
   );
}

export default UserSignUp;