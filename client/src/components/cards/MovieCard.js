import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import moment from "moment";
import { Modal } from "antd";
import axios from "axios";
import MovieDetailCard from "./MovieDetailCard";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function MovieCard({ m }) {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [auth, setAuth] = useAuth();

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
    /*
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
        </Modal>
      </div>
    </div>
    */
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${process.env.REACT_APP_API}/movie/poster/${m._id}`}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
