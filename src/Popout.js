import React from "react";
import NewWindow from "react-new-window";
import FlipClock from "./Clock";
import "./Popout.css";
const Popout = ({
  setPopUp,
  displayTime,
  timeInMS,
  liveTime,
  popup,
  setLiveTime,
  setCountDown,
  focusTimeArr,
}) => (
  <>
    <NewWindow
      title="clock"
      center="parent"
      copyStyles="false"
      features={{ left: 100, top: 100, width: 400, height: 400 }}
      onUnload={() => setPopUp(false)}
    >
      <div className="popoutContainer">
        <FlipClock
          displayTime={displayTime}
          timeInMS={timeInMS}
          liveTime={liveTime}
          popup={popup}
          setLiveTime={setLiveTime}
          setCountDown={setCountDown}
        />
        <span className="popoutChild"> {focusTimeArr.at(0).intention}</span>
      </div>
    </NewWindow>
  </>
);

export default Popout;
