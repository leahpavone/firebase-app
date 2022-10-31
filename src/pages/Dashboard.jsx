import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { auth } from "../utilities/firebase";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const { user, setUser, setLoggedIn, setPending } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    setPending(true);
    navigate("/sign-in");
    setPending(false);
    setUser(null);
    setLoggedIn(false);
  };

  console.log(user);

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Hi, {user.displayName}</h1>
      <p>This is your dashboard</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
