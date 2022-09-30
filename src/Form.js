import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import api from "./services/focusTimeData";
import "./Form.css";

const Form = (props) => {
  const {
    focusTimeArr,
    modalData,
    modalIsOpen,
    setData,
    userEmail,
    closeModal,
    setMessage,
    setdisplayTime,
    setCountDown,
    clearTimer,
  } = props;

  const [intention, setIntention] = useState("");
  const [tag, setTag] = useState("");
  const [time, setTime] = useState("");

  const formatTime = (time) => {
    var hours = time.slice(0, 2);
    var min = time.slice(3, 5);
    var sec = time.slice(6);

    //parse to number, check if parsed value is actually a number....
    hours = +hours || 0;
    min = +min || 0;
    sec = +sec || 0;

    const totalSec = hours * 3600 + min * 60 + sec;

    const output = new Date(totalSec * 1000).toISOString().substr(11, 8);
    if (!modalIsOpen) {
      setdisplayTime({ hours: hours, min: min, sec: sec });
      setCountDown(totalSec * 1000);
    }
    return output;
  };

  const handlefocusTimeSubmit = async (event) => {
    event.preventDefault();

    //error handling...
    if (intention === "") {
      setMessage("Please add a focus time intention");
    } else if (tag === "") {
      setMessage("Please add a tag");
    } else if (time === "" || time.slice(0, 2) >= 24) {
      setMessage("Please add a time length between 0min and 24hrs");
    }

    if (
      intention === "" ||
      tag === "" ||
      time.slice(0, 2) >= 24 ||
      time === ""
    ) {
      setTimeout(() => {
        setMessage(null);
      }, 2500);
      return;
    }

    //adding to the database...

    const timeFormatted = formatTime(time);

    if (!modalIsOpen) {
      //if brand new tag, generate a new color etc...
      var tagColorArr = [];
      for (let i = 0; i < focusTimeArr.length; i++) {
        tagColorArr.push({
          tag: focusTimeArr[i].tag,
          color: focusTimeArr[i].tagColor,
        });
      }
      var tagColor;
      if (tagColorArr.filter((el) => el.tag === tag) == false) {
        tagColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
      } else {
        //just use pre-existing tag color...
        tagColor = tagColorArr.filter((el) => el.tag === tag)[0].color;
      }

      const newFocusTime = await api.addFocusTime(
        intention,
        timeFormatted,
        userEmail,
        tag,
        tagColor
      );

      if (focusTimeArr.at(-1).tagColor === "#C0C0C0") {
        focusTimeArr.splice(-1);
      }

      setData([newFocusTime, ...focusTimeArr]);
      setTime("");
      setIntention("");
      setTag("");
    } else {
      modalData.intention = intention;
      modalData.tag = tag;
      modalData.time = time;

      const newData = await api.updateFocusTime(modalData.id, modalData);
      console.log("should be updated now...", newData);
      setMessage("Focus Time data updated!");
      closeModal();
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    }
  };

  const handleFormChange = (event) => {
    console.log(event.target.value);

    if (event.target.name === "intention") {
      setIntention(event.target.value);
    } else if (event.target.name === "tag") {
      setTag(event.target.value);
    } else if (event.target.name === "time") {
      setTime(event.target.value);
    }
  };

  useEffect(() => {
    if (modalData) {
      console.log(modalData);
      console.log("run once ...");
      setIntention(modalData.intention);
      setTag(modalData.tag);
      setTime(modalData.length);
    }
  }, []);

  return (
    <form onSubmit={handlefocusTimeSubmit}>
      <div className="form-container">
        <label>
          <input
            name="intention"
            value={intention}
            type="text"
            placeholder="Solve 15 Leetcode problems"
            onChange={handleFormChange}
          />
        </label>

        <label>
          <input
            name="tag"
            value={tag}
            type="text"
            placeholder="Leetcode"
            onChange={handleFormChange}
          />
        </label>

        <InputMask
          mask="99:99:99"
          maskChar=""
          name="time"
          value={time}
          placeholder="HH:MM:SS"
          onChange={handleFormChange}
        />
      </div>
      <div className="form-container2">
        <button className="button" type="submit">
          {modalIsOpen ? "update" : "submit"}
        </button>
        {!modalIsOpen && (
          <button className="button" type="button" onClick={() => clearTimer()}>
            reset timer
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
