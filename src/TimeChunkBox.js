import React from "react";
import Rows from "./Rows.js";

const TimeChunkBox = ({
  focusTimeArr,
  setData,
  setchunkData,
  userEmail,
  setMessage,
  setCountDown,
}) => {
  const tableData = [];

  const copyofFTArr = JSON.parse(JSON.stringify(focusTimeArr));

  while (copyofFTArr.length) {
    tableData.push(copyofFTArr.splice(0, 5));
  }

  return (
    <table>
      <tbody>
        <tr></tr>
        <Rows
          rowData={tableData}
          focusTimeArr={focusTimeArr}
          setData={setData}
          setchunkData={setchunkData}
          userEmail={userEmail}
          setMessage={setMessage}
          setCountDown={setCountDown}
        />
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  );
};

export default TimeChunkBox;
