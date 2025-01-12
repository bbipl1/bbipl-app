import React, { useEffect, useState } from "react";
import axios from "axios";
const serverURL = process.env.REACT_APP_SERVER_URL;

const FormRequirementDetails = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFormDetails = async () => {
    const url = `${serverURL}/api/forms/get-requirements-forms`;

    try {
      const response = await axios.get(url);
      setFormDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching form details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormDetails();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading form details...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* <h2 className="text-2xl font-bold mb-4">Form Details</h2> */}
      {formDetails.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Site Name</th>
              <th className="border border-gray-300 px-4 py-2">Submission Date</th>
              <th className="border border-gray-300 px-4 py-2">Requirement Date</th>
              <th className="border border-gray-300 px-4 py-2">Requirement Type</th>
              <th className="border border-gray-300 px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formDetails.map((form, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{form.empId}</td>
                <td className="border border-gray-300 px-4 py-2">{form.empName}</td>
                <td className="border border-gray-300 px-4 py-2">{form.siteName}</td>
                <td className="border border-gray-300 px-4 py-2">{form.date}</td>
                <td className="border border-gray-300 px-4 py-2">{form.dateOfRequirement}</td>
                <td className="border border-gray-300 px-4 py-2">{form.requirementType}</td>
                <td className="border border-gray-300 px-4 py-2">{form.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No form details found.</p>
      )}
    </div>
  );
};

export default FormRequirementDetails;
