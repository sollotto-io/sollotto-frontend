import React, { useEffect, useState } from 'react';

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
      <span id="timer" key={i}>
        {timeLeft[interval]} {interval}{' '}
      </span>,
    );
  });

  if (flag === 1) {
    return <p id="timer">Lottery is currently closed</p>;
  } else {
    return <div style={{width:"100%"}}>{timerComponents.length ? timerComponents : 'loading..'}</div>;
  }
};

export default Counter;
