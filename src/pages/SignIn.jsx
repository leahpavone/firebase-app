import { useState, useEffect, useContext } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import OAuth from "../components/OAuth";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { user, pending } = useContext(AuthContext);

  const { email, password } = formData;

  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
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
        navigate("/dashboard");
      }

      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Bad User Credentials");
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [navigate, auth.currentUser]);

  return (
    <>
      <h2 className="page-heading">Sign In</h2>
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
