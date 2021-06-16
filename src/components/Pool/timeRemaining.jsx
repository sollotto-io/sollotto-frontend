import React from 'react';
import Counter from './countdown';
const TimeRemaining = ({ time }) => {
  return (
    <div className="wrap gradientBg">
      <div id="poolTimeR">
        <h4>Time Remaining</h4>
        <Counter
          message="This pool is temporarily closed while we select a winner for this drawing"
          time={time}
        />
      </div>
    </div>
  );
};

export default TimeRemaining;
