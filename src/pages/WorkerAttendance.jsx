import React, { useState, useEffect, useRef } from "react";
import AWS from 'aws-sdk'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { postData } from "../api/AttendanceUpload";



const S3_BUCKET='bpipl-attendance-image'
const REGION='ap-south-1'
const access_key=process.env.REACT_APP_ACCESS_KEY
const secrect_access_key=process.env.REACT_APP_SECRECT_ACCESS_KEY
const serverURL=process.env.REACT_APP_SERVER_URL

AWS.config.update({
  accessKeyId: access_key,
  secretAccessKey: secrect_access_key,})

function AttendanceForm() {
  //video
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isVideoUploaded,setisVideoUploaded]=useState(false);
  const [videoUploadText,setVideoUploadText]=useState("Upload Video")
  //selfie
  const [selfieURL,setSelfieURL]=useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSelfieUploaded,setisSelfieUploaded]=useState(false);
  const [blobFile,setBlobFile]=useState();
  const [imageUploadText,setImageUploadText]=useState("Upload Selfie")


  const [videoBlob, setVideoBlob] = useState(null); // Store the recorded video
  const [geoCoordinates, setGeoCoordinates] = useState(""); // Store the geo-coordinates
  const [isRecording, setIsRecording] = useState(false); // Manage recording state
  const [accountDetails,setAccountDetails]=useState(null);

  const [formData, setFormData] = useState({
    selfie: null,
    employeeName: "",
    employeeId: "",
    siteLocation: "",
    date: "",
    time: "",
    day: "",
    expenses: "",
    expensesType: "",
    accountDetailsImageURL: null,
    paymentsStatus: "",
    progressReportVideo: null,
    progressReportDescription: "",
  
  });

  const s3Client = new S3Client({
    region: 'ap-south-1', // e.g., 'us-east-1'
    credentials: {
      accessKeyId: access_key,
      secretAccessKey: secrect_access_key,
    },
  });

  const videoRef = useRef(null); // Reference for the video element
  const selfieVideoRef = useRef(null); // Reference for the video element
  const canvasRef = useRef(null); // Reference for the canvas element
  const mediaRecorderRef = useRef(null); // Reference for MediaRecorder
  const recordedChunks = useRef([]); // Store recorded chunks

    let stream;
    const startVideoStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Could not access camera.");
      }
    };

    let selfieStream;
    const startselfieVideoStream = async () => {
      try {
        selfieStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (selfieVideoRef.current) {
          selfieVideoRef.current.srcObject = selfieStream;
        }
        
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Could not access camera.");
      }
    };

  useEffect(() => {
    

    startselfieVideoStream();

    // Cleanup video stream on component unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      if (selfieStream) {
        selfieStream.getTracks().forEach((track) => track.stop());
      }
      if (selfieVideoRef.current) {
        selfieVideoRef.current.srcObject = null;
      }
    };
  }, []);

  // Set the initial date, time, and day
  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-us", { weekday: "long" });
    const currentTime = currentDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDateFormatted = currentDate.toISOString().split("T")[0];

    setFormData((prevData) => ({
      ...prevData,
      date: currentDateFormatted,
      time: currentTime,
      day: currentDay,
    }));
  }, []);

  const captureSelfie = async () => {
    // await startVideoStream();
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setGeoCoordinates(`${latitude}, ${longitude}`);

      const canvas = canvasRef.current;
      const video = selfieVideoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      context.font = "20px Arial";
      context.fillStyle = "red";
      context.fillText(
        `Location: ${latitude},${longitude}`,
        100,
        canvas.height - 10
      );

      const imageUrl = canvas.toDataURL("image/png");
      setSelfieURL(imageUrl);
      console.log(imageUrl)
      const blob = dataURLToBlob(imageUrl);
      setBlobFile(blob);
      setFormData((prevData) => ({
        ...prevData,
        selfie: { imageUrl, geoCoordinates: `${latitude}, ${longitude}` },
        siteLocation:`${latitude}, ${longitude}`
      }));

      // selfieUpload();
    } catch (error) {
      console.error("Error capturing selfie or geo-coordinates:", error);
      alert("Could not capture selfie or retrieve geo-coordinates.");
    }
  };

  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const startRecording = async() => {
     await startVideoStream()
    const stream = videoRef.current.srcObject;
    if (!stream) return;

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      setVideoBlob(blob);
      recordedChunks.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleSave = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  const handleUpload = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const url=`${serverURL}/api/submit-attendance`
    postData(url,formData)
    .then((res)=>{
      if(res){
        alert("Form submitted successfully!");
      }else{
        alert("getting server error while uploading the form. Please try again after sometime.")
      }
    })
    .catch((err)=>{
      console.log(err)
    })
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const selfieUpload = () => {
    if (!formData.selfie) {
      alert("Please select a file first!");
      return;
    }

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: `selfies/${"name.png"}`, // The folder path in S3
      Body: blobFile,
      ContentType: "image/png",
      ACL: "public-read", // Optional: Make the file public
    };

    s3.upload(params)
      .on("httpUploadProgress", (evt) => {
        setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err, data) => {
        if (err) {
          console.error("Error uploading file: ", err);
          console.log(formData.selfie)
        } else {
          setImageUploadText("Selfie Uploaded");
          setisSelfieUploaded(true);
          console.log("File uploaded successfully: ", data.Location);
          alert(`File uploaded to: ${data.Location}`);
          setFormData((prevData) => ({
            ...prevData,
            selfie: { imageUrl:data.Location, geoCoordinates },
          }));
        }
      });
  };

  const handleVideoUpload = async () => {
    if (!videoBlob) {
      alert('Please select a file first!');
      return;
    }

    const params = {
      Bucket: S3_BUCKET, // Replace with your S3 bucket name
      Key: `videos/${'video.mp4'}`, // The file path in your bucket
      Body: videoBlob,
      ContentType: "video/mp4", // File MIME type
    };

    try {
      const uploadCommand = new PutObjectCommand(params);

      await s3Client.send(uploadCommand);
      alert('File uploaded successfully!');
      setisVideoUploaded(true)
      setVideoUploadText("Video Uploaded");
      const fileUrl = `https://${params.Bucket}.s3.${"ap-south-1"}.amazonaws.com/${params.Key}`;
      setFormData((prevData)=>({...prevData,"progressReportVideo":fileUrl}));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('File upload failed!');
    }
  };

  useEffect(()=>{
    if(accountDetails){
      const uploadParam={
        Bucket:S3_BUCKET,
        Key:"AccountDetails/acc.jpg",
        Body:accountDetails,
        ContentType:accountDetails.type
      }

      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });

      s3.upload(uploadParam)
      .on("httpUploadProgress", (evt) => {
        setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err, data) => {
        if (err) {
          console.error("Error uploading account details: ", err);
          console.log(accountDetails.type)
        } else {
          // setImageUploadText("Account Details Uploaded");
          // setisSelfieUploaded(true);
          console.log("Account details uploaded successfully: ", data.Location);
          setFormData((prevData)=>({...prevData,"accountDetailsImageURL":data.Location}))
          alert(`File uploaded to: ${data.Location}`);
        }
      });
    }
  },[accountDetails])

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Daily report
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selfie Input */}
          <div className="text-center">
            {/* Video stream (Live Camera Feed) */}
            <video
              ref={selfieVideoRef}
              width="100%"
              height="auto"
              autoPlay
              playsInline
              className="w-full h-auto border border-gray-300 rounded-lg mb-4"
            ></video>

            {/* Canvas to capture the photo */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            {/* Capture Selfie Button */}
            <label
              htmlFor="selfie"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Real-Time Selfie Capture
            </label>
            <button
              type="button"
              onClick={captureSelfie}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              Capture Selfie
            </button>

            {/* Display uploaded selfie */}
            {selfieURL && (
              <div className="mt-4">
                <div>
                <img
                  src={selfieURL}
                  alt="Uploaded Selfie"
                  className="w-40 h-40 object-cover"
                />
                </div>
                <button onClick={selfieUpload} disabled={isSelfieUploaded} className={` ${isSelfieUploaded?'bg-gray-400':'bg-green-400'} p-2 rounded-md  text-white ${isSelfieUploaded?"cursor-not-allowed":"cursor-pointer"}`}>{imageUploadText}</button>
                <p className="mt-2 text-sm text-gray-500">
                  Geo Coordinates: {geoCoordinates}
                </p>
              </div>
            )}
          </div>

          {/* Site Location */}
          <div>
            <label
              htmlFor="siteLocation"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Site Location
            </label>
            <input
              type="text"
              id="siteLocation"
              name="siteLocation"
              value={formData.siteLocation}
              onChange={handleChange}
              placeholder="Enter Site Location"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Employee Name */}
          <div>
            <label
              htmlFor="employeeName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              placeholder="Enter Employee Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee ID"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Day and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Day
              </label>
              <input
                type="text"
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                placeholder="Enter Day"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Expenses and Expenses Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expenses"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Expenses Amount
              </label>
              <input
                type="number"
                id="expenses"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
                placeholder="Enter Expenses"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="expensesType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Expenses Type
              </label>
              <select
                id="expensesType"
                name="expensesType"
                value={formData.expensesType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Expenses Type</option>
                <option value="manpower">Manpower</option>
                <option value="material">Material</option>
                <option value="tools_and_machinery">Tools & Machinery</option>
                <option value="repair">Repair</option>
                <option value="ration">Ration</option>
                <option value="vendor">Vendor</option>
                <option value="vendor">Self</option>
              </select>
            </div>
          </div>

          {/* Payments Status */}

          <div>
            <label
              htmlFor="qrCodeImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload QR Code/passbook/upi id picture
            </label>
            <input
              type="file"
              id="AccountDetails"
              name="AccountDetails"
              onChange={(e)=>{setAccountDetails(e.target.files[0])}}
              accept="image/png, image/jpg, image/jpeg"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Please upload a clear image(jpg, jpeg, png files only) of the Account details.
            </p>
          </div>

          <div>
            <label
              htmlFor="paymentsStatus"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Payment Status
            </label>
            <select
              id="paymentsStatus"
              name="paymentsStatus"
              value={formData.paymentsStatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Payment Status</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Progress Report Video */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
              Real-Time Video Capture
            </h2>

            {/* Video Stream */}
            <div className="mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto border border-gray-300 rounded-lg"
              ></video>
            </div>

            {/* Buttons for Recording */}
            <div className="flex justify-between">
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`py-2 px-4 rounded-lg text-white ${
                  isRecording
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Start Recording
              </button>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className={`py-2 px-4 rounded-lg text-white ${
                  !isRecording
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Stop Recording
              </button>
            </div>

            {/* Geo-coordinates Display */}
            {geoCoordinates && (
              <p className="mt-4 text-gray-700">
                Geo-coordinates: {geoCoordinates}
              </p>
            )}

            {/* Download Recorded Video */}
            {videoBlob && (
              <div className="mt-6">
                <video
                  src={URL.createObjectURL(videoBlob)}
                  controls
                  className="w-full h-auto border border-gray-300 rounded-lg"
                ></video>
                <button onClick={handleVideoUpload} disabled={isVideoUploaded} className={` ${isVideoUploaded?'bg-gray-400':'bg-green-400'} p-2 rounded-md  text-white ${isVideoUploaded?"cursor-not-allowed":"cursor-pointer"}`}>{videoUploadText}</button>
              </div>
            )}
          </div>

          {/* Progress Report Description */}
          <div>
            <label
              htmlFor="progressReportDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Remarks
            </label>
            <textarea
              id="progressReportDescription"
              name="progressReportDescription"
              value={formData.progressReportDescription}
              onChange={handleChange}
              rows="4"
              placeholder="Enter progress report description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AttendanceForm;
