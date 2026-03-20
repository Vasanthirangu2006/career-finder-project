import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
// import "./index.css";

/** Get all careers (from Firestore) */
export const getCareers = async () => {
  try {
    const snap = await getDocs(collection(db, "careers"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error fetching careers:", err);
    return [];
  }
};

/** Get careers by sector */
export const getCareersBySector = async (sector) => {
  try {
    if (!sector) return [];
    const q = query(collection(db, "careers"), where("sector", "==", sector));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error(`Error fetching careers for sector ${sector}:`, err);
    return [];
  }
};

/** Get a career by id */
export const getCareer = async (id) => {
  try {
    if (!id) return null;
    const ref = doc(db, "careers", id);
    const d = await getDoc(ref);
    return d.exists() ? { id: d.id, ...d.data() } : null;
  } catch (err) {
    console.error(`Error fetching career with id ${id}:`, err);
    return null;
  }
};
