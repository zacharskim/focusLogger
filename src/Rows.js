import React from "react";
import Modal from "./Modal";

const Rows = ({
  rowData,
  focusTimeArr,
  setData,
  setchunkData,
  userEmail,
  setMessage,
  setCountDown,
}) => {
  return rowData.map((row) => {
    return (
      <tr key={row[0].id}>
        {row.map((data) => (
          <td key={data.id}>
            <Modal
              focusTimeArr={focusTimeArr}
              modalData={data}
              setData={setData}
              setchunkData={setchunkData}
              userEmail={userEmail}
              setMessage={setMessage}
              setCountDown={setCountDown}
            />
          </td>
        ))}
      </tr>
    );
  });
};

export default Rows;
