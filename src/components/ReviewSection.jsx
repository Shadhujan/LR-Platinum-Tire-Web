import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reviewRead from "./ReviewReadSection";
import image_ from "../assets/image.png"

function Box({ onFileSelect }) {
  const [preview, setPreview] = useState(null); // State to hold the image preview
  const [uploaded, setUploaded] = useState(false); // State to track if image is uploaded

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Set the image preview
      onFileSelect(file); // Call the parent function to pass the file
      setUploaded(true); // Set uploaded to true once file is selected
    }
  };

  const handleRemove = () => {
    setPreview(null); // Reset the image preview
    setUploaded(false); // Allow re-upload
  };

  return (
    <div className="col btn btn-outline-secondary border border-dark border-2 p-2 m-3 position-relative" style={{ height: "150px" }}>
      {preview ? (
        <div className="w-100 h-100">
          <img
            src={preview}
            alt="Preview"
            className="img-fluid w-100 h-100 object-fit-contain"
            style={{ maxHeight: "150px" }} // Adjust image size to fit within the box
          />
        </div>
      ) : (
        <i className="bi bi-plus fw-bold fs-1 text-dark "></i>
      )}

      {uploaded && (
        <i
          className="bi bi-trash3 position-absolute text-danger"
          style={{
            top: "5px",
            right: "5px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
          onClick={handleRemove}
        />
      )}

      {!uploaded && (
        <input
          type="file"
          className="position-absolute w-100 h-100 opacity-0"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
}

const MySVGIcon = (props) => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
    <rect width="30" height="30" fill="url(#pattern0_279_1319)" />
    <defs>
      <pattern id="pattern0_279_1319" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_279_1319" transform="scale(0.0333333)" />
      </pattern>
      <image id="image0_279_1319" width="30" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMklEQVR4nO2WsU7CUBSGv5dwEMEwOuCEoz6AiRBeA63wLI5EXRzdFd6EEnaJbrZulkiaHJMbEm/PuaWmA39yhjbn5sv/995zC3vVUMfALTADYuBLKpZ3EdDaJfAImAAZ8FNQa+AZaJeFDoBUAdyuBOiHQsfiwAp13Y9CnK5LQF242nnTEO870AXOC2JvaMCPBmhH1pwV9N5rjkxmhHbk2defSZJ/aqSAfgCn0n8CrJQJ3fjA0x07devFB15W4PS3Yh848SzsBjp1d3f9wAtD1G9G8LyWmysKOE5a50MfuFXRAPkuGiC5HioYmROUF39igOfQC0/PJ3CIUpfKyDXXYk8Lded22R+B/B8tSH1D7NvxXlFSB8Cd7EyNyyfLN9WoKVfbq0yhVGouw+Fac2T24r+1AQgfm1WtG1DyAAAAAElFTkSuQmCC" />
    </defs>
  </svg>
);

export default function ReviewSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState(''); // State to hold the review description
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
    console.log(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('description', description);
    selectedFiles.forEach((file, index) => {
      formData.append(`image_${index}`, file); // Attach files
    });

    try {
      const response = await fetch('http://localhost:3214/Server/Review/Create', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Review created successfully:', result);
      } else {
        console.error('Error creating review:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="container p-3 m-5 mx-auto">
        <div className="fw-bold fs-3">
          <div className="container text-center">
            <div className="row">
              <div className="col text-start">Review</div>
              <div className="col text-end">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("../ReviewRead");
                  }}
                  className="text-decoration-none"
                  style={{ color: 'inherit' }}
                >
                  <MySVGIcon width="25" height="25" />
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center m-1">
          <div className="row">
            <div className="col-3 border border-1 m-2 pt-4">
              <img src={image_} alt="bike" className="img-fluid" />
            </div>
            <div className="col p-3">
              <div className="mb-3 text-start">
                <p className="m-2 fw-bold">Add Review</p>
                <textarea
                  className="form-control bg-light border border-dark border-2"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // Update description state
                ></textarea>
              </div>
              <div className="row">
                <Box onFileSelect={handleFileSelect} />
                <Box onFileSelect={handleFileSelect} />
                <Box onFileSelect={handleFileSelect} />
                <Box onFileSelect={handleFileSelect} />
              </div>
              <button className="btn btn-danger w-100 p-2 fw-bold" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

