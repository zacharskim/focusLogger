import React from "react";
import "./ClockPage.css";
const TimeChunk = ({ openModal, modalData, setchunkData }) => {
  const getDisplayData = () => {
    setchunkData(modalData);
  };

  return (
    <div className="timeChunk">
      <svg
        onMouseEnter={() => getDisplayData()}
        onClick={() => openModal()}
        viewBox="0 0 300 300"
      >
        <rect
          fill={modalData.tagColor}
          strokeWidth="1"
          stroke={modalData.tagColor}
        ></rect>
      </svg>
    </div>
  );
};

export default TimeChunk;
