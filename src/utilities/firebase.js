// import { initializeApp } from "firebase/app";
// // import { getFunctions } from "firebase/functions";
// import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB2pXC0yyGkZkH7E0VlxJeTSCA-tVsy7f4",
//   authDomain: "full-stack-app-3ad01.firebaseapp.com",
//   projectId: "full-stack-app-3ad01",
//   storageBucket: "full-stack-app-3ad01.appspot.com",
//   messagingSenderId: "1078104217618",
//   appId: "1:1078104217618:web:c34b0368f7bff19791e0cb",
//   measurementId: "G-3EEW2ECX07"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // const db = getFirestore(app);
// // const googleProvider = new GoogleAuthProvider();
// // const functions = getFunctions(app);

// export { app, auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2pXC0yyGkZkH7E0VlxJeTSCA-tVsy7f4",
  authDomain: "full-stack-app-3ad01.firebaseapp.com",
  projectId: "full-stack-app-3ad01",
  storageBucket: "full-stack-app-3ad01.appspot.com",
  messagingSenderId: "1078104217618",
  appId: "1:1078104217618:web:c34b0368f7bff19791e0cb",
  measurementId: "G-3EEW2ECX07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };
