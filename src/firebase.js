import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgy36_liQ1D6bO38N9APZStS5uwApeSxc",
  authDomain: "focusapp-23302.firebaseapp.com",
  projectId: "focusapp-23302",
  storageBucket: "focusapp-23302.appspot.com",
  messagingSenderId: "697670635366",
  appId: "1:697670635366:web:3cf77e99e4268bc36b82a7",
  measurementId: "G-1HX3889G8L",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const signIn = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const signOutFunc = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed ya boi out...");
    })
    .catch((error) => {
      // An error happened.
    });
};

export { auth, signIn, signOutFunc };
