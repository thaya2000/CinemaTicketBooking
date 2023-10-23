import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "./auth.css";
import logo from "./logo192.png";

export default function Login() {
  // state
  const [email, setEmail] = useState("thaya@gamil.com");
  const [password, setPassword] = useState("tttttttt");

  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        navigate(
          location.state || `/`
          // `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
        toast.success("Login successful");
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again.");
    }
  };
  return (
    <div>
      {/* <Jumbotron title="Login" /> */}
      <div className="log-container">
        <div className="row1">
          <div
            style={{
              marginTop: "3rem",
              marginLeft: "5rem",
              width: "10rem",
              height: "10rem",
            }}
            className="img"
          >
            <img src={logo} alt="" />
          </div>

          <div className="name">
            <div className="h1">
              <span>Regal&nbsp;Cinema</span>
            </div>
            <div>
              <span>Enjoy your visual experience..!</span>
            </div>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="tittle">
                <b>Log In</b>
              </div>
              <input
                type="text"
                className="forminput"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="text"
                className="forminput"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="submit" style={{ cursor: "pointer" }}>
                <span>
                  Don't have an account.{" "}
                  <b style={{ color: "#b607ec" }}>SignUp!</b>
                </span>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="button submitbut"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
