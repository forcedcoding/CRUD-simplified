import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import View from "./View";
import Update from "./Update";

const NewNavBar = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand bg-dark px-4">
        <Link to="/" className="navbar-brand text-white fw-bold">
          MySite
        </Link>

        <div className="ms-auto d-flex gap-2">
          <Link to="/" className="btn btn-outline-light">
            Home
          </Link>

          <Link to="/register" className="btn btn-outline-light">
            Register
          </Link>

          <Link to="/view" className="btn btn-outline-light">
            View
          </Link>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<Update/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default NewNavBar;
