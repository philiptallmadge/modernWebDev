import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Shared from "./Shared/Shared.jsx";
import Bands from "./Bands/Bands.jsx"; 
import Venues from "./Venues/Venues.jsx"; 
//Import React Router for handling navigation
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import MainList from "./Main/MainList.js";

//main routing structure for app
export default function Components() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route
          path="/"
          element={<ProtectedRoute path="/" element={MainList} />}
          />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      <Shared />
    </Router>
  );
}