import React from "react";
import styles from "./MetaInfo.module.css";

const MetaInfo = ({ chunkData }) => {
  if (chunkData) {
    return (
      <div className={styles.metaInfo}>
        <ul>
          <li>Intention: {chunkData.intention} </li>
          <li>Tag: {chunkData.tag}</li>
          <li>Length: {chunkData.length}</li>
          <li>
            Date: on {chunkData.date} @ {chunkData.localTime}
          </li>
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};

export default MetaInfo;
