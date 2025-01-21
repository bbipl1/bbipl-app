import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageShow from "../../components/admin/ImageShow";
const serverURL = process.env.REACT_APP_SERVER_URL;

const FormRequirementDetails = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isURL, setIsURL] = useState(null);
  const [form, setForm] = useState(null);

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

  const handleUrl = (url, form) => {
    setIsURL(url);
    setForm(form);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading form details...</p>;
  }

  return (
    <div className="p-1 bg-white shadow rounded-lg">
      {/* <h2 className="text-2xl font-bold mb-4">Form Details</h2> */}
      {formDetails.length > 0 ? (
        <table className="table-fixed overflow-hidden w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="border border-gray-300 px-4 py-2">Employee ID</th> */}
              <th className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                Employee Type
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2">Name</th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">Mobile</th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">Site Name</th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden overflow-hidden lg:table-cell">Type of Work</th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">
                Submission Date
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 overflow-hidden flex justify-start items-start lg:table-cell">
                Requirement Date
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden overflow-hidden lg:table-cell">
                Requirement Type
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 overflow-hidden lg:table-cell">
                Expense Amount
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden overflow-hidden lg:table-cell ">Expense Type</th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 overflow-hidden lg:table-cell">Payment Mode</th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 overflow-hidden hidden lg:table-cell">
                Payment Status
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formDetails.map((form, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 p-4 rounded-md ${
                  form.paymentStatus === "Pending"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
                onClick={() => {
                  handleUrl(form.paymentMethod, form);
                }}
              >
                <td className="border border-gray-300 px-4 py-2  hidden lg:table-cell">
                  {form.empType}
                </td>
                <td id='x' className="border border-gray-300 px-4 py-2">
                  {form.empName}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.empMobile}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">{"empty"}</td> */}
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.siteName}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.workTypeName}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {form.dateOfRequirement}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.requirementType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {form.expensesAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.expensesType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                  className="w-24 h-16 lg:h-20"
                    src={`${form.paymentMethod}`}
                    alt={`${form.paymentMethod}`}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.paymentStatus}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No form details found.</p>
      )}
      {isURL && (
        <div>
          <ImageShow form={form} url={isURL} setIsURL={setIsURL} />
        </div>
      )}
    </div>
  );
};

export default FormRequirementDetails;
