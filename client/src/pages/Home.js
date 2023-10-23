import React, { useState, useEffect } from "react";
import MovieCard from "../components/cards/MovieCard";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Input } from "@nextui-org/react";

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
    slidesToShow: 3.5, // Number of movies shown at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Time between slides in milliseconds
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex">
          <div className="w-full">
            <div className="my-0">
              <p className="text-3xl  my-3">Featured Movies</p>
              <Slider {...settings}>
                {movies.map((movie) => (
                  <div key={movie._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/movie/poster/${movie._id}`}
                      alt={movie.title}
                      className="object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <h2 className="text-3xl  my-3">Now Showing</h2>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="search movie"
                label="Search by movie name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter movie name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <div className="my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by movie name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
              {filteredMovies.map((movie) => (
                <div key={movie._id}>
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
