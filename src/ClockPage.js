import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import FlipClock from "./Clock";
import api from "./services/focusTimeData";
import "./ClockPage.css";
import Form from "./Form.js";
import TimeChunkBox from "./TimeChunkBox";
import Popouticon from "./Popouticon";
import MetaInfo from "./MetaInfo.js";
import Notification from "./Notif";

const ClockPage = ({ userEmail }) => {
  const [focusTimeArr, setData] = useState([]);
  const [chunkData, setchunkData] = useState(null);
  const [message, setMessage] = useState(null);
  const [displayTime, setdisplayTime] = useState({ hours: 0, min: 0, sec: 0 });
  const [countDown, setCountDown] = useState(0);
  const [liveTime, setLiveTime] = useState(0);

  const clearTimer = () => {
    setdisplayTime({ hours: 0, min: 0, sec: 0 });
    setCountDown(-1);
    setLiveTime(0);
  };
  useEffect(() => {
    const exampleFocusTimeObj = {
      userEmail: "yourEmail@gmail.com",
      tagColor: "#C0C0C0",
      intention: "Solve 5 Leetcode Problems",
      tag: "LC",
      localTime: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      length: "02:00:00",
    };
    let sampleArr = new Array(25).fill(exampleFocusTimeObj);

    api.getFocusTimes().then((res) => {
      const userData = res.data.filter(
        (focusTimeObj) => focusTimeObj.userEmail === userEmail
      );

      //if no user data, generate example data...
      if (userData == false) {
        setData(sampleArr);
      } else {
        //if there is user data, add some but not all filler data...
        const diff =
          sampleArr.length - userData.length > 0
            ? sampleArr.length - userData.length
            : 25;

        if (diff === 25) {
          setData([...userData]);
        } else {
          sampleArr.splice(0, diff);
          setData([...userData, ...sampleArr]);
        }
      }
    });
  });

  document.body.style.cursor = "auto";

  if (focusTimeArr.length > 0) {
    return (
      <div className="container">
        <div className="child1">
          <FlipClock
            displayTime={displayTime}
            timeInMS={countDown}
            liveTime={liveTime}
            setLiveTime={setLiveTime}
            setCountDown={setCountDown}
          />
          <Popouticon
            displayTime={displayTime}
            timeInMS={countDown}
            liveTime={liveTime}
            setLiveTime={setLiveTime}
            setCountDown={setCountDown}
            clearTimer={clearTimer}
            focusTimeArr={focusTimeArr}
          />
        </div>
        <div className="child2">
          <Form
            setData={setData}
            focusTimeArr={focusTimeArr}
            userEmail={userEmail}
            setMessage={setMessage}
            setdisplayTime={setdisplayTime}
            setCountDown={setCountDown}
            clearTimer={clearTimer}
          />
          <Notification message={message} />
        </div>
        <div className="child3">
          <Logout setData={setData} />
        </div>
        <div className="child4">
          <MetaInfo chunkData={chunkData} setchunkData={setchunkData} />
        </div>

        <div className="child5">
          <TimeChunkBox
            focusTimeArr={focusTimeArr}
            setData={setData}
            setchunkData={setchunkData}
            userEmail={userEmail}
            setMessage={setMessage}
            setCountDown={setCountDown}
          />
        </div>
      </div>
    );
  }
};

export default ClockPage;
