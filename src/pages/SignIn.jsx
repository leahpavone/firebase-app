import { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilities/firebase";
import OAuth from "../components/OAuth";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [activeUser, setActiveUser] = useState(true);

  const { user } = useContext(AuthContext);

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
    setActiveUser(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        setActiveUser(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setActiveUser(false);
      console.log("Bad User Credentials");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <h2 className="page-heading">Sign In</h2>
      {activeUser ? "" : <div className="error-msg">Bad User Credentials</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Submit</button>
          <Link to={"/forgot-password"}>Forgot Password?</Link>
        </form>
        <OAuth />
        <div className="instead-div">
          <p className="instead-text">Don't have an account?</p>
          <Link to="/sign-up" className="instead-link">
            sign up
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
