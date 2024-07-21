import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  update,
} from "firebase/database";
import { firebaseConfig } from "./constants";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, push, get, child, update };
