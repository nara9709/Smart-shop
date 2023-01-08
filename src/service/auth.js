import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import firebaseApp from './firebase';

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

class Auth {
  loginWithGoogle() {
    return signInWithPopup(auth, provider);
  }

  logOut() {
    return signOut(auth);
  }
}

export default Auth;
