import React, { useState } from "react";
import ReactModal from "react-modal";
import "./Modal.css";
import TimeChunk from "./TimeChunk";
import api from "./services/focusTimeData";
import Form from "./Form";

const Modal = ({
  modalData,
  focusTimeArr,
  setData,
  setchunkData,
  userEmail,
  setMessage,
  setCountDown,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  //should there be a little notif saying updated or deleted?? I think so....
  const deleteTimeChunk = async (focusTimeObj) => {
    await api.deleteFocusTime(focusTimeObj.id, focusTimeObj);
    const pos = focusTimeArr.map((e) => e.id).indexOf(focusTimeObj.id);
    if (pos > -1) {
      focusTimeArr.splice(pos, 1);
    }

    setData([...focusTimeArr]);
  };

  function openModal() {
    setIsOpen(true);
  }

  async function closeModal() {
    console.log("closing");
    setIsOpen(false);
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

    await api.getFocusTimes().then((res) => {
      const userData = res.data.filter(
        (focusTimeObj) => focusTimeObj.userEmail === userEmail
      );

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
    });
  }

  return (
    <div>
      <TimeChunk
        openModal={openModal}
        modalData={modalData}
        setchunkData={setchunkData}
      />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="myoverlay"
        className="mymodal"
        appElement={document.getElementById("root") || undefined}
      >
        <p>Focus Time Data</p>

        <div>
          <Form
            modalData={modalData}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            setData={setData}
            closeModal={closeModal}
            setMessage={setMessage}
            setCountDown={setCountDown}
          />

          <button
            className="buttonModal2"
            onClick={() => deleteTimeChunk(modalData)}
          >
            delete
          </button>
          <button className="buttonModal" onClick={closeModal}>
            close
          </button>
        </div>
        <div></div>
      </ReactModal>
    </div>
  );
};

export default Modal;
