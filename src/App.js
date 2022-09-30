import React from "react";
import Canvas from "./Canvas.js";
import { signIn, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import "./Clock.css";
import ClockPage from "./ClockPage.js";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    return <Canvas signIn={signIn} />;
  } else {
    return <ClockPage userEmail={user.email} />;
  }
};

App.whyDidYouRender = true;
export default App;
