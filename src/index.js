
/* custom map css */
import 'leaflet/dist/leaflet.css';


import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";

// protected routes
import Layout from "./layout/Layout";
import Home from "./layout/Home";
import Error from "./Error.jsx";
import Signup from "./authentication/officials/SignUp.jsx";
import Login from "./authentication/officials/Login.jsx";
import WorkerAttendance from "./pages/officials/constructions/WorkerAttendance.jsx";
import About from "./pages/About.jsx";
// import Services from './pages/Services.jsx';
import MainServices from "./pages/services/MainService.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DeveloperAttendanceForm from "./pages/DeveloperAttendanceForm.jsx";
import FinanceAttendanceForm from "./pages/DevAndFinAttendanceForm.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import RequirementForm from "./pages/officials/constructions/siteEngineer/Requirements.jsx";

// login
import UserForgotPassword from "./authentication/users/UserForgotPassword.jsx";
import UserLogin from "./authentication/users/UserLogin.jsx";
import UserSignUp from "./authentication/users/UserSignUp.jsx";

//officials

import OfficialForgotPasswordForAdm from "./authentication/officials/OfficialForgotPasswordForAdm.jsx";
import OfficialForgotPasswordForDev from "./authentication/officials/OfficialForgotPasswordForAdm.jsx";
import OfficialForgotPasswordForConAndFin from "./authentication/officials/OfficialForgotPasswordForConAndFin.jsx";
import ConstructionsDashBoard from "./pages/officials/constructions/ConstructionsDashBoard.jsx";
import Logout from "./components/admin/Logout.jsx";
import FinanceDashBoard from "./pages/officials/finance/FinanceDashBoard.jsx";
import SiteEngDashBoard from "./pages/officials/constructions/siteEngineer/siteEngDashBoard.jsx";
import PrivacyPolicy from "./conditions/Privacy&Policy.jsx";
import TermsAndConditions from "./conditions/Terms&Conditions.jsx";
import Disclaimer from "./conditions/Dislaimers.jsx";
import RefundPolicy from "./conditions/RefundPolicy.jsx";
import CookiesPolicy from "./conditions/CookiesPolicy.jsx";
import CustomMap from "./pages/map/CustomMap.jsx";
// const routerFromelements=

// Non-protected-routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      {/* protected-routes */}
      <Route path="" element={<Home />}></Route>
      {/* login */}
      <Route
        path="authentication/officials/officials-login"
        element={<Login />}
      ></Route>

      <Route path="authentication/logout" element={<Logout />} />

      <Route
        path="authentication/officials/cons-and-fin-forgot-password"
        element={<OfficialForgotPasswordForConAndFin />}
      ></Route>
      <Route
        path="bbipl-dev-forgot"
        element={<OfficialForgotPasswordForDev />}
      ></Route>
      <Route
        path="bbipl-adm-forgot"
        element={<OfficialForgotPasswordForAdm />}
      ></Route>

      {/* user */}
      <Route
        path="authentication/users/user-login"
        element={<UserLogin />}
      ></Route>
      <Route
        path="authentication/users/user-sign-up"
        element={<UserSignUp />}
      ></Route>
      <Route
        path="authentication/users/user-forgot-password"
        element={<UserForgotPassword />}
      ></Route>
      <Route path="authentication/sign-up" element={<Signup />}></Route>
      <Route path="pages/admin-dashboard" element={<AdminDashboard />}></Route>
      <Route path="pages/admin" element={<Admin />}></Route>
      <Route
        path="pages/developer-attendance-form"
        element={<DeveloperAttendanceForm />}
      ></Route>
      <Route
        path="pages/finance-attendance-form"
        element={<FinanceAttendanceForm />}
      ></Route>

      {/* contructions */}
      {/* site-engineerroutes */}
      <Route
        path="pages/constructions/site-engineer-dashboard"
        element={<SiteEngDashBoard />}
      ></Route>
      <Route
        path="pages/construction-dashboard"
        element={<ConstructionsDashBoard />}
      ></Route>
      <Route path="pages/about" element={<About />}></Route>
      <Route path="pages/services" element={<MainServices />}></Route>
      <Route path="pages/contact-us" element={<ContactUs />}></Route>
      <Route
        path="pages/forms/requirements"
        element={<RequirementForm />}
      ></Route>
      <Route
        path="pages/dashboard/finance"
        element={<FinanceDashBoard />}
      ></Route>
      <Route path="worker" element={<WorkerAttendance />}></Route>

      {/* Non-protected-routes */}

      <Route path="pages/privacy-policy" element={<PrivacyPolicy/>}></Route>
      <Route path="pages/terms-and-conditions" element={<TermsAndConditions/>}></Route>
      <Route path="pages/disclaimers" element={<Disclaimer/>}></Route>
      <Route path="pages/refund-policy" element={<RefundPolicy/>}></Route>
      <Route path="pages/cookies-policy" element={<CookiesPolicy/>}></Route>

      {/* custom map */}
      <Route path="pages/map" element={<CustomMap/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
