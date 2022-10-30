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
  // console.log(auth);
  // console.log(user === auth.currentUser);

  // useEffect(() => {
  //   if (user === auth.currentUser) {
  //     navigate("/dashboard");
  //   }
  // }, [auth.currentUser, navigate, user]);

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

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
    } catch (error) {
      console.log("Bad User Credentials");
    }
  };

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
