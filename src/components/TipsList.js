import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { deleteTip, fetchTips, updateTip } from "../utils/api";
import { ADMIN_MAIL } from "../utils/constants";
import Loader from "./Loader";

const TipsList = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTip, setEditedTip] = useState({
    title: "",
    description: "",
    link: ["", ""],
  });

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTip({ ...tips[currentTipIndex] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTip({ ...editedTip, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTip(editedTip.id, editedTip);
      setTips(tips.map((tip) => (tip.id === editedTip.id ? editedTip : tip)));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating tip:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const currentTip = tips[currentTipIndex];

  return (
    <div className="p-4 md:p-6 lg:p-8 relative mt-16">
      {loading ? (
        <Loader />
      ) : tips.length === 0 ? (
        <p className="text-center text-lg font-medium">No tips available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 max-w-md mx-auto relative">
          {isAdmin && !isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                title="Click to edit"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="absolute top-4 right-24 bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                title="Double-click to delete"
                onDoubleClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
          {isEditing ? (
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col space-y-4"
            >
              <input
                type="text"
                name="title"
                value={editedTip.title}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editedTip.description}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Description"
                rows="4"
              />
              <input
                type="text"
                name="link[0]"
                value={editedTip.link[0]}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Link Text"
              />
              <input
                type="url"
                name="link[1]"
                value={editedTip.link[1]}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Link URL"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="h-64 overflow-y-auto mb-4">
                <h2 className="text-2xl font-bold mb-2">{currentTip.title}</h2>
                <p className="text-gray-700">{currentTip.description}</p>
              </div>
              <div className="text-xl text-right font-extrabold">
                <p className="mt-4 text-gray-500">
                  Author -{" "}
                  {currentTip?.author
                    ? currentTip.author.toUpperCase()
                    : "ADMIN"}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentTipIndex === 0}
                  className="hidden md:flex bg-emerald-600 text-white px-4 py-2 rounded shadow-md disabled:opacity-50 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  Previous
                </button>
                <button
                  onClick={handlePrevious}
                  disabled={currentTipIndex === 0}
                  className="md:hidden text-emerald-600 disabled:opacity-50"
                >
                  <FaArrowLeft />
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
                  className="hidden md:flex bg-emerald-600 text-white px-4 py-2 rounded shadow-md disabled:opacity-50 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  Next
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentTipIndex === tips.length - 1}
                  className="md:hidden text-emerald-600 disabled:opacity-50"
                >
                  <FaArrowRight />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TipsList;
