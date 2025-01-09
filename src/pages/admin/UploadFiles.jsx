import React, { useState } from 'react';
import axios from 'axios';

const serverURL=process.env.REACT_APP_SERVER_URL
const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post(`${serverURL}/api/upload-users-details`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus('Upload successful!');
            console.log('Server Response:', response.data);
        } catch (error) {
            setUploadStatus('Upload failed.');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Upload File</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 block"
            />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
                Upload
            </button>
            {uploadStatus && (
                <p className="mt-4 text-gray-700">{uploadStatus}</p>
            )}
        </div>
    );
};

export default FileUpload;
