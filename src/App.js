//  src\App.js

import { Routes, Route } from 'react-router-dom';
// import Test from './components/Test.js';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import UserSignin from './components/UserSignIn.js';

import './App.css';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Courses />} /> {/* /api/courses */}
            <Route path='/:id' element={<CourseDetail />} /> {/* /api/courses/:id */}
            <Route path='/signin' element={<UserSignin />} /> {/* /api/users */}
         </Routes>
      </div>
   );
}

export default App;
