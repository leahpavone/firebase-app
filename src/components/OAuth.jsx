import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utilities/firebase";
import googleIcon from "../assets/googleIcon.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      // provider.addScope("profile");
      // provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // This gives you a Google Access Token.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If user doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp()
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="social-login">
      <p className="social-login-text">
        Sign {location.pathname === "/sign-up" ? "up" : "in"} with
      </p>
      <button className="social-icon-div" onClick={onGoogleClick}>
        <img className="social-icon-img" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
