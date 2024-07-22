import React, { useState } from "react";
import { push, ref } from "firebase/database";
import { database } from "../firebase";
import { toast } from "react-toastify";

const SuggestTip = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!linkName) newErrors.linkName = "Link Name is required";
    if (!linkUrl) newErrors.linkUrl = "Link URL is required";
    if (!author) newErrors.author = "Author is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const suggestedTip = {
      title,
      description,
      link: [linkName, linkUrl],
      author,
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
      setAuthor("");
      setErrors({});
    } catch (error) {
      toast.error("Error suggesting tip!", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    const { name, value } = e.target;
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
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
            name="title"
            value={title}
            onChange={handleInputChange(setTitle)}
            className={`border rounded p-2 w-full ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange(setDescription)}
            className={`border rounded p-2 w-full ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link Name
          </label>
          <input
            type="text"
            name="linkName"
            value={linkName}
            onChange={handleInputChange(setLinkName)}
            className={`border rounded p-2 w-full ${
              errors.linkName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.linkName && (
            <p className="text-red-500 text-sm mt-1">{errors.linkName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link URL
          </label>
          <input
            type="text"
            name="linkUrl"
            value={linkUrl}
            onChange={handleInputChange(setLinkUrl)}
            className={`border rounded p-2 w-full ${
              errors.linkUrl ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.linkUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.linkUrl}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Good Name
          </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleInputChange(setAuthor)}
            className={`border rounded p-2 w-full ${
              errors.author ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
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
