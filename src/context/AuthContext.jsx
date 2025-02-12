import  { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseApp , db } from "../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userInfo = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          image: firebaseUser.photoURL,
        };
        setUser(userInfo);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const userInfo = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        image: firebaseUser.photoURL,
      };
      setUser(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      throw error;
    }
  };

  const signOutFromApp = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signUpWithGoogle, signOutFromApp }}>
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;