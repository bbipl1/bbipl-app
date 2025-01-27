import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AWS from "aws-sdk";
import { AWSConfig } from "../../../../../config/awsConfig"; // AWS config for credentials
import ManageWorker from "./ManageWorkers"; // Import the ManageWorker component

const serverURL = process.env.REACT_APP_SERVER_URL;

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: AWSConfig.accessKeyId,
  secretAccessKey: AWSConfig.secretAccessKey,
  region: AWSConfig.region,
});

const SiteEngProfile = ({ siteEngineer }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [profile, setProfile] = useState(null);
  const [siteEngImage, setSiteEngImage] = useState(""); // Site Engineer's real-time photo
  const [videoURL, setVideoURL] = useState(""); // Video URL for site engineer
  const videoRef = useRef(null); // Reference to video element for site engineer

  // Fetch Site Engineer details
  useEffect(() => {
    // console.log("si", siteEngineer);
    setProfile(siteEngineer);
  }, [siteEngineer]);

  // Real-time photo for Site Engineer (Webcam)
  const captureSiteEngImage = () => {
    const videoElement = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas.getContext("2d").drawImage(videoElement, 0, 0);
    const photo = canvas.toDataURL("image/png");
    setSiteEngImage(photo);
  };

  // Upload to AWS S3
  const uploadToS3 = (file, type) => {
    const params = {
      Bucket: AWSConfig.bucketName,
      Key: `uploads/${Date.now()}-${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        if (type === "siteEngImage") {
          setSiteEngImage(data.Location);
        }
      }
    });
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      siteEngImage,
      videoURL,
    };

    try {
      const response = await axios.put(
        `${serverURL}/api/siteengineer/${siteEngineer.id}`,
        payload
      );
      console.log("Profile updated successfully", response.data);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handlePhotoUpload=()=>{

  }

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="w-full  mx-auto p-6 bg-white rounded-md shadow-md">
      
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <div>
          <img onClick={handlePhotoUpload} className="w-28 h-28" src="" alt="" />
        </div>
        <div>
          <h1>Name : {profile.name}</h1>
        </div>
        <div>
          <h1>Id : {profile.id}</h1>
        </div>
        <div>
          <h1>Mobile : {profile.mobile}</h1>
        </div>

    </div>
  );
};

export default SiteEngProfile;
