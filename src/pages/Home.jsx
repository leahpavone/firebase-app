import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";

function Home() {
  const auth = getAuth();

  return (
    <>
      {/* <nav> */}
      {auth.currentUser ? (
        <Link to="/dashboard"> {auth.currentUser.displayName}'s Dashboard</Link>
      ) : (
        // <Dashboard />
        // <SignIn />
        <div className="register-btns">
          <Link to="/sign-up">Sign up</Link> /{" "}
          <Link to="/sign-in">Sign in</Link>
        </div>
      )}
      {/* </nav> */}
      <h2>Home Page</h2>
    </>
  );
}

export default Home;
