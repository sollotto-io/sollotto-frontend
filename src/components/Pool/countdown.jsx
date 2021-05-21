import React from "react";
import moment from "moment";
import Countdown from "react-countdown";

const Counter = ({ time }) => {
  return (
    <div>
      <Countdown className="timer" date={moment(time).format()} />
    </div>
  );
};

export default Counter;
