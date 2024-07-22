import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg font-medium text-gray-700 mb-4">
          Oops! The page you're looking for cannot be found.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          You will be redirected to the homepage in{" "}
          <span id="countdown" className="font-bold">
            {countdown}
          </span>{" "}
          seconds.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
