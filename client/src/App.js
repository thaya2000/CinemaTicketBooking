import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminGenre from "./pages/admin/Genre";
import AdminMovie from "./pages/admin/Movie";
import AdminMovies from "./pages/admin/Movies";
import AdminMovieUpdate from "./pages/admin/MovieUpdate";
import AdminRoute from "./components/routes/AdminRoute";
import UserProfile from "./pages/user/Profile";
import UserBookings from "./pages/user/Booking";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import { NextUIProvider } from "@nextui-org/react";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 large-text">
      404 | Page Not Found
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "80%", right: "25rem" }}></div>
      <NextUIProvider>
        <BrowserRouter>
          <Menu />
          {/* <h1 className="tw-text-3xl tw-font-bold tw-underline">Hello world!</h1> */}
          <Toaster />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="" element={<Home />} />
            </Route>
            <Route path="/dashboard" element={<PrivateRoutes />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/profile" element={<UserProfile />} />
              <Route path="user/bookings" element={<UserBookings />} />
            </Route>
            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/genre" element={<AdminGenre />} />
              <Route path="admin/movie" element={<AdminMovie />} />
              <Route path="admin/movies" element={<AdminMovies />} />
              <Route
                path="admin/movie/update/:slug"
                element={<AdminMovieUpdate />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} replace />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </div>
  );
}
