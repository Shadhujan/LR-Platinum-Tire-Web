import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  const [appointment, setAppointment] = useState({
    name: "",
    mobile: "",
    service: "",
    date: "",
  });
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [bookingId, setBookingId] = useState(""); // New state for booking ID

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3214/Server/Appointment/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        },
      );
      const result = await response.json();
      if (result.appointmentId) {
        setBookingId(result.appointmentId); // Set the booking ID from the response
        toast.success(
          `Appointment successfully booked! ID: ${result.appointmentId}`,
        );
      }
      console.log("Appointment data:", result);
      setAppointment({
        name: "",
        mobile: "",
        service: "",
        date: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error booking appointment. Please try again.");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3214/Server/Appointment/Read/${appointmentId}`,
      );
      const result = await response.json();
      setAppointmentData(result);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3214/Server/Appointment/Delete/${appointmentId}`,
        {
          method: "DELETE",
        },
      );
      const result = await response.json();
      console.log("Deletion result:", result);
      setAppointmentData(null); // Clear the appointment data after deletion
    } catch (error) {
      console.error("Error deleting appointment:", error);
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
          {/* Appointment Details Section */}
          <Col md={6}>
            <div
              className="p-4"
              style={{
                backgroundColor: "#2c2c2c",
                borderRadius: "20px",
                height: "80%",
                marginLeft: "-30px",
                width: "80%",
              }}
            >
              <h2 className="text-light">Appointment Details</h2>

              {/* Display appointment details if available */}
              {appointmentData ? (
                <table
                  style={{ width: "100%", fontSize: "18px", color: "#fff" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "10px" }}>
                        <strong>Name:</strong>
                      </td>
                      <td style={{ padding: "10px" }}>
                        {appointmentData.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>
                        <strong>Mobile Num:</strong>
                      </td>
                      <td style={{ padding: "10px" }}>
                        {appointmentData.mobile}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>
                        <strong>Service Type:</strong>
                      </td>
                      <td style={{ padding: "10px" }}>
                        {appointmentData.service}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>
                        <strong>Date:</strong>
                      </td>
                      <td style={{ padding: "10px" }}>
                        {new Date(appointmentData.date).toLocaleDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-light">No appointment data to display.</p>
              )}

              <div
                className="text-right"
                style={{ marginLeft: "90%", marginTop: "10%" }}
              >
                <Button variant="danger" onClick={handleDelete}>
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </div>
          </Col>

          {/* Booking Form Section */}
          <Col md={6}>
            <div
              className="p-4"
              style={{
                backgroundColor: "#2c2c2c",
                borderRadius: "20px",
                width: "90%",
                margin: "auto",
                marginRight: "-60px",
              }}
            >
              <h3 className="text-light" style={{ fontSize: "1.5rem" }}>
                Book your date
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label
                    className="text-light"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="bi bi-person"></i> Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={appointment.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    style={{ fontSize: "0.8rem", padding: "7px" }} // Adjust font size and padding for input
                  />
                </Form.Group>

                <Form.Group controlId="formMobile" className="mt-3">
                  <Form.Label
                    className="text-light"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="bi bi-telephone"></i> Mobile Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={appointment.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    required
                    style={{ fontSize: "0.8rem", padding: "7px" }} // Adjust font size and padding for input
                  />
                </Form.Group>

                <Form.Group controlId="formService" className="mt-3">
                  <Form.Label
                    className="text-light"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="bi bi-tools"></i> What Kind of Service
                  </Form.Label>
                  <Form.Select
                    name="service"
                    value={appointment.service}
                    onChange={handleInputChange}
                    required
                    style={{ fontSize: "0.8rem", padding: "7px" }} // Adjust font size and padding for select input
                  >
                    <option value="">Select a service</option>{" "}
                    {/* Placeholder option */}
                    <option value="repair">Repair</option>
                    <option value="installation">Installation</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="consultation">Consultation</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formDate" className="mt-3">
                  <Form.Label
                    className="text-light"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="bi bi-calendar"></i> Appointment Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={appointment.date}
                    onChange={handleInputChange}
                    required
                    style={{ fontSize: "0.8rem", padding: "7px" }} // Adjust font size and padding for input
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="danger"
                  className="mt-4"
                  style={{
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    width: "100%",
                  }}
                >
                  Book Appointment
                </Button>
              </Form>

              {/* Search and Delete Section */}
              <div className="mt-4">
                <Form.Group controlId="formAppointmentId">
                  <Form.Label
                    className="text-light"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="bi bi-search"></i> Search Appointment by ID
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={appointmentId}
                    onChange={(e) => setAppointmentId(e.target.value)}
                    placeholder="Enter appointment ID"
                    style={{ fontSize: "0.8rem", padding: "7px" }}
                  />
                </Form.Group>
                <Button
                  onClick={handleSearch}
                  variant="warning"
                  className="mt-3"
                  style={{
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    width: "100%",
                  }}
                >
                  Search Appointment
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AppointmentForm;
