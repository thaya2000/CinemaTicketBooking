import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select, Button, Input } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

export default function AdminMovieUpdate() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");

  const [releaseDate, setReleaseDate] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("");

  const [currentActor, setCurrentActor] = useState("");
  const [actorList, setActorList] = useState([]);
  const [id, setId] = useState("");

  // hook
  const navigate = useNavigate();
  const params = useParams();

  console.log("Params => ", params);

  console.log(actorList);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: genreData } = await axios.get("/genres");
      setGenres(genreData);

      const { data: actorData } = await axios.get("/actors");
      setActors(actorData);

      const { data: movieData } = await axios.get(`/movie/${params.slug}`);
      console.log(movieData);
      setTitle(movieData.title);
      setDescription(movieData.description);
      setGenre(movieData.genre._id);
      setDirector(movieData.director);
      setReleaseDate(movieData.releaseDate);
      setLanguage(movieData.language);
      setStatus(movieData.status);
      setActorList(movieData.actors);
      setId(movieData._id);

      console.log(movieData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddActor = () => {
    if (currentActor) {
      setActorList([...actorList, currentActor]);
      console.log(actorList);
      console.log(currentActor);
      setCurrentActor(""); // Reset currentActor for the next selection.
    }
  };

  const handleRemoveActor = (index) => {
    const updatedActors = [...actorList];
    updatedActors.splice(index, 1);
    setActorList(updatedActors);
  };

  const renderActorList = () => {
    return (
      <div className="d-flex flex-wrap">
        {actorList.map((actor, index) => {
          const actorObject = actors.find((a) => a._id === actor);

          return (
            <div className="card m-1 col-auto" key={index}>
              <div className="card-body text-center">
                {actorObject ? actorObject.name : "Unknown"}
              </div>
              <div className="card-footer  text-center">
                <Button
                  type="link"
                  onClick={() => handleRemoveActor(index)}
                  className="text-danger "
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const movieData = new FormData();
      photo && movieData.append("poster", photo);
      movieData.append("title", title);
      movieData.append("description", description);
      movieData.append("genre", genre);
      movieData.append("director", director);
      movieData.append("actors", JSON.stringify(actorList));
      movieData.append("releaseDate", releaseDate);
      movieData.append("language", language);
      movieData.append("status", status);

      const { data } = await axios.put(`/movie/${id}`, movieData);
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.title}" is updated`);
        navigate("/dashboard/admin/movies");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error("Movie update failed. Try again.");
    }
  };

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/movie/${id}`);
      toast.success(`"${data.name}" is deleted`);
      navigate("/dashboard/admin/movies");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Movie</div>

            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${
                    process.env.REACT_APP_API
                  }/movie/poster/${id}?${new Date().getTime()}`}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Enter movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Enter movie description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose genre"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => setGenre(value)}
              value={genre}
            >
              {genres.map((g) => (
                <Option key={g._id} value={g._id}>
                  {g.name}
                </Option>
              ))}
            </Select>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Enter movie director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />

            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose actor"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => setCurrentActor(value)}
            >
              {actors.map((a) => (
                <Option key={a._id} value={a._id}>
                  {a.name}
                </Option>
              ))}
            </Select>

            <Button
              type="primary"
              onClick={handleAddActor}
              style={{ marginBottom: "10px" }}
            >
              Add Actor
            </Button>

            {renderActorList()}

            <input
              type="date"
              className="form-control p-2 mb-3"
              placeholder="Enter movie release date"
              value={moment(releaseDate).format("YYYY-MM-DD")}
              onChange={(e) => setReleaseDate(e.target.value)}
            />

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Enter movie language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose the Status of the movie"
              value={status}
              onChange={(value) => setStatus(value)}
            >
              <option value="Now Showing">Now Showing</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Expired">Expired</option>
            </Select>

            <div className="d-flex justify-content-between">
              <button onClick={handleSubmit} className="btn btn-primary mb-5">
                Update
              </button>
              <button onClick={handleDelete} className="btn btn-danger mb-5">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
