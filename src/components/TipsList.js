import React, { useEffect, useState } from "react";
import { deleteTip, fetchTips } from "../utils/api";
import { ADMIN_MAIL } from "../utils/constants";
import Loader from "./Loader";

const TipsList = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const isAdmin = user && user.email === ADMIN_MAIL;

  useEffect(() => {
    setLoading(true);
    fetchTips((fetchedTips) => {
      setTips(fetchedTips);
      if (fetchedTips.length === 0) {
        setCurrentTipIndex(0);
      }
      setLoading(false);
    });
  }, []);

  const handleNext = () => {
    if (currentTipIndex < tips.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    }
  };

  const handleDelete = async () => {
    const tipId = tips[currentTipIndex].id;
    try {
      await deleteTip(tipId);
      setTips(tips.filter((tip) => tip.id !== tipId));
      setCurrentTipIndex(0);
    } catch (error) {
      console.error("Error deleting tip:", error);
    }
  };

  const currentTip = tips[currentTipIndex];

  return (
    <div className="p-4 md:p-6 lg:p-8 relative mt-16">
      {" "}
      {/* Adjusted margin-top to avoid overlap */}
      {loading ? (
        <Loader />
      ) : tips.length === 0 ? (
        <p className="text-center text-lg font-medium">No tips available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 max-w-md mx-auto relative">
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              title="Double-click to delete"
              onDoubleClick={handleDelete}
            >
              Delete
            </button>
          )}
          <div className="h-64 overflow-y-auto mb-4">
            <h2 className="text-2xl font-bold mb-2">{currentTip.title}</h2>
            <p className="text-gray-700">{currentTip.description}</p>
          </div>
          <div className="text-xl text-right font-extrabold">
            <p className="mt-4 text-gray-500">
              Author -{" "}
              {currentTip?.author ? currentTip.author.toUpperCase() : "ADMIN"}
            </p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentTipIndex === 0}
              className="bg-emerald-600 text-white px-4 py-2 rounded shadow-md disabled:opacity-50 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Previous
            </button>
            <a
              href={currentTip.link[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32 text-center"
            >
              {currentTip.link[0]}
            </a>
            <button
              onClick={handleNext}
              disabled={currentTipIndex === tips.length - 1}
              className="bg-emerald-600 text-white px-4 py-2 rounded shadow-md disabled:opacity-50 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsList;
