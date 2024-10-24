import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner, Image } from "react-bootstrap";
import { FaTrash, FaWrench, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:3214/Server/Review/ReadAll",
        ); // Your backend URL
        const data = await response.json();

        console.log(data); // Check the data structure here

        if (response.ok) {
          setReviews(data); // Set reviews data from server
        } else {
          setError("Error fetching reviews"); // Handle error response
        }
      } catch (err) {
        setError("Error fetching reviews"); // Handle network errors
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurred
      }
    };

    fetchReviews();
  }, []);

  // Remove Review function
  const handleRemove = async (IdOfReview) => {
    console.log("Attempting to delete review with ID:", IdOfReview);

    if (!IdOfReview) {
      console.error("Invalid reviewId: !frontend", IdOfReview);
      return; // Early exit if reviewId is invalid
    }

    try {
      const response = await fetch(
        `http://localhost:3214/Server/Review/Delete/${IdOfReview}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "johndoe" }), // Include the username if needed
        },
      );

      if (response.ok) {
        // Filter out the deleted review from the state
        setReviews(
          reviews.filter((reviewObj) => reviewObj.reviewId !== IdOfReview),
        );
        console.log("Review deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error deleting review:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const generateReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reviews Report", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      doc.internal.pageSize.getWidth() / 2,
      28,
      { align: "center" },
    );

    const tableColumn = ["Product", "Review", "Rating"];
    const tableRows = [];

    reviews.forEach((reviewObj) => {
      if (reviewObj.reviews && reviewObj.reviews.length > 0) {
        reviewObj.reviews.forEach((review) => {
          const product = review.product_id || "Unknown Product";
          const description = review.description || "No description available";
          const rating = review.rating || "N/A";
          const reviewData = [product, description, rating];
          tableRows.push(reviewData);
        });
      }
    });

    doc.autoTable({
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 11 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 },
      theme: "grid",
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 20,
        doc.internal.pageSize.getHeight() - 10,
      );
    }

    doc.save("professional_reviews_report.pdf");
  };

  if (loading) {
    return (
      <Container fluid className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="text-center my-5">
        <h5>{error}</h5>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="my-4">
        <Col>
          <h3 className="text-center">Customer Reviews</h3>
          <Button variant="info" onClick={generateReport}>
            <FaFilePdf /> Download Professional Report
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th style={{ width: "10%" }}>Product</th>
                <th style={{ width: "15%" }}>Review</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((reviewObj, idx) =>
                  reviewObj.reviews && reviewObj.reviews.length > 0
                    ? reviewObj.reviews.map((review, innerIdx) => (
                        <tr key={`${idx}-${innerIdx}`}>
                          {/* Product Image */}
                          <td>
                            <Image
                              src={
                                review.image
                                  ? `data:image/jpeg;base64,${review.image}`
                                  : "https://via.placeholder.com/100x100?text=No+Image"
                              }
                              rounded
                              fluid
                              style={{ width: "100px", height: "100px" }}
                            />
                          </td>
                          <td style={{ width: "10%" }}>{review.product_id || "Unknown Product"}</td>
                          <td style={{ width: "15%" }}>{review.description || "No description available"}</td>
                          <td>{review.rating ? `${review.rating}/5` : 'No Rating'}</td>
                          <td>
                            {new Date(review.date).toLocaleString('en-GB', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              className="m-2 justify-content-center align-items-center"
                              onClick={() => handleRemove(reviewObj.reviewId)}
                            >
                              <FaTrash /> Remove
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => navigate(`../ReviewEdit/${reviewObj.reviewId}`)}
                            >
                              <FaWrench /> Edit
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null
                )
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No reviews available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
