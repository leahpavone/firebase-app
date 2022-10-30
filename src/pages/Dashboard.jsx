// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

import { auth } from "../utilities/firebase";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  // const { pending, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Hi, {auth.currentUser.displayName}</h1>
      <p>This is your dashboard</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;
