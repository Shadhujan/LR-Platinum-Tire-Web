import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "./Messages.css"; // Custom CSS file for styling
import Navbar from "./Navbar";
import Footer from "./Footer";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    // Fetch messages when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3214/Server/Contact/ReadAll",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteClick = (messageId) => {
    setSelectedMessage(messageId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedMessage) {
      console.error("No message selected for deletion");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3214/Server/Contact/Delete/${selectedMessage}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted message from the state
      setMessages(
        messages.filter((message) => message._id !== selectedMessage),
      );

      // Hide the modal and reset selectedMessage
      setShowDeleteModal(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  return (
    <>
      <Navbar />
      <Container fluid className="messages-container">
        <Row className="my-4">
          <Col>
            <h3 className="section-title">Messages</h3>
          </Col>
        </Row>
        <Row>
          {messages.map((message) => (
            <Col key={message._id} xs={12} className="mb-3">
              <Card className="message-card">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={`https://via.placeholder.com/50?text=User+${message._id}`}
                      alt="User"
                      className="rounded-circle message-avatar"
                    />
                    <div className="message-info">
                      <h6 className="mb-0 user-name">{message.name}</h6>
                      <p className="mb-0 user-email">{message.email}</p>
                      <p className="mb-0 user-message">{message.message}</p>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="danger"
                      className="delete-btn"
                      onClick={() => handleDeleteClick(message._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this message?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}

export default Messages;
