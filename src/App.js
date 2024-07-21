import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import TipsList from "./components/TipsList";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="p-4 bg-gray-800 text-white">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/admin" className="mr-4">
            Admin Panel
          </Link>
        </nav>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<TipsList />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
