import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
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

      const now = new Date();

      const upcomingEvents = res.data.filter(
        (r) => new Date(r.event.date) > now
      );

      const pastEvents = res.data.filter(
        (r) => new Date(r.event.date) <= now
      );

      setUpcoming(upcomingEvents);
      setPast(pastEvents);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-5 fw-bold">My Events</h2>

      {/* Upcoming Events */}
      <h4 className="mb-3">Upcoming Events</h4>

      {upcoming.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        upcoming.map((item) => (
          <div key={item._id} className="card mb-3 p-3 shadow-sm">
            <h5>{item.event.name}</h5>
            <p>{item.event.location}</p>
            <p>
              {new Date(item.event.date).toLocaleString()}
            </p>
          </div>
        ))
      )}

      {/* Past Events */}
      <h4 className="mt-5 mb-3">Past Events</h4>

      {past.length === 0 ? (
        <p>No past events</p>
      ) : (
        past.map((item) => (
          <div key={item._id} className="card mb-3 p-3 shadow-sm">
            <h5>{item.event.name}</h5>
            <p>{item.event.location}</p>
            <p>
              {new Date(item.event.date).toLocaleString()}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;
