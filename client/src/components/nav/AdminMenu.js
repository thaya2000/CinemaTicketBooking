import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Links</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/genre">
            Create genre
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/movie">
            Create movie
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/movies">
            Movies
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/bookings">
            Manage booking
          </NavLink>
        </li>
      </ul>
    </>
  );
}
