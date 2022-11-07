import { useState, useEffect } from "react";
import { auth } from "../utilities/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("email sent");
      setEmailSent(true);
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      setEmailSent(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="forgot-password-page">
      <Link to={"/sign-in"} />
      <h2>Get a reset link</h2>
      {emailSent && (
        <div>
          Email sent! Please follow the instructions contained in the email{" "}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Please enter your email:</h3>
        <input type="text" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
