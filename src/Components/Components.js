import Home from "./Home/Home.js";
import About from "./About/About.js";
import Shared from "./Shared/Shared.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Compenents() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}
