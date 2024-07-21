import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import TipsList from "./components/TipsList";
import SuggestTip from "./components/SuggestTip";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const adminEmail = "nagacharankumarreddy@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const isAuthenticated = user && user.email === adminEmail;

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <nav className="bg-gray-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold hover:text-gray-300">
              Home
            </Link>
            <button
              onClick={toggleMenu}
              className={`block lg:hidden focus:outline-none ${
                isMenuOpen ? "bg-blue-600" : "bg-gray-700"
              } p-2 rounded-md`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <div
              className={`lg:flex lg:items-center lg:space-x-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent lg:p-0 p-4 lg:flex-row flex-col lg:space-y-0 space-y-4 ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/admin"
                className={`block text-lg font-medium hover:text-gray-300 `}
                onClick={handleLinkClick}
              >
                Admin
              </Link>
              <Link
                to="/suggest-tip"
                className="block text-lg font-medium hover:text-gray-300"
                onClick={handleLinkClick}
              >
                Suggest Tip
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<TipsList />} />
            <Route path="/suggest-tip" element={<SuggestTip />} />
            <Route
              path="/admin"
              element={
                isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
