import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { v4 as uuid } from 'uuid';

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  onValue,
  query,
  orderByKey,
  orderByValue,
  orderByChild,
  equalTo,
  update,
  remove,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
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

// Get product from Cart
export async function getCart(userId) {
  return get(ref(db, `users/${userId}/carts`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};

      return Object.values(items);
    });
}

// Add product to Cart
export async function addOrUpdateToCart(userId, product) {
  return set(ref(db, `users/${userId}/carts/${product.id}`), product);
}

// Remove product from Cart
export async function removeFromCart(userId, productId) {
  return remove(ref(db, `users/${userId}/carts/${productId}`));
}

// Remove product from product list
export async function removeFromProductList(productId) {
  return remove(ref(db, `products/${productId}`));
}

// export async function addOrUpdateToCart(userId, product) {
//   const dbRef = ref(getDatabase(firebaseApp));

//   // Find the same products & options in the cart
//   // return get(child(dbRef, 'users/' + userId + '/carts/' + product.id)).then(
//   //   (snapshot) => {
//   //     // Check if there's the same product in the cart
//   //     if (snapshot.exists()) {
//   //       // If It exists, check if it's the same option
//   //       if (snapshot.val()[[product.option]]) {
//   //         update(
//   //           ref(
//   //             db,
//   //             'users/' + userId + `/carts/${product.id}/${product.option}`
//   //           ),
//   //           product
//   //         );
//   //         return;
//   //       }
//   //     }
//   //     // Add a new product if it's not the same option or if it doesn't have the product itself in the cart
//   //   }
//   // );

//   return set(
//     ref(db, 'users/' + userId + `/carts/${product.id}/${product.option}`),
//     product
//   );
// }

// Get cart items
export async function getCartItems(userId) {
  const dbRef = ref(getDatabase(firebaseApp));

  return get(child(dbRef, 'users/' + userId + `/carts`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const carts = snapshot.val();
        return Object.values(carts);
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
