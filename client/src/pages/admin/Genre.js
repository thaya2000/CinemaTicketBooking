import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/nav/AdminMenu";
import GenreForm from "../../components/forms/GenreForm";
import { Modal } from "antd";

export default function AdminGenre() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [genres, setGenres] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const { data } = await axios.get("/genres");
      setGenres(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/genre", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setName("");
        loadGenres();
        toast.success(`"${data.name}" is created`);
      }
      console.log(name);
    } catch (err) {
      console.log(err);
      toast.error("Create genre failed. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/genre/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is updated`);
        setSelected(null);
        setUpdatingName("");
        loadGenres();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/genre/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is deleted`);
        setSelected(null);
        setUpdatingName("");
        loadGenres();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Genres</div>

            <GenreForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />

            <div className="col">
              {genres?.map((g) => (
                <button
                  key={g._id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(g);
                    setUpdatingName(g.name);
                  }}
                >
                  {g.name}
                </button>
              ))}
            </div>
            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <GenreForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                buttonText="Update"
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
