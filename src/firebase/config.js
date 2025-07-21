import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhJtjP-plez01EYL9hgqfDBUSpIkSXyDA",
  authDomain: "project-playlist-f7f52.firebaseapp.com",
  projectId: "project-playlist-f7f52",
  storageBucket: "project-playlist-f7f52.firebasestorage.app",
  messagingSenderId: "517786830571",
  appId: "1:517786830571:web:015d54430f57c6209b60ae"
};

initializeApp(firebaseConfig)

const projectFirestore = getFirestore()
const projectAuth = getAuth()
const projectStorage = getStorage()

export { projectFirestore, projectAuth, projectStorage };