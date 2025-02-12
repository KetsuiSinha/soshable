import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";

const SignupPage = ({ children }) => {
  const { user, signUpWithGoogle, signOutFromApp } = useAuth();

  return (
    <>
      {!user ? (
        <button onClick={signUpWithGoogle}>Sign In with Google</button>
      ) : (
        <>
          {children}
          <button onClick={signOutFromApp}>Sign Out</button>
        </>
      )}
    </>
  );
};

export default SignupPage;