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
    setPending(true);
    onAuthStateChanged(auth, (user) => {
      setPending(false);
      setUser(auth.currentUser);
      setLoggedIn(true);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Spinner />;
  }

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
