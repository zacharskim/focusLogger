import React, { useState } from "react";
import Popout from "./Popout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Popouticon = ({
  displayTime,
  timeInMS,
  liveTime,
  setLiveTime,
  setCountDown,
  focusTimeArr,
  clearTimer,
}) => {
  const [popup, setPopUp] = useState(false);

  if (popup) {
    return (
      <Popout
        setPopUp={setPopUp}
        displayTime={displayTime}
        timeInMS={timeInMS}
        liveTime={liveTime}
        popup={popup}
        setLiveTime={setLiveTime}
        setCountDown={setCountDown}
        clearTimer={clearTimer}
        focusTimeArr={focusTimeArr}
      />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={faUpRightFromSquare}
        size="2x"
        onClick={() => setPopUp(true)}
        inverse
      />
    );
  }
};

export default Popouticon;
