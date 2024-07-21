import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const adminEmail = "nagacharankumarreddy@gmail.com";

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);

      if (user.email === adminEmail) {
        toast.success("🎉 You are the admin! 👑", {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        toast.info("🚫 Dude, you are not admin! 😔", {
          position: "top-right",
          autoClose: 5000,
        });
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
