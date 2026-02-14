import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{event.name}</h5>
          <p className="card-text">
            <strong>Organizer:</strong> {event.organizer} <br />
            <strong>Location:</strong> {event.location} <br />
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()} <br />
            <strong>Category:</strong> {event.category}
          </p>

          <div className="mt-auto">
            <Link
              to={`/events/${event._id}`}
              className="btn btn-primary w-100"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
