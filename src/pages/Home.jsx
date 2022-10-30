import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Home() {
  const auth = getAuth();

  return (
    <>
      <nav>
        {auth.currentUser ? (
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
