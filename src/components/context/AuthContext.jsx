import { createContext, useContext, useEffect, useState } from 'react';
import loginWithGoogle, {
  loginWithEmail,
  logout,
  onUserStateChange,
} from '../../service/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    return readUserFromLocalStorage();
  });

  useEffect(() => {
    onUserStateChange((user) => {
      return setUser(user);
    });
  }, []);

  // Save user info to the localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        uid: user && user.uid,
        loginWithGoogle: loginWithGoogle,
        logout: logout,
        loginWithEmail: loginWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function readUserFromLocalStorage() {
  const userInfo = localStorage.getItem('user');
  return userInfo ? JSON.parse(userInfo) : null;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
