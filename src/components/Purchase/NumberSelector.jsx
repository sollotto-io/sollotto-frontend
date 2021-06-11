import React from 'react';
import SingleNumberSelector from './SingleNumberSelector';

export default function NumberSelector({ ticketNumbers }) {
  return (
    <div className="numberSelector">
      {[0, 1, 2, 3, 4, 5].map((numPos, index) => {
        return (
          <SingleNumberSelector
            ticketPos={(el) => (ticketNumbers.current[index] = el)}
            numPos={numPos}
            key={index}
          />
        );
      })}
    </div>
  );
}
