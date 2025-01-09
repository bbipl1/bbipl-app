import React, { useState } from 'react';
import Details from './Details'; // Import the Details component
import Upload from './UploadFiles';   // Import the Upload component
import Others from './Others';   // Import the Others component
import { Navigate, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeComponent, setActiveComponent] = useState("details"); // State to track active component

    const navigate=useNavigate()

    const renderComponent = () => {
        switch (activeComponent) {
            case 'details':
                return <Details />;
            case 'upload':
                return <Upload />;
            case 'others':
                return <Others />;
            default:
                return <p className="text-gray-600">Please select an option from above.</p>;
        }
    };

    const handleLogout=()=>{
        // alert("navigating")
        navigate("/")
    }

    return (
        <div className="p-1 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-14">Admin Dashboard</h1>
            <div className="space-x-4 mb-6 ml-14">
                <button
                    onClick={() => setActiveComponent('details')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                    Show Details
                </button>
                <button
                    onClick={() => setActiveComponent('upload')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                    Upload Files
                </button>
                <button
                    onClick={() => setActiveComponent('others')}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200"
                >
                    Others
                </button>
                <button
                    onClick={() => handleLogout()}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
            <div className=" bg-gray-50 rounded shadow">
                {renderComponent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
