import Home from "./Home/Home.jsx";
import About from "./About/About.jsx";
import Shared from "./Shared/Shared.jsx";
import Bands from "./Bands/Bands.jsx"; 
import Venues from "./Venues/Venues.jsx"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      {/* Navigation menu with links */}
      <nav className="main-navigation">
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', padding: '10px' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/bands">Bands</Link></li>
          <li><Link to="/venues">Venues</Link></li>
          <li><Link to="/shared">Shared</Link></li>
        </ul>
      </nav>
      
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/shared" element={<Shared />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}