

// client\src\index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CourseProvider } from './contexts/CourseContext.js';
import { UserProvider } from './contexts/UserContext.js';
import { ErrorMessageProvider } from './contexts/ErrorMessageContext.js';

import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

import './styles/reset.css';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <ErrorMessageProvider>
            <UserProvider>
               <CourseProvider>
                  <App />
               </CourseProvider>
            </UserProvider>
         </ErrorMessageProvider>
      </BrowserRouter>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
