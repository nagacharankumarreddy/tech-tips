import React, { useState } from "react";
import { push, ref } from "firebase/database";
import { database } from "../firebase";
import { toast } from "react-toastify";

const SuggestTip = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && linkName && linkUrl) {
      const suggestedTip = {
        title,
        description,
        link: [linkName, linkUrl],
      };
      try {
        await push(ref(database, "suggestedTips"), suggestedTip);
        toast.success("Tip suggested successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        setTitle("");
        setDescription("");
        setLinkName("");
        setLinkUrl("");
      } catch (error) {
        toast.error("Error suggesting tip!", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Suggest a Tip</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-300 border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-300 border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link Name
          </label>
          <input
            type="text"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            className="border-gray-300 border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link URL
          </label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="border-gray-300 border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Suggest Tip
        </button>
      </form>
    </div>
  );
};

export default SuggestTip;
