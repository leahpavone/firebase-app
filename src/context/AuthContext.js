import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utilities/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setPending(true);
    onAuthStateChanged(auth, (user) => {
      setPending(false);
      setUser(auth.currentUser);
      // console.log(auth.currentUser);
      setPending(false);
    });
  }, []);

  // return { pending, user };

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("Authenticated", user);
  //     } else {
  //       console.log("signed out");
  //     }
  // setPending(false);
  // setUser(auth.currentUser);
  // setPending(false);
  //   });
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        pending,
        user,
        setPending,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
