import "./index.scss";

import React, { useEffect, useState } from "react";

import _ from "lodash";

interface ITimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

const Counter = ({ time }: { time: string }): JSX.Element => {
  const timerComponents: JSX.Element[] = [];
  let flag = 0;

  const calculateTimeLeft = (): ITimeLeft | Record<string, never> => {
    const EndDate = new Date(time).getTime();

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

  const [timeLeft, setTimeLeft] = useState<ITimeLeft | Record<string, never>>(
    calculateTimeLeft()
  );

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout();
  });

  if (!_.isEmpty(timeLeft)) {
    Object.keys(timeLeft).forEach((interval, i) => {
      timerComponents.push(
        <span id="timer" key={i}>
          {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
        </span>
      );
    });
  }

  if (flag === 1) {
    return <p id="timer">Lottery is currently closed</p>;
  } else {
    return (
      <div style={{ width: "100%" }}>
        {timerComponents.length ? timerComponents : "loading.."}
      </div>
    );
  }
};

export default Counter;
