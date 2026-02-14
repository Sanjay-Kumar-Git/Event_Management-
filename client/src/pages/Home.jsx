import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [search, category, location]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          params: { search, category, location }
        }
      );
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4 text-center fw-bold">Discover Events</h2>

      {/* Filter Section */}
      <div className="card p-4 shadow-sm mb-4">
        <div className="row g-3">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Events Grid */}
      <div className="row">
        {events.length === 0 ? (
          <p className="text-center">No events found</p>
        ) : (
          events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        )}
      </div>

    </div>
  );
}

export default Home;
