import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
    <div
      className="col btn btn-outline-secondary border border-dark border-2 p-2 m-3 position-relative"
      style={{ height: "150px", cursor: "pointer" }}
      onClick={() => document.getElementById("fileInput").click()} // Trigger file input click
    >
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
      )}``

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

      <input
        type="file"
        id="fileInput"
        className="position-absolute w-100 h-100 opacity-0"
        onChange={handleFileChange}
      />
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

const ReviewForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setReview((prevReview) => ({
        ...prevReview,
        image: reader.result, // Store the base64 string of the image
      }));
    };
    reader.readAsDataURL(file); // Convert file to base64 string
  };

  const [review, setReview] = useState({
    addReview: "",
    productName: "",
    productID: "",
    image: "",
  });

  const [reviewId, setReviewId] = useState("");
  const [reviewData, setReviewData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3214/Server/ReviewForm/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        }
      );
      const result = await response.json();
      if (result.reviewId) {
        setReviewId(result.reviewId); // Set the review ID from the response
        toast.success(`Review Added Successfully! ID: ${result.reviewId}`);
      }
      setReview({
        addReview: "",
        productName: "",
        productID: "",
        image: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding Review. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, black 45%, red 70%)",
        minHeight: "100vh",
      }}
    >
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <div
              className="p-4"
              style={{
                backgroundColor: "#2c2c2c",
                borderRadius: "20px",
                width: "80%",
              }}
            >
              <h3 className="text-light">Submit a Review</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAddReview">
                  <Form.Label className="text-light">Your Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="addReview"
                    value={review.addReview}
                    onChange={handleInputChange}
                    placeholder="Enter your review"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formProductName" className="mt-3">
                  <Form.Label className="text-light">Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={review.productName}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formProductID" className="mt-3">
                  <Form.Label className="text-light">Product ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="productID"
                    value={review.productID}
                    onChange={handleInputChange}
                    placeholder="Enter product ID"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImage" className="mt-3">
                  <Form.Label className="text-light">Product Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={review.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                  <Box onFileSelect={handleFileSelect} />
                </Form.Group>

                <Button
                  type="submit"
                  variant="danger"
                  className="mt-4"
                  style={{ width: "100%" }}
                >
                  Submit Review
                </Button>
              </Form>
            </div>
          </Col>

          <Col md={6}>
            <div
              className="p-4"
              style={{
                backgroundColor: "#2c2c2c",
                borderRadius: "20px",
                width: "80%",
              }}
            >
              <h3 className="text-light">Review Details</h3>
              {reviewId ? (
                <div className="text-light">
                  <p>Review ID: {reviewId}</p>
                  <p>Product Name: {review.productName}</p>
                  <p>Product ID: {review.productID}</p>
                  <img
                    src={review.image}
                    alt="Uploaded product"
                    className="img-fluid"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              ) : (
                <p className="text-light">No review data to display.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default ReviewForm;
