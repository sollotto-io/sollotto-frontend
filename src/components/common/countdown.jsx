import React, { useEffect, useState } from "react";

const Counter = ({ time }) => {
  const timerComponents = [];
  var flag = 0;

  const calculateTimeLeft = () => {
    let EndDate = new Date(time).getTime();

    const difference = EndDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    } else {
      flag = 1;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout();
  });

  Object.keys(timeLeft).forEach((interval, i) => {
    timerComponents.push(
      <span style={{ fontSize: 20 }} key={i}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  if (flag === 1) {
    return (
      <p style={{ margin: 0, fontSize: 20 }}>Lottery is currently closed</p>
    );
  } else {
    return <div>{timerComponents.length ? timerComponents : "loading.."}</div>;
  }
};

export default Counter;
