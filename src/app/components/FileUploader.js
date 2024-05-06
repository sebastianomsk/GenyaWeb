import React from 'react';

const FileUploader = ({ onFileUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onFileUpload(file);
    };

    return (
        <div>
            <label htmlFor="file-uploader">Adjuntar Archivo:</label>
            <input type="file" id="file-uploader" onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;
