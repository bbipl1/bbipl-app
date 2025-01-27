import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import RequirementForm from "./Requirements";
import SiteEngineerAttendanceForm from "./SiteEngineerAttendanceForm";
import SiteEngProfile from "./profile/SiteEngineerProfile";
import ManageWorker from "./profile/ManageWorkers";
import DailyProgress from "./DailyProgress";

const SiteEngDashBoard = () => {
  const location = useLocation();
  const { data } = location.state || {};
  console.log("data is", data);
  const [activeComponent, setActiveComponent] = useState("profile"); // State to track active component

  const navigate = useNavigate();
  // const navigation = useNavigate();
 useEffect(()=>{
  if (!data) {
    // console.log("login");
    // navigate("/authentication/officials/officials-login");
  } else {
    // console.log("not login");
  }
 },[data, navigate])

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <SiteEngProfile siteEngineer={data?.user} />;
      case "RequirementsForm":
        return <RequirementForm />;
      case "daily-progress-report":
        return <DailyProgress user={data?.user} />;
      case "siteEngAttendance":
        return <SiteEngineerAttendanceForm siteEngId={data?.user?.id} />;
      case "workers":
        return <ManageWorker siteEngineerId={data?.user?.id} />;

      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

  const handleLogout = () => {
    const allowMe = window.confirm("Are you sure to logout?");
    if (allowMe) {
      navigate("/authentication/logout");
    }
  };

  const getButtonClass = (component) => {
    return activeComponent === component
      ? "w-100 px-4 py-2 bg-gray-300 text-black rounded hover:bg-blue-700 transition duration-100"
      : "w-100 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-100";
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-14">
          Hi! {data?.user?.name}
        </h1>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <button
          onClick={() => setActiveComponent("profile")}
          className={getButtonClass("profile")}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveComponent("workers")}
          className={getButtonClass("upload")}
        >
          Workers
        </button>

        <button
          onClick={() => setActiveComponent("RequirementsForm")}
          className={getButtonClass("upload")}
        >
          Requirement Forms
        </button>
        <button
          onClick={() => setActiveComponent("daily-progress-report")}
          className={getButtonClass("upload")}
        >
          Daily Progress Report
        </button>

        <button
          onClick={() => setActiveComponent("siteEngAttendance")}
          className={getButtonClass("sites-management")}
        >
          Attendance
        </button>

        <button
          onClick={() => handleLogout()}
          className="w-100 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className="bg-slate-500 h-1 my-2"></div>
      <div className="bg-gray-50 rounded shadow">{renderComponent()}</div>
    </div>
  );
};

export default SiteEngDashBoard;
