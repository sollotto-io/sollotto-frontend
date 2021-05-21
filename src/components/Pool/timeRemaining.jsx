import React from "react";
import Counter from "./countdown"
const TimeRemaining = ({ time }) => {
 return (
    <div className="gradientBg">
      <div id="poolTimeR">
        <h4>Time Remaining</h4>
        <Counter time ={time}/>
      </div>
    </div>
  );
};

export default TimeRemaining;
