import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = ({
  isAuthenticated,
  showLogoutButton,
  setShowLogoutButton,
  handleLogout,
  toggleMenu,
  isMenuOpen,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/admin") && isAuthenticated) {
      setShowLogoutButton(true);
    } else {
      setShowLogoutButton(false);
    }
  }, [location.pathname, isAuthenticated, setShowLogoutButton]);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/tech-tips"
          className="text-xl font-semibold hover:text-gray-300"
        >
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
          {!showLogoutButton && (
            <Link
              to="/admin"
              className="block text-lg font-medium hover:text-gray-300"
              onClick={() => isMenuOpen && toggleMenu()}
            >
              Admin
            </Link>
          )}
          <Link
            to="/suggest-tip"
            className="block text-lg font-medium hover:text-gray-300"
            onClick={() => isMenuOpen && toggleMenu()}
          >
            Suggest Tip
          </Link>
          {showLogoutButton && (
            <button
              onClick={handleLogout}
              className="block text-lg font-medium hover:text-gray-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
