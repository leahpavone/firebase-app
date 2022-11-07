
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";


function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav>
        {user ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <div>
            <Link to="/sign-up">Sign up</Link> /{" "}
            <Link to="/sign-in">Sign in</Link>
          </div>
        )}
      </nav>
      <h2>Home Page</h2>
    </>
  );
}

export default Home;
