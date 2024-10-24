  import React, { useState, useEffect } from 'react';
  import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
  import { FaTrash, FaWrench } from 'react-icons/fa';
  import { useNavigate } from 'react-router-dom';

  export default function Reviews() {
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    const navigate = useNavigate();

    // Fetch reviews from the server
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await fetch('http://localhost:3214/Server/Review/ReadAll'); // Your backend URL
          const data = await response.json();

          console.log(data); // Check the data structure here

          if (response.ok) {
            setReviews(data); // Set reviews data from server
          } else {
            setError('Error fetching reviews'); // Handle error response
          }
        } catch (err) {
          setError('Error fetching reviews'); // Handle network errors
        } finally {
          setLoading(false); // Stop loading once data is fetched or error occurred
        }
      };

      fetchReviews();
    }, []);

    // Remove Review function
    const handleRemove = async (IdOfReview) => {
      console.log('Attempting to delete review with ID:', IdOfReview);

      if (!IdOfReview) {
        console.error('Invalid reviewId: !frontend', IdOfReview);
        return; // Early exit if reviewId is invalid
      }

      try {
        const response = await fetch(`http://localhost:3214/Server/Review/Delete/${IdOfReview}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'johndoe' }), // Include the username if needed
        });

        if (response.ok) {
          // Filter out the deleted review from the state
          setReviews(reviews.filter((reviewObj) => reviewObj.reviewId !== IdOfReview));
          console.log('Review deleted successfully');
        } else {
          const errorData = await response.json();
          console.error('Error deleting review:', errorData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
            <h3>Reviews</h3>
          </Col>
        </Row>
        <Row>
          {reviews.length > 0 ? (
            reviews.map((reviewObj, idx) => (
              // Check if reviewObj has reviews
              reviewObj.reviews && reviewObj.reviews.length > 0 ? (
                reviewObj.reviews.map((review, innerIdx) => (
                  <Col key={`${idx}-${innerIdx}`} xs={12} className="mb-3">
                    <Card>
                      <Card.Body className="d-flex align-items-center justify-content-between">
                        {/* Product Image */}
                        <div className="d-flex align-items-center">
                          <img
                            src={review.image ? `data:image/jpeg;base64,${review.image}` : 'https://via.placeholder.com/100x100?text=No+Image'}
                            alt="Product"
                            className="rounded mr-3"
                            style={{ width: '100px', height: '100px' }}
                          />
                          <div>
                            <h6 className="mb-0">{review.product_id || 'Unknown Product'}</h6>
                          </div>
                        </div>

                        {/* Review */}
                        <div style={{ flex: 1, paddingLeft: '20px' }}>
                          <p className="mb-0">{review.description || 'No description available'}</p>
                        </div>

                        {/* Edit and Remove Buttons */}
                        <div className="d-flex align-items-center">

                          <Button variant="danger" onClick={() => handleRemove(reviewObj.reviewId)}>
                            <FaTrash /> Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : null
            ))
          ) : (
            <Col className="text-center">
              <h5>No reviews found</h5>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
