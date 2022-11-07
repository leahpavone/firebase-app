import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utilities/firebase";
import Spinner from "../components/Spinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setPending(true);
      setUser(auth.currentUser);
      setPending(false);
      // console.log(auth.currentUser);
    });
  }, []);

  if (pending) {
    return <Spinner />;
  }

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
        loggedIn,
        setLoggedIn,
        setPending,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
