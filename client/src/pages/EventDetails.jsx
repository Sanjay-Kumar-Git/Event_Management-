import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetchEvent();
    if (user) checkRegistration();
  }, [id, user]);

  // 🔹 Fetch event details
  const fetchEvent = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${id}`
      );
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Check if user already registered
  const checkRegistration = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/registrations/my-events`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const isRegistered = res.data.some(
        (r) => r.event._id === id
      );

      setRegistered(isRegistered);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Register for event
  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/registrations/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Registered successfully");
      setRegistered(true);

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  // 🔹 Cancel registration
  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/registrations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Registration cancelled");
      setRegistered(false);

    } catch (error) {
      alert("Cancel failed");
    }
  };

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-lg p-4">

        <h2 className="fw-bold">{event.name}</h2>

        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(event.date).toLocaleString()}
        </p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>

        {/* Buttons */}

        {registered ? (
          <button
            className="btn btn-danger mt-3"
            onClick={handleCancel}
          >
            Cancel Registration
          </button>
        ) : (
          <button
            className="btn btn-success mt-3"
            onClick={handleRegister}
          >
            Register for Event
          </button>
        )}

      </div>
    </div>
  );
}

export default EventDetails;
