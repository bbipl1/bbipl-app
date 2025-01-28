import React from "react";

const ShowProRepInDetail = ({ report ,isOpen,open}) => {
  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No data available to display.</p>
      </div>
    );
  }

  console.log(report)

 
  return (
    <div className="w-full h-full fixed top-16 mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
        <button onClick={()=>{isOpen(false);}} className=" absolute right-0 mr-12 w-24 bg-white p-2 rounded-md border-2 border-red-400 font-bold text-lg">Close</button>
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Daily Progress Report</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* General Info */}
        <div>
          <h2 className="font-semibold text-lg text-gray-600">General Info</h2>
          <p>
            <strong>ID:</strong> {report.id}
          </p>
          <p>
            <strong>Name:</strong> {report.name}
          </p>
          <p>
            <strong>Site Name:</strong> {report.siteName}
          </p>
          <p>
            <strong>Work Type:</strong> {report.workType}
          </p>
        </div>

        {/* Date & Time */}
        <div>
          <h2 className="font-semibold text-lg text-gray-600">Date & Time</h2>
          <p>
            <strong>Date:</strong> {report.date}
          </p>
          <p>
            <strong>Time:</strong> {report.time}
          </p>
          <p>
            <strong>Day:</strong> {report.day}
          </p>
        </div>

        {/* Today's Work */}
        <div>
          <h2 className="font-semibold text-lg text-gray-600">Today's Work</h2>
          <ul className="list-disc list-inside">
            {report.todaysWork?.map((work, index) => (
              <li key={index}>{work}</li>
            ))}
          </ul>
        </div>

        {/* Machinery Used */}
        <div>
          <h2 className="font-semibold text-lg text-gray-600">Machinery Used</h2>
          <ul className="list-disc list-inside">
            {report.machinaryUsed?.map((machinery, index) => (
              <li key={index}>{machinery}</li>
            ))}
          </ul>
        </div>

        {/* Expenses */}
        <div className="col-span-1 sm:col-span-2">
          <h2 className="font-semibold text-lg text-gray-600">Expenses</h2>
          <p>
            <strong>Category:</strong>{" "}
            {report.expenses.Category?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Required:</strong> {report.expenses.required}
          </p>
          <p>
            <strong>Received:</strong> {report.expenses.received || "N/A"}
          </p>
          <p>
            <strong>QR URL:</strong>{" "}
            <img className="w-28 h-28" src={report.expenses.qrURL} alt="" />
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`${
                report.expenses.status === "Paid"
                  ? "text-green-500"
                  : report.expenses.status === "PartialPaid"
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {report.expenses.status}
            </span>
          </p>
          <p>Remark: {report.remarks}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProRepInDetail;
