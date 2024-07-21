import { ref, set, get } from "firebase/database";
import { db } from "./firebase";

export const addTip = (tip) => {
  return new Promise((resolve, reject) => {
    const newTipRef = ref(db, "tips/" + new Date().getTime());
    set(newTipRef, tip)
      .then(() => resolve("Tip added successfully"))
      .catch((error) => reject(`Error adding tip: ${error.message}`));
  });
};

export const fetchTips = (callback) => {
  const tipsRef = ref(db, "tips");
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
