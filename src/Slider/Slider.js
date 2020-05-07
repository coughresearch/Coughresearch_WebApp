import React, { useState } from "react";
import "./Slider.css";
const CustomizedSlider = (props) => {
  const [sildeNumber, setSlideNumber] = useState(0.0);
  const [sildeValue, setSlideValue] = useState("None");
  const [sildeValueYesNo, setSlideValueYesNo] = useState("No");
  const setValue = (val) => {
    let valNum = val;
    let value = "";
    setSlideNumber(val);
    if (props.YesNo) {
      if (valNum >= 0 && valNum <= 0.5) {
        value = "No";
        setSlideValueYesNo("No");
      }
      if (valNum > 0.5 && valNum <= 1.0) {
        value = "Yes";
        setSlideValueYesNo("Yes");
      }
      props.setValue(value);
    } else {
      if (valNum === 0) {
        value = "None";
        setSlideValue("None");
      }
      if (valNum > 0 && valNum <= 0.3) {
        value = "Low";
        setSlideValue("Low");
      }
      if (valNum > 0.3 && valNum <= 0.6) {
        value = "Medium";
        setSlideValue("Medium");
      }
      if (valNum > 0.6) {
        value = "High";
        setSlideValue("High");
      }
      props.setValue(value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <input
        step="0.1"
        type="range"
        min="0.0"
        max="1"
        value={sildeNumber}
        onChange={(e) => setValue(e.target.value)}
        className="slider"
      />

      <div style={{ width: "40px", marginLeft: "10px" }}>
        {props.YesNo ? sildeValueYesNo : sildeValue}
      </div>
    </div>
  );
};

export default CustomizedSlider;
