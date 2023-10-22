import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminMovies() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const loadMovies = async () => {
    try {
      const { data } = await axios.get("/movies");
      setMovies(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Movies</div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filteredMovies.map((movie) => (
              <Link
                to={`/dashboard/admin/movie/update/${movie.slug}`}
                key={movie._id}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/movie/poster/${movie._id}`}
                        alt={movie.name}
                        className="img img-fluid rounded-start"
                        style={{ height: "200px" }}
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{movie?.title}</h5>
                        <p className="card-text">
                          {movie?.description?.substring(0, 160)}...
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(movie.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
