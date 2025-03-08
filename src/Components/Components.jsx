import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Shared from "./Shared/Shared.jsx";
import Bands from "./Bands/Bands.jsx"; 
import Venues from "./Venues/Venues.jsx"; 
//Import React Router for handling navigation
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

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
        </Routes>
      <Shared />
    </Router>
  );
}