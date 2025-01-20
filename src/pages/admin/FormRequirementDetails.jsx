import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageShow from "../../components/admin/ImageShow";
const serverURL = process.env.REACT_APP_SERVER_URL;

const FormRequirementDetails = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isURL,setIsURL]=useState(null)

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
              {/* <th className="border border-gray-300 px-4 py-2">Employee ID</th> */}
              <th className="border border-gray-300 px-4 py-2">Employee Type</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Site Name</th>
              <th className="border border-gray-300 px-4 py-2">Type of Work</th>
              <th className="border border-gray-300 px-4 py-2">Submission Date</th>
              <th className="border border-gray-300 px-4 py-2">Requirement Date</th>
              <th className="border border-gray-300 px-4 py-2">Requirement Type</th>
              <th className="border border-gray-300 px-4 py-2">Expense Amount</th>
              <th className="border border-gray-300 px-4 py-2">Expense Type</th>
              <th className="border border-gray-300 px-4 py-2">Payment Mode</th>
              <th className="border border-gray-300 px-4 py-2">Payment Status</th>
              <th className="border border-gray-300 px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formDetails.map((form, index) => (
              <tr key={index} className="hover:bg-gray-50"
              onClick={()=>{setIsURL(form.paymentMethod)}}
              >
                <td className="border border-gray-300 px-4 py-2">{form.empType}</td>
                <td className="border border-gray-300 px-4 py-2">{form.empName}</td>
                <td className="border border-gray-300 px-4 py-2">{form.empMobile}</td>
                {/* <td className="border border-gray-300 px-4 py-2">{"empty"}</td> */}
                <td className="border border-gray-300 px-4 py-2">{form.siteName}</td>
                <td className="border border-gray-300 px-4 py-2">{form.workTypeName}</td>
                <td className="border border-gray-300 px-4 py-2">{form.date}</td>
                <td className="border border-gray-300 px-4 py-2">{form.dateOfRequirement}</td>
                <td className="border border-gray-300 px-4 py-2">{form.requirementType}</td>
                <td className="border border-gray-300 px-4 py-2">{form.expensesAmount}</td>
                <td className="border border-gray-300 px-4 py-2">{form.expensesType}</td>
                <td  className="border border-gray-300 px-4 py-2">
                  <img src={`${form.paymentMethod}`} alt={`${form.paymentMethod}`} />
                </td>
                <td className="border border-gray-300 px-4 py-2">{form.paymentStatus}</td>
                <td className="border border-gray-300 px-4 py-2">{form.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p className="text-gray-500">No form details found.</p>
      )}
      {isURL && <div>
        <ImageShow url={isURL} setIsURL={setIsURL}/>
        </div>}
      
    </div>
  );
};

export default FormRequirementDetails;
