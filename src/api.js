import { ref, push, set, get } from "firebase/database";
import { database } from "./firebase";

export const suggestTip = async (tip) => {
  try {
    const tipsRef = ref(database, "suggestedTips");
    await push(tipsRef, tip);
  } catch (error) {
    console.error("Error suggesting tip:", error);
    throw new Error("Failed to suggest tip");
  }
};

export const fetchSuggestedTips = async () => {
  try {
    const tipsRef = ref(database, "suggestedTips");
    const snapshot = await get(tipsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching suggested tips:", error);
    throw new Error("Failed to fetch suggested tips");
  }
};

export const approveTip = async (id, tip) => {
  try {
    const tipsRef = ref(database, `tips/${id}`);
    await set(tipsRef, tip);
    const suggestedRef = ref(database, `suggestedTips/${id}`);
    await set(suggestedRef, null);
  } catch (error) {
    console.error("Error approving tip:", error);
    throw new Error("Failed to approve tip");
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
