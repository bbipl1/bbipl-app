import axios from "axios";
import React from "react";

const serverURL = process.env.REACT_APP_SERVER_URL;

const ShowQR = ({ item,isQROpen,url }) => {
  const paymentNotDone = () => {
    isQROpen(false)
  };
  const paymentDone = () => {
     // Resetting URL (optional, depending on your use case)

    const data = {
      newStatus: "Received", // Ensure the backend expects `newStatus`
      objectId: item?._id, // Pass the correct ObjectId
    };

    const url = `${serverURL}/api/forms/update-requirements-forms`;

    axios
      .put(url, data)
      .then((response) => {
        // Handle successful update
        console.log("Payment status updated successfully:", response?.data);
        alert("Payment status updated successfully!");
        // Optional: Perform additional actions like refreshing data
      })
      .catch((error) => {
        // Handle errors
        console.error(
          "Error updating payment status:",
          error?.response?.data || error?.message
        );
        alert("Failed to update payment status. Please try again.");
      });
  };

  return (
    <div className="bg-slate-100 fixed z-50 left-0 right-0 top-0 bottom-0 flex justify-self-center  self-center flex-col w-11/12 md:w-9/12 lg:w-1/2 h-3/4 p-4 border-2 border-spacing-4 border-blue-600 rounded-lg">
        <div className="flex justify-between content-evenly">
            <span className="text-xl font-bold ml-4">{item?.name}</span>
            <span className="text-xl font-bold mr-4">Requested: Rs. {item?.expenses?.required}/-</span>
            <span className="text-xl font-bold mr-4">Sent:     Rs. {item?.expenses?.received}/-</span>
            <span className="text-xl font-bold mr-4">To pay:   Rs. {item?.expenses?.required-item?.expenses?.received}/-</span>
        </div>
      <div className="flex justify-center items-center p-4">
        <img className="w-96 h-80 md:h-96 lg:h-96" src={`${item?.expenses?.qrURL}`} alt={`url`} />
      </div>

      <div className=" flex flex-col justify-center items-center gap-4 md:flex-row lg:flex-row">
        <div>
          {item?.expenses?.status === "Unpaid" ? (
            <div>
              <button
                onClick={() => {
                  paymentNotDone();
                }}
                className="bg-red-500 p-2 rounded-lg w-48 text-white"
              >
                Not Pay
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  paymentNotDone();
                }}
                className="bg-red-500 p-2 rounded-lg w-48 text-white"
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="">
          {item?.expenses?.status === "Unpaid" ? (
            <>
              <button
                disabled={item?.paymentStatus === "Received"}
                onClick={() => {
                  paymentDone();
                }}
                className={`p-2 rounded-lg w-48 text-white bg-green-500 hover:bg-green-600 cursor-pointer
              }`}
              >
                Pay
              </button>
            </>
          ) : (
            <>
              <button
                disabled={item?.paymentStatus === "Received"}
                onClick={() => {
                  paymentDone();
                }}
                className={`p-2 rounded-lg w-48 text-white 
               
                  bg-gray-400 cursor-not-allowed
                 
              }`}
              >
                Payment Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowQR;
