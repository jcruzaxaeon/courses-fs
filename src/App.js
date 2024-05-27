

//  src\App.js

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';
import UserSignUp from './components/UserSignUp.js';
import CreateCourse from './components/CreateCourse.js';
import UpdateCourse from './components/UpdateCourse.js';
import PrivateRoute from './components/PrivateRoute.js';
import NotFound from './components/NotFound.js';
import Forbidden from './components/Forbidden.js';
import Error from './components/Error.js';

/**
 * # App
 * The main application component.
 *
 * @component App
 * @returns {JSX.Element} The App component.
 */
function App() {
   return (
      <div className="App">
         <Header />
         <Routes>
            <Route path='/' element={<Courses />} /> {/* /api/courses */}
            <Route path='courses/:id' element={<CourseDetail />} />  {/* GET  /api/courses/:id */}
            <Route element={<PrivateRoute />}>
               <Route path='/courses/create' element={<CreateCourse />} />
               <Route path='/courses/:id/update' element={<UpdateCourse />} /></Route>
            <Route path='/signin' element={<UserSignIn />} /> {/* GET  /api/users */}
            <Route path='/signup' element={<UserSignUp />} /> {/* POST /api/users */}
            <Route path='/signout' element={<UserSignOut />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/forbidden' element={<Forbidden />} />
            <Route path='/error' element={<Error />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
      </div>
   );
}

export default App;
