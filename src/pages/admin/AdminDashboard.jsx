import React, { useState } from "react";
import Details from "./Details"; // Import the Details component
import Upload from "./UploadFiles"; // Import the Upload component
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ContactUsMessages from "./ContactUsMessages";
import FormRequirementDetails from "./FormRequirementDetails";
import SiteManagement from "./sitesManagement/SitesUpdateManagement";
import ShowUserAttendance from "./ShowUserAttendance";
import DailyProgressReport from "./DailyProgressReport";
import ShowHDDForms from "./officialUsers/construction/siteEng/hdd/ShowHDDForm";
import { useAdminAuth } from "../../authContext/AuthContextProvider";
import HDDReport from "./officialUsers/construction/siteEng/hdd/HDDReport";
import WaterManagements from "./managements/WaterManagements";
import { CrossIcon, MenuIcon, MenuSquare, MenuSquareIcon, X } from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [activeComponent, setActiveComponent] = useState("details"); // State to track active component
  const [showMenu, setShowMenu] = useState("hidden");
  const [isHddOpen, setIsHddOpen] = useState(false);
  const [isManOpen, setIsManOpen] = useState(false);

  const { adminUser, adminLogout } = useAdminAuth();

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "details":
        return <Details />;
      case "upload":
        return <Upload />;
      case "contactUsMessages":
        return <ContactUsMessages />;
      case "form-requirements":
        return <FormRequirementDetails />;
      case "sites-management":
        return <SiteManagement />;
      case "showUserAttendance":
        return <ShowUserAttendance />;
      case "dailyProgressReport":
        return <DailyProgressReport />;
      case "filledForm":
        return <ShowHDDForms />;
      case "hddReport":
        return <HDDReport />;
      case "waterMan":
        return <WaterManagements />;
      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

  const handleLogout = () => {
    const allowMe = window.confirm("Are you sure to logout?");
    if (allowMe) {
      // navigate("/");
      adminLogout();
    }
  };

  const getButtonClass = (component) => {
    return activeComponent === component
      ? "w-full  px-2 py-2 bg-blue-300 text-white rounded-none hover:bg-blue-400 hover:border-1 transition duration-100 cursor-pointer"
      : "w-full px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-100 cursor-pointer";
  };

  return (
    <div className="p-0 bg-gray-100 min-h-screen">
      <div className="flex justify-between">
        <div className="text-3xl font-bold text-gray-800 mb-6 ml-2">
          Hi! {data?.user?.name}
        </div>
        {showMenu === "hidden" && window.innerWidth <= 768 && (
          <div
            onClick={() => {
              setShowMenu("flex");
            }}
            className="cursor-pointer mr-1 text-blue-600 hover:text-blue-800 flex items-center px-1 rounded-md"
          >
            <p className="text-2xl font-bold"><MenuIcon size={44}/></p>
          </div>
        )}
      </div>
      <div
        onClick={() => {}}
        className={` flex flex-col gap-1 transition-all duration-1000 ease-in-out 
          ${
            showMenu !== "hidden"
              ? "w-3/4 md:w-1/2 bg-blue-500 h-screen fixed top-24"
              : "hidden sticky top-24"
          } 
          lg:w-full lg:grid lg:grid-cols-6 md:grid-cols-5`}
      >
        <div className="absolute top-0 right-0 text-red-500">
          <X onClick={()=>{setShowMenu("hidden")}} size={40}/>
        </div>
        <button
          onClick={() => {
            setActiveComponent("details");
            setShowMenu("hidden");
          }}
          className={getButtonClass("details")}
        >
          Show Employee
        
        </button>

        <button
          onClick={() => {
            setActiveComponent("upload");
            setShowMenu("hidden");
          }}
          className={getButtonClass("upload")}
        >
          Add Employee
        </button>
        <button
          onClick={() => {
            setActiveComponent("sites-management");
            setShowMenu("hidden");
          }}
          className={getButtonClass("sites-management")}
        >
          Add Site
        </button>
        <button
          onClick={() => {
            setActiveComponent("form-requirements");
            setShowMenu("hidden");
          }}
          className={getButtonClass("form-requirements")}
        >
          Requirements
        </button>

        <button
          onClick={() => {
            setActiveComponent("showUserAttendance");
            setShowMenu("hidden");
          }}
          className={getButtonClass("showUserAttendance")}
        >
          Attendance
        </button>
        <button
          onClick={() => {
            setActiveComponent("dailyProgressReport");
            setShowMenu("hidden");
          }}
          className={getButtonClass("dailyProgressReport")}
        >
          Daily Report
        </button>
        <div className="w-full relative">
          <button
            onClick={() => {
              // setActiveComponent("hdd");
              setIsHddOpen(!isHddOpen);
            }}
            className={getButtonClass("hdd")}
          >
            HDD
          </button>
          {isHddOpen && (
            <ul className="absolute left-0 w-full bg-blue-500 z-50">
              <li
                onClick={() => {
                  setActiveComponent("filledForm");
                  setIsHddOpen(false);
                }}
                className={getButtonClass("filledForm")}
              >
                Filled form
              </li>
              <li
                onClick={() => {
                  setActiveComponent("hddReport");
                  setIsHddOpen(false);
                }}
                className={getButtonClass("hddReport")}
              >
                Report
              </li>
            </ul>
          )}
        </div>
        <div className="w-full relative">
          <button
            onClick={() => {
              // setActiveComponent("hdd");
              setIsManOpen(!isManOpen);
            }}
            className={getButtonClass("hdd")}
          >
            Managements
          </button>
          {isManOpen && (
            <ul className="absolute left-0 w-full bg-blue-500 z-50">
              <li
                onClick={() => {
                  setActiveComponent("waterMan");
                  setIsManOpen(false);
                }}
                className={getButtonClass("waterMan")}
              >
                WaterManagements
              </li>
              <li
                onClick={() => {
                  setActiveComponent("vehicleMan");
                  setIsManOpen(false);
                }}
                className={getButtonClass("vehicleMan")}
              >
                Vehicle Managements
              </li>
            </ul>
          )}
        </div>

        <button
          onClick={() => {setActiveComponent("contactUsMessages"); setShowMenu("hidden");}}
          className={getButtonClass("contactUsMessages") }
        >
          Contact Us
        </button>

        <button
          onClick={() => {handleLogout();; setShowMenu("hidden");}}
          className="w-100 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className="bg-slate-500 h-1 my-12"></div>
      <div className="bg-gray-50 rounded shadow">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
