import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Layout from './layout/Layout';
import Home from './layout/Home'
import Error from './Error.jsx'
import Signup from './authentication/SignUp.jsx';
import Login from './authentication/Login.jsx';
import WorkerAttendance from './pages/WorkerAttendance.jsx'
import About from './pages/About.jsx';
// import Services from './pages/Services.jsx';
import MainServices from './pages/services/MainService.jsx'
import ContactUs from './pages/ContactUs.jsx';
import DeveloperAttendanceForm from './pages/DeveloperAttendanceForm.jsx';
import FinanceAttendanceForm from './pages/FinanceAttendanceForm.jsx';
import Admin from './pages/admin/Admin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import RequirementForm from './pages/forms/Requirements.jsx';

// const routerFromelements=
const router=createBrowserRouter(createRoutesFromElements(
  <Route  path='/' element={<Layout/>} errorElement={<Error/>}>
    <Route path='' element={<Home/>}></Route>
    <Route path='authentication/login' element={<Login/>}></Route>
    <Route path='authentication/sign-up' element={<Signup/>}></Route>
    <Route path='pages/admin-dashboard' element={<AdminDashboard/>}></Route>
    <Route path='pages/admin' element={<Admin/>}></Route>
    <Route path='pages/developer-attendance-form' element={<DeveloperAttendanceForm/>}></Route>
    <Route path='pages/finance-attendance-form' element={<FinanceAttendanceForm/>}></Route>
    <Route path='pages/civil-attendance-form' element={<WorkerAttendance/>}></Route>
    <Route path='pages/about' element={<About/>}></Route>
    <Route path='pages/services' element={<MainServices/>}></Route>
    <Route path='pages/contact-us' element={<ContactUs/>}></Route>
    <Route path='pages/forms/requirements' element={<RequirementForm/>}></Route>
    

  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>
);


