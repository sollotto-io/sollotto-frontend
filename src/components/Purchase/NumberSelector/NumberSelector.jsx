import React from 'react';
import SingleNumberSelector from './SingleNumberSelector';


export default function NumberSelector() {
  return (
    <div className="numberSelector">
      {[0,1,2,3,4,5].map((ticketPos) =>
      <SingleNumberSelector
      ticketPos={ticketPos}
      key={ticketPos}
      />
      )}

    </div>
  );
}
