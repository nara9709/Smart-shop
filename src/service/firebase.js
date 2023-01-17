import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { v4 as uuid } from 'uuid';

import { getDatabase, ref, get, set, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const provider = new GoogleAuthProvider();

// Login with Google
export default function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

// Logout
export function logout() {
  signOut(auth).catch(console.error);
}

// Observe user state
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

// Check admins
async function adminUser(user) {
  const dbRef = ref(getDatabase(firebaseApp));

  return get(child(dbRef, `admins`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        //Check a user has admin role or not
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Upload new product data
export async function addNewProduct(product, image) {
  const { title, price, category, description } = product;
  const id = uuid();

  return set(ref(db, 'products/' + id), {
    ...product,
    price: parseInt(product.price),
    id,
    image,
    options: product.options.split(','),
  })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

// Get product Data
export async function getProductList() {
  return get(ref(db, 'products'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
