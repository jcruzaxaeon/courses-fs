//  src\App.js

import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Test from './components/Test.js';
import Header from './components/Header.js';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import UserSignin from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';
import UserSignUp from './components/UserSignUp.js';
import CreateCourse from './components/CreateCourse.js';

function App() {
   return (
      <div className="App">
         <Header />
         <Routes>
            <Route path='/' element={<Courses />} /> {/* /api/courses */}
            <Route path='/:id' element={<CourseDetail />} />  {/* GET  /api/courses/:id */}
            <Route path='/signin' element={<UserSignin />} /> {/* GET  /api/users */}
            <Route path='/signup' element={<UserSignUp />} /> {/* POST /api/users */}
            <Route path='/signout' element={<UserSignOut />} />
            <Route path='/courses' element={<CreateCourse />} />
         </Routes>
      </div>
   );
}

export default App;
