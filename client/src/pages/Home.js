import React, { useState, useEffect } from "react";
import MovieCard from "../components/cards/MovieCard";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const { data } = await axios.get("/movies");
      setMovies(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) => {
    const movieName = movie.title.toLowerCase();
    return movieName.includes(searchQuery.toLowerCase());
  });

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3.25, // Number of movies shown at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Time between slides in milliseconds
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <h2 className="mb-3">Featured Movies</h2>
              <Slider {...settings}>
                {movies.map((movie) => (
                  <div key={movie._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/movie/poster/${movie._id}`}
                      alt={movie.title}
                      className="carousel-image"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <h2 className="mb-3">Now Showing</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by movie name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="row">
              {filteredMovies.map((movie) => (
                <div className="col-md-3" key={movie._id}>
                  <MovieCard m={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
