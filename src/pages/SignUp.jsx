import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utilities/firebase";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../utilities/firebase";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { user, loggedIn } = useContext(AuthContext);

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/dashboard");
      console.log("profile added");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <h2 className="page-heading">Sign Up</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            value={name}
            required
          />
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <OAuth />
        <div className="instead-div">
          <p className="instead-text">Already have an account?</p>
          <Link to="/sign-in" className="instead-link">
            sign in
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
