import React, { useState, useEffect } from "react";
import { ReactMic } from "react-mic";

import "./Recording.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";

import "react-h5-audio-player/lib/styles.css";

const Recording = (props) => {
  const [record, setRecord] = useState(false);

  useEffect(() => {}, []);
  const onData = () => {};

  const onStop = (recordedBlob) => {
    const record = recordedBlob;
    setRecord(false);
    if (record.startTime) {
      props.setSound(record);
    }
  };
  const startRecording = () => {
    setRecord(true);
  };
  return (
    <div className="Recording-Main">
      <>
        <ReactMic
          record={record}
          mimeType="audio/wav"
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#a5a5a5"
          backgroundColor="#ffffff"
        />
        <div className="Recording-buttons">
          <button onClick={startRecording} type="button">
            <span className="recordIcon">
              <FontAwesomeIcon icon={faMicrophone} />
            </span>
            Record
          </button>
          <button onClick={onStop} type="button">
            <span className="recordIcon">
              <FontAwesomeIcon icon={faStopCircle} />
            </span>{" "}
            Stop
          </button>
        </div>
      </>
    </div>
  );
};
export default Recording;
