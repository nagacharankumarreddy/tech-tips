import { get, ref, remove } from "firebase/database";
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
