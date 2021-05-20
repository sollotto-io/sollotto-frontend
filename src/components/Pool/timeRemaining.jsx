import React from "react";
import moment from "moment"
import Countdown from 'react-countdown';

const TimeRemaining = ({ time }) => {
  return (
    <div className="gradientBg">
      <div id="poolTimeR">
        <h4>Time Remaining</h4>
        <Countdown className="timer" date={moment().add(2, 'days').format()}
            />
      </div>
    </div>
  );
};

export default TimeRemaining;
