import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage';
import { SigninPage } from './pages/SiginPage';
import { AdminPage } from './pages/AdminPage';
import { Dashboard } from './components/Dashboard';
import { Courses } from './components/Courses';
import { Content } from './components/Content';
import { AddNewCourse } from './components/AddNewCourse';
import { MyCourses } from './components/MyCourse';
import { LecturePdf } from './components/LecturePdf';
import { Quizes } from './components/Quizes';
import { CourseVideos } from './components/CourseVideos';
import { UpdateCourse }  from './components/UpdateCourse';
import { CourseDetails } from './components/CourseDetails';
import { ErrorPage } from './components/ErrorPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path = '/' element = {<SignupPage />}/>
          <Route  path = '/signin' element = {<SigninPage />}/>
          <Route  path = '/admin' element = {<AdminPage />} >
            <Route index element = {<Dashboard/>}/> 
            <Route path = 'courses'  element = {<Courses/>} >
              <Route  index element = {<MyCourses />}/>
              <Route path = ':courseId' element = {<CourseVideos />}/>
              <Route  path = 'lectures-notes' element = {<LecturePdf />}/>
              <Route  path = 'quizes' element = {<Quizes />}/>
              <Route path = 'addnewcourse'  element = {<AddNewCourse />} />
              <Route path = 'updatecourse/:courseId' element = { <UpdateCourse />} /> 
              <Route path = 'view-details' element = {<CourseDetails/> } />
              <Route path = 'error-page' element = {<ErrorPage/>} /> 
            </Route>

            <Route path = 'contents'  element = {<Content/>} />
          </Route>
          
        </Routes>      
        
      </BrowserRouter>
    </>

   
  );
}

export default App;
