import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 border-0 shadow rounded-4">
        <div className="card-body d-flex flex-column">

          <h5 className="fw-bold">{event.name}</h5>

          <p className="text-muted mb-2">
            {event.location} • {event.category}
          </p>

          <p className="small text-secondary">
            {new Date(event.date).toLocaleDateString()}
          </p>

          <p className="small">
            Seats Available: {event.capacity}
          </p>

          <div className="mt-auto">
            <Link
              to={`/events/${event._id}`}
              className="btn btn-dark w-100 rounded-pill"
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
