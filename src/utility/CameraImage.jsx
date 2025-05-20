import { CameraIcon, SwitchCameraIcon, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const CameraImage = ({ onCapture, setIsCameraOpen }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // To hold the stream reference
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  // Start the camera on mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        streamRef.current = stream; // Save stream reference
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Failed to access the camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Capture an image
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      if (onCapture) {
        onCapture(imageData);
      }
    }
  };

  // Stop the camera
  const close = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsCameraOpen(false);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div className="max-w-screen fixed left-0 md:left-8 lg:left-1/4 top-28 z-50 p-4 bg-slate-700 border-2 border-red-600 rounded-lg">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-3840 h-2160 border border-gray-300 rounded-md bg-neutral-200"
      ></video>
      <div className="w-3840 flex flex-row justify-evenly mt-4">
        <button
          onClick={captureImage}
          className=" bg-blue-500 text-white p-2 rounded-md mr-1 ml-2"
        >
          <CameraIcon />
        </button>
        <button
          onClick={close}
          className=" bg-red-600 text-white p-2 rounded-md ml-1"
        >
          <X />
        </button>
        <button
          onClick={switchCamera}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          <SwitchCameraIcon />
        </button>
      </div>
      {capturedImage && (
        <div className="mt-4">
          <h3 className="text-sm font-medium">Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-64 h-auto border border-gray-300 rounded-md mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default CameraImage;
