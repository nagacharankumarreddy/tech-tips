import React, { useState, useEffect } from "react";
import { get, push, ref, remove, update } from "firebase/database";
import { database } from "../firebase";
import { toast } from "react-toastify";
import Loader from "./Loader";

const AdminPanel = () => {
  const [suggestedTips, setSuggestedTips] = useState([]);
  const [editingTip, setEditingTip] = useState(null);
  const [editedTip, setEditedTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBulkUpload, setShowBulkUpload] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchSuggestedTips = async () => {
      try {
        setLoading(true);
        const snapshot = await get(ref(database, "suggestedTips"));
        const data = snapshot.val();
        const tipsArray = data
          ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
          : [];
        setSuggestedTips(tipsArray);
      } catch (error) {
        toast.error("Error fetching suggested tips", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedTips();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          await bulkUploadTips(data);
          toast.success("Tips uploaded successfully.");
          setShowBulkUpload(false);
        } catch (error) {
          console.error("Error parsing file:", error);
          toast.error("Failed to parse the file.");
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to read the file.");
    }
  };

  const bulkUploadTips = async (tips) => {
    const tipsRef = ref(database, "tips/");

    const updates = {};
    tips.forEach((tip, index) => {
      const tipId = `tip${Date.now() + index}`;
      updates[`/${tipId}`] = tip;
    });

    await update(tipsRef, updates);
  };

  const handleApprove = async (tip) => {
    try {
      setLoading(true);
      await push(ref(database, "tips"), {
        title: tip.title,
        description: tip.description,
        link: tip.link,
      });
      await remove(ref(database, `suggestedTips/${tip.id}`));
      toast.success("Tip approved and added!", {
        position: "top-right",
        autoClose: 5000,
      });
      setSuggestedTips((prevTips) => prevTips.filter((t) => t.id !== tip.id));
    } catch (error) {
      toast.error("Error approving tip", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tip) => {
    try {
      setLoading(true);
      await remove(ref(database, `suggestedTips/${tip.id}`));
      toast.success("Tip Deleted!", {
        position: "top-right",
        autoClose: 5000,
      });
      setSuggestedTips((prevTips) => prevTips.filter((t) => t.id !== tip.id));
    } catch (error) {
      toast.error("Error deleting tip", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tip) => {
    setEditingTip(tip);
    setEditedTip({ ...tip });
  };

  const handleSave = async () => {
    if (editedTip) {
      try {
        setLoading(true);
        await update(
          ref(database, `suggestedTips/${editingTip.id}`),
          editedTip
        );
        toast.success("Tip updated successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        setSuggestedTips((prevTips) =>
          prevTips.map((tip) => (tip.id === editingTip.id ? editedTip : tip))
        );
        setEditingTip(null);
      } catch (error) {
        toast.error("Error updating tip", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={() => setShowBulkUpload(!showBulkUpload)}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showBulkUpload ? "Close Bulk Upload" : "Bulk Upload"}
        </button>
      </div>

      {showBulkUpload ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-4">Bulk Upload Tips</h2>
          <div className="mb-4">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleBulkUpload}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Tips
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Suggested Tips</h2>
          {suggestedTips.length ? (
            suggestedTips.map((tip) => (
              <div key={tip.id} className="border-b border-gray-200 mb-4 pb-4">
                <h3 className="text-md font-semibold">{tip.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{tip.description}</p>
                <a
                  href={tip.link[1]}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tip.link[0]}
                </a>
                <div className="mt-2">
                  <button
                    onClick={() => handleApprove(tip)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(tip)}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(tip)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No suggested tips available.</p>
          )}

          {editingTip && (
            <div className="mt-4 bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Edit Tip</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editedTip.title}
                  onChange={(e) =>
                    setEditedTip({ ...editedTip, title: e.target.value })
                  }
                  className="border-gray-300 border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editedTip.description}
                  onChange={(e) =>
                    setEditedTip({ ...editedTip, description: e.target.value })
                  }
                  className="border-gray-300 border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Name
                </label>
                <input
                  type="text"
                  value={editedTip.link[0]}
                  onChange={(e) =>
                    setEditedTip({
                      ...editedTip,
                      link: [e.target.value, editedTip.link[1]],
                    })
                  }
                  className="border-gray-300 border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link URL
                </label>
                <input
                  type="text"
                  value={editedTip.link[1]}
                  onChange={(e) =>
                    setEditedTip({
                      ...editedTip,
                      link: [editedTip.link[0], e.target.value],
                    })
                  }
                  className="border-gray-300 border rounded p-2 w-full"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
