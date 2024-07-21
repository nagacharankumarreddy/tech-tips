import React, { useEffect, useState } from "react";
import { fetchTips } from "../api";

const TipsList = () => {
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    fetchTips((fetchedTips) => {
      setTips(fetchedTips);
      if (fetchedTips.length === 0) {
        setCurrentTipIndex(0);
      }
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

  const currentTip = tips[currentTipIndex];

  return (
    <div className="p-4 md:p-6 lg:p-8 relative">
      {tips.length === 0 ? (
        <p className="text-center text-lg font-medium">No tips available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">{currentTip.title}</h2>
          <p className="mb-4 text-gray-700">{currentTip.description}</p>
          <a
            href={currentTip.link[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {currentTip.link[0]}
          </a>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentTipIndex === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow-md disabled:opacity-50 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentTipIndex === tips.length - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md disabled:opacity-50 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
