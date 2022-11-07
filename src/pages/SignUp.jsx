import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utilities/firebase";
import OAuth from "../components/OAuth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../utilities/firebase";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { user } = useContext(AuthContext);

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
    // validateForm({ name, email, password });
  };

  const validateForm = ({ name, email, password }) => {
    if (name.length < 0) {
      setNameError("Name Cannot be empty");
    }

    const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailVal.test(email) || emailVal === 0) {
      setEmailError("Please enter a valid email");
    }

    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
    }
  };

  // const validateName = ({ name }) => {
  //   if (name.length < 0) {
  //     setNameError("Name Cannot be empty");
  //   } else {
  //     setNameError("");
  //   }
  // };

  // const validateEmail = ({ email }) => {
  //   const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   if (!emailVal.test(email) || emailVal === 0) {
  //     setEmailError("Please enter a valid email");
  //   } else {
  //     setEmailError("");
  //   }
  // };

  // const validatePassword = ({ password }) => {
  //   if (password.length < 5) {
  //     setPasswordError("Password should be at least 6 characters long");
  //   } else {
  //     setPasswordError("");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Function that checks if name, email and password are valid
    validateForm({ name, email, password });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name
      });

      const formDataCopy = { ...formData };
      // delete formDataCopy.password;
      formDataCopy.createdAt = serverTimestamp();

      await setDoc(doc(db, "users", userCredential.user.uid), formDataCopy);

      navigate("/dashboard");
      console.log("profile added");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
          {nameError && <div className="error-msg">{nameError}</div>}
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
          {emailError && <div className="error-msg">{emailError}</div>}
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required
          />
          {passwordError && <div className="error-msg">{passwordError}</div>}
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
