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
import AdminRoute from "./components/routes/AdminRoute";
import UserProfile from "./pages/user/Profile";
import UserBookings from "./pages/user/Booking";
import PrivateRoutes from "./components/routes/PrivateRoutes";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 large-text">
      404 | Page Not Found
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/bookings" element={<UserBookings />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/genre" element={<AdminGenre />} />
          <Route path="admin/movie" element={<AdminMovie />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}
