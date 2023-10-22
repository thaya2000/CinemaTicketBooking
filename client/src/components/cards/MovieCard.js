import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import moment from "moment";
import { Modal } from "antd";
import axios from "axios";
import MovieDetailCard from "./MovieDetailCard";

export default function MovieCard({ m }) {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [auth, setAuth] = useAuth();

  // const handleMoreDetailsClick = () => {
  //   // You can define the route or action when the button is clicked here
  //   navigate(`/movie/${m._id}`);
  // };

  // async function getActorName(id) {
  //   try {
  //     const response = await axios.get(`/actor/${id}`);
  //     return response.data.name;
  //   } catch (error) {
  //     console.error(error);
  //     return "N/A"; // Return a default value or handle errors as needed
  //   }
  // }

  // async function main() {
  //   const actorId = "65327d95a8c17bf4643ecb57";
  //   const actorName = await getActorName(actorId);
  //   console.log("Actor Name:", actorName);
  // }

  // main().catch((error) => {
  //   console.error(error);
  // });

  const cardStyle = {
    position: "relative",
    marginBottom: "20px",
  };

  const buttonStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  };

  return (
    <div className="card" style={cardStyle}>
      <img
        className="card-img-top"
        src={`${process.env.REACT_APP_API}/movie/poster/${m._id}`}
        alt={m.title}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{m?.title}</h5>
        <h7 style={{ fontStyle: "italic", fontSize: "1rem", color: "#888" }}>
          {moment(m.releaseDate).format("MMM Do YYYY")}
        </h7>
        <button
          className="btn btn-primary"
          style={buttonStyle}
          onClick={() => {
            setVisible(true);
            setSelected(m);
          }}
        >
          More Details
        </button>
        <Modal
          open={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <MovieDetailCard m={m} />
          {/* <div className="p-3">
            <h2>{selected?.title}</h2>
            <p> Synopsi : {selected?.description}</p>
            <p>
              Release Date:{" "}
              {moment(selected?.releaseDate).format("MMM Do YYYY")}
            </p>
            <p>Language: {selected?.language}</p>
            <p>Actors: {selected?.actors?.map((a) => a).join(", ")}</p>
            <p>Genres: {selected?.genre.name}</p>
            <p>Status: {selected?.status}</p>
          </div> */}
        </Modal>
      </div>
    </div>
  );
}
