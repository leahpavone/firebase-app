import { useContext, useState, useRef, useEffect } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { db } from "../utilities/firebase";
import { doc } from "firebase/firestore";
import { auth } from "../utilities/firebase";
import AuthContext from "../context/AuthContext";
import visibilityIcon from "../assets/visibilityIcon.svg";
import hideIcon from "../assets/hideIcon.png";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassVisible, setNewPassVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const newPasswordRef = useRef();

  const showNewPasswordClick = async () => {
    setNewPassVisible(!newPassVisible);
  };

  const onChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword < 6) {
      setNewPasswordError(true);
      setResetSuccessful(false);
    } else {
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          setNewPasswordError(false);
          setResetSuccessful(true);
          console.log("successfully changed password");
          setTimeout(() => {
            auth.signOut();
            navigate("/sign-in");
          }, 5000);
        })
        .catch((error) => {
          setNewPasswordError(true);
          console.log(error);
        });
    }
  };

  return (
    <div className="reset-password-form-ctr">
      <>
        {resetSuccessful && (
          <div className="success-msg">Successfully updated password!</div>
        )}
      </>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="password-input-ctr">
          <label
            htmlFor="enter-new-password"
            className="reset-password-input-label"
          >
            Enter new password:
          </label>
          <div className="password-input-inner-ctr">
            <input
              type={newPassVisible ? "text" : "password"}
              id="newPassword"
              className="enter-new-password-input"
              ref={newPasswordRef}
              onChange={onChange}
              value={newPassword}
            />
            <img
              src={newPassVisible ? visibilityIcon : hideIcon}
              className="show-new-password-icon"
              onClick={showNewPasswordClick}
              alt="view/hide password"
            />
          </div>
          <>
            {newPasswordError && (
              <div className="success-msg">
                unable to update password, must be 6
              </div>
            )}
          </>
        </div>
        <button className="save-password-btn">Save new password</button>
      </form>
    </div>
  );
}

export default ResetPassword;

// import { useContext, useState, useRef, useEffect } from "react";
// import {
//   updatePassword,
//   EmailAuthProvider,
//   reauthenticateWithCredential
// } from "firebase/auth";
// import { db } from "../utilities/firebase";
// import { doc } from "firebase/firestore";
// import { auth } from "../utilities/firebase";
// import AuthContext from "../context/AuthContext";
// import visibilityIcon from "../assets/visibilityIcon.svg";
// import hideIcon from "../assets/hideIcon.png";
// import { useNavigate } from "react-router-dom";

// function ResetPassword() {
//   // const [currentPassVisible, setCurrentPassVisible] = useState(false);
//   const [newPassVisible, setNewPassVisible] = useState(false);
//   const [resetFormData, setResetFormData] = useState({
//     currentPassword: "",
//     newPassword: ""
//   });
//   const [resetSuccessful, setResetSuccessful] = useState(false);
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // const [newPassword, setNewPassword] = useState("");

//   const { currentPassword, newPassword } = resetFormData;

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // const currentPasswordRef = useRef();
//   const newPasswordRef = useRef();

//   // const showCurrentPasswordClick = async () => {
//   //   setCurrentPassVisible(!currentPassVisible);
//   // };
//   const showNewPasswordClick = async () => {
//     setNewPassVisible(!newPassVisible);
//   };

//   // const reauthenticate = async (password) => {
//   //   try {
//   //     const credential = EmailAuthProvider.credential(
//   //       auth.currentUser.email,
//   //       password
//   //     );
//   //     const result = await reauthenticateWithCredential(
//   //       auth.currentUser,
//   //       credential
//   //     );
//   //     console.log(result);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const reauthenticate = (currentPassword, newPassword) => {
//   //   const credential = EmailAuthProvider.credential(
//   //     user.email,
//   //     currentPassword
//   //   );
//   //   reauthenticateWithCredential(auth.currentUser, credential);
//   //   setIsAuthenticated(true);

//   //   if (isAuthenticated) {
//   //     updatePassword(auth.currentUser, newPassword)
//   //       .then(() => {
//   //         console.log("successfully changed password");
//   //         setTimeout(() => {
//   //           auth.signOut();
//   //           navigate("/sign-in");
//   //         }, 5000);
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //       });
//   //   }
//   // };

//   // const onChange = (e) => {
//   //   setResetFormData((prevState) => ({
//   //     ...prevState,
//   //     [e.target.id]: e.target.value
//   //   }));
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updatePassword(auth.currentUser, newPassword)
//           .then(() => {
//             console.log("successfully changed password");
//             setTimeout(() => {
//               auth.signOut();
//               navigate("/sign-in");
//             }, 5000);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//   };
//   //   try {
//   //     reauthenticate(currentPasswordRef.current.value);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   //   console.log(resetFormData);
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     reauthenticate(currentPasswordRef.current.value);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   //   console.log(resetFormData);
//   // };

//   return (
//     <div className="reset-password-form-ctr">
//       {/* {resetSuccessful && (
//         <div className="success-msg">Successfully changed password!</div>
//       )} */}
//       <form className="reset-password-form" onSubmit={handleSubmit}>
//       {/* <div className="password-input-ctr">
//           <label
//             htmlFor="enter-current-password"
//             className="reset-password-input-label"
//           >
//             Enter current password:
//           </label>
//           <div className="password-input-inner-ctr">
//             <input
//               type={currentPassVisible ? "text" : "password"}
//               id="currentPassword"
//               className="enter-current-password-input"
//               ref={currentPasswordRef}
//               onChange={onChange}
//               value={currentPassword}
//             />
//             <img
//               src={currentPassVisible ? visibilityIcon : hideIcon}
//               className="show-current-password-icon"
//               onClick={showCurrentPasswordClick}
//               alt="view/hide password"
//             />
//           </div>
//         </div> */}

//       <div className="password-input-ctr">
//         <label
//           htmlFor="enter-new-password"
//           className="reset-password-input-label"
//         >
//           Enter new password:
//         </label>
//         <div className="password-input-inner-ctr">
//           <input
//             type={newPassVisible ? "text" : "password"}
//             id="newPassword"
//             className="enter-new-password-input"
//             ref={newPasswordRef}
//             // onChange={onChange}
//             value={newPassword}
//           />
//           <img
//             src={newPassVisible ? visibilityIcon : hideIcon}
//             className="show-new-password-icon"
//             onClick={showNewPasswordClick}
//             alt="view/hide password"
//           />
//         </div>
//       </div>
//       <button className="save-password-btn">Save new password</button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;
