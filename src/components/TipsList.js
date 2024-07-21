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
    <div className="p-4">
      {tips.length === 0 ? (
        <p>No tips available.</p>
      ) : (
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-bold mb-2">{currentTip.title}</h2>
          <p className="mb-4">{currentTip.description}</p>
          <a
            href={currentTip.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {currentTip.link}
          </a>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentTipIndex === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentTipIndex === tips.length - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
