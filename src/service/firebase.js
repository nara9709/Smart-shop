import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

// Login with Google
export default async function login() {
  return signInWithPopup(auth, provider)
    .then((user) => {
      return user.user;
    })
    .catch(console.error);
}

// Logout
export async function logout() {
  return signOut(auth)
    .then(() => null)
    .catch((error) => {
      return error;
    });
}

export async function onUserStateChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
