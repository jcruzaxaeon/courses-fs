//  src\App.js

import { Routes, Route } from 'react-router-dom';
// import Test from './components/Test.js';
import Header from './components/Header.js';
import Courses from './components/Courses.js';
import CourseDetail from './components/CourseDetail.js';
import UserSignin from './components/UserSignIn.js';
import UserSignOut from './components/UserSignOut.js';

import './App.css';

function App() {
   return (
      <div className="App">
         <Header />
         <Routes>
            <Route path='/' element={<Courses />} /> {/* /api/courses */}
            <Route path='/:id' element={<CourseDetail />} /> {/* /api/courses/:id */}
            <Route path='/signin' element={<UserSignin />} /> {/* /api/users */}
            <Route path='/signout' element={<UserSignOut />} />
         </Routes>
      </div>
   );
}

export default App;
