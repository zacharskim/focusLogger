import React from "react";
import { signOutFunc } from "./firebase";

const Logout = ({ setData }) => {
  return (
    <div className="btn-container">
      <button className="lgt-btn" onClick={signOutFunc}>
        sign out
      </button>
    </div>
  );
};

export default Logout;
