import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./constants";

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
