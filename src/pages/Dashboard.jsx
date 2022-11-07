/* eslint-disable no-restricted-globals */
import { useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { db } from "../utilities/firebase";
import {
  updateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth } from "../utilities/firebase";
import { useNavigate, Link } from "react-router-dom";
import visibilityIcon from "../assets/visibilityIcon.svg";
import hideIcon from "../assets/hideIcon.png";
import ResetPassword from "../components/ResetPassword";
import Fact from "../components/Fact";

function Dashboard() {
  const [currentPassVisible, setCurrentPassVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    updatedAt: serverTimestamp()
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentPasswordRef = useRef();

  const { name, email, updatedAt } = formData;

  console.log(user);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.email !== email) {
        // Update email in firebase
        await updateEmail(auth.currentUser, email);
      }

      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        });
      }

      // Update in firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
        email,
        updatedAt
      });
    } catch (error) {
      console.log(error);
      console.log("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleResetClick = () => {
    setIsResetting((prevState) => !prevState);
  };

  const showCurrentPasswordClick = async () => {
    setCurrentPassVisible(!currentPassVisible);
  };

  const reauthenticate = async (password) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );
      console.log(result);
      setIsAuthenticated(true);
      setCurrentPasswordError(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);

      setCurrentPasswordError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      reauthenticate(currentPasswordRef.current.value);
      setCurrentPasswordError(false);
    } catch (error) {
      setCurrentPasswordError(true);
      console.log(error);
    }
  };

  return (
    <div className="dashboard-page">
      <Fact />
      <nav className="dash-nav">
        <Link to="/" className="home-link">
          Home
        </Link>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <h1 className="greeting-header">Hi, {user.displayName}</h1>
      <p className="greeting-text">This is your dashboard</p>

      <div className="profile-details-ctr">
        <div className="profile-details-text">Profile Details</div>

        <div className="forms-background">
          <div className="update-profile-form-ctr">
            <div className="update-details-btn-ctr">
              <button
                className="update-details-btn"
                onClick={() => {
                  updateDetails && onSubmit();
                  setUpdateDetails((prevState) => !prevState);
                }}
              >
                {updateDetails ? "Done" : "Update"}
              </button>
            </div>
            <form className="update-profile-form">
              <input
                type="text"
                id="name"
                className={!updateDetails ? "name" : "name-active"}
                disabled={!updateDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                className={!updateDetails ? "email" : "email-active"}
                disabled={!updateDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
          <div className="reset-password-btn-ctr">
            <button
              type="button"
              className={
                isResetting ? "reset-password-btn-active" : "reset-password-btn"
              }
              onClick={handleResetClick}
            >
              Reset Password
            </button>
          </div>
          {isResetting && (
            <>
              <form className="reset-password-form" onSubmit={handleSubmit}>
                <div className="password-input-ctr">
                  <label
                    htmlFor="enter-current-password"
                    className="reset-password-input-label"
                  >
                    Enter current password:
                  </label>
                  <div className="password-input-inner-ctr">
                    <input
                      type={currentPassVisible ? "text" : "password"}
                      id="currentPassword"
                      className="enter-current-password-input"
                      ref={currentPasswordRef}
                      onChange={onChange}
                      // value={currentPassword}
                    />
                    <img
                      src={currentPassVisible ? visibilityIcon : hideIcon}
                      className="show-current-password-icon"
                      onClick={showCurrentPasswordClick}
                      alt="view/hide password"
                    />
                  </div>
                  {currentPasswordError ? "Password does not match" : ""}
                </div>
                {isAuthenticated ? (
                  <></>
                ) : (
                  <button type="submit" className="authenticate-btn">
                    Submit
                  </button>
                )}
              </form>
              {isAuthenticated && <ResetPassword />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
