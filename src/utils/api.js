import { get, ref, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import { database } from "../firebase";

export const deleteTip = async (id) => {
  try {
    await remove(ref(database, `tips/${id}`));
    toast.success("Tip Deleted!", {
      position: "top-right",
      autoClose: 5000,
    });
  } catch (error) {
    toast.error("Error deleting tip", {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};

// Existing fetchTips function
export const fetchTips = (callback) => {
  const tipsRef = ref(database, "tips");
  get(tipsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const tipsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        callback(tipsArray);
      } else {
        callback([]);
      }
    })
    .catch((error) => console.error(`Error fetching tips: ${error.message}`));
};

// New updateTip function
export const updateTip = async (id, updatedTip) => {
  try {
    const tipRef = ref(database, `tips/${id}`);
    await update(tipRef, updatedTip);
    toast.success("Tip Updated!", {
      position: "top-right",
      autoClose: 5000,
    });
  } catch (error) {
    toast.error("Error updating tip", {
      position: "top-right",
      autoClose: 5000,
    });
    throw error;
  }
};
