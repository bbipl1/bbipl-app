import React from "react";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { serverURL } from "../../../../../../utility/URL";
import axios from "axios";

const UpdatePaymentReceivedFromClient = ({ docId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientName, setClientName] = useState(null);
  const [paymentReceivedFromClient, setPaymentReceivedFromClient] =
    useState(null);

  const submit = () => {
    if (!clientName || !paymentReceivedFromClient) {
      return alert("All fields are required.");
    }

    const url = `${serverURL}/api/official-users/construction/site-engineers/hdd-form/update-payment-received-from-client`;
    const headers = {
      "Content-Type": "application/json",
    };
    const payload = {
      clientName,
      paymentReceivedFromClient,
      docId,
    };
    setIsLoading(true);
    axios
      .put(url, payload, headers)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        alert(err?.response?.data?.message);
        console.log(err);
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold my-4">
            Update payment received from client
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 pb-8">
          <div className="flex justify-self-center flex-col">
            <label htmlFor="clientName">Client Name*</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              className="border-2 rounded-md"
              onChange={(e)=>{setClientName(e.target.value)}}
              value={clientName}
            />
          </div>
          <div className="flex justify-self-center flex-col">
            <label htmlFor="amountFromClient">
              Amount received from client*
            </label>
            <input
              type="number"
              id="amountFromClient"
              name="amountFromClient"
              className=" border-2 rounded-md"
              onChange={(e)=>{setPaymentReceivedFromClient(e.target.value)}}
            />
          </div>
          <div></div>
          <div className="flex justify-self-center">
            <div className="relative w-32">
              {isLoading && <LoaderCircle className=" animate-spin mx-auto" />}
              <button onClick={submit} className="m-1 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-28">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePaymentReceivedFromClient;
