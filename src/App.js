import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Routeslist from "./components/Routeslist";
import { auth } from "./firebase";
import { ADMIN_MAIL } from "./utils/constants";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar
        isAuthenticated={user && user.email === ADMIN_MAIL}
        showLogoutButton={showLogoutButton}
        setShowLogoutButton={setShowLogoutButton}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Routeslist user={user} />
      </main>
    </div>
  );
};

export default App;
