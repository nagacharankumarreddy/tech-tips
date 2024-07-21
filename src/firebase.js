import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { database, ref, set, push, get, child, update, auth, provider };
