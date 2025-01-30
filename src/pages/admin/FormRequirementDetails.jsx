import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageShow from "../../components/admin/ImageShow";
const serverURL = process.env.REACT_APP_SERVER_URL;

const FormRequirementDetails = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isURL, setIsURL] = useState(null);
  const [form, setForm] = useState(null);
  const [showMaterials, setShowMaterials] = useState(false);
  const [selectedshowMaterials, setSelectedShowMaterials] = useState(false);

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

  const showMaterialsused = (form) => {
    return (
      <div className=" overflow-y-auto fixed w-5/6 h-5/6 md:w-4/6 md:h-4/6 lg:w-1/2 lg:5/6 top-28 left-96 bg-slate-100 rounded-lg border-2 border-blue-100 p-4">
        <h1 className="flex justify-center font-bold text-lg mb-4">Materials Required</h1>
        <hr className="mb-4"/>
        <div className="grid grid-cols-3 gap-4">
          {form?.materialUsed?.map((item) => {
            return (
              <div>
                {" "}
                <>
                  <p> Name : {item.name}</p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Price : {item.price}</p>
                  <p>Remarks : {item.remarks}</p>
                </>{" "}
                <hr className="m-2" />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="w-24 m-2 p-2 rounded-md bg-red-500 text-white"
            onClick={() => {
              setShowMaterials(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-1 bg-white shadow rounded-lg">
      {/* <h2 className="text-2xl font-bold mb-4">Form Details</h2> */}
      <div>{showMaterials && showMaterialsused(selectedshowMaterials)}</div>
      {formDetails.length > 0 ? (
        <table className="table-fixed overflow-hidden w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="border border-gray-300 px-4 py-2">Employee ID</th> */}
              <th className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                ID
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2">
                Name
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">
                Mobile
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">
                Site Name
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden overflow-hidden lg:table-cell">
                Type of Work
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">
                Submission Date
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 overflow-hidden flex justify-start items-start lg:table-cell">
                Requirement Date
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden overflow-hidden lg:table-cell">
                Requirements
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 overflow-hidden lg:table-cell">
                Materials Required
              </th>
              <th className="border border-gray-300 px-0 md:px-4 lg:px-4 py-2 hidden lg:table-cell">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {formDetails.map((form, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 p-4 rounded-md `}
                onClick={() => {
                  setShowMaterials(true);
                  setSelectedShowMaterials(form)
                }}
              >
                <td className="border border-gray-300 px-4 py-2  hidden lg:table-cell">
                  {form.id}
                </td>
                <td id="x" className="border border-gray-300 px-4 py-2">
                  {form.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.mobile}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">{"empty"}</td> */}
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.siteName}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.workType}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {form.dateOfRequirement}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">
                  {form.requirements}
                </td>

                <td className="border border-gray-300 px-4 py-2 hidden lg:table-cell">Click me</td>
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
