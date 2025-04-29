import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Shared from "./Shared/Shared.jsx";
import Bands from "./Bands/Bands.jsx"; 
import Venues from "./Venues/Venues.jsx"; 
//Import React Router for handling navigation
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthModule from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import MainList from "./Main/MainList.jsx";
import Calendar from "./Calendar/Calendar.jsx";

//main routing structure for app
export default function Components() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%",maxWidth: "1200px", margin: "0 auto", }}>
    <Router>
      <Shared />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/calendar" element = {<Calendar />} /> 
          <Route path="/loggedIn" element={<ProtectedRoute element={MainList} />}/>
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    </Router>
    </div>
  );
}