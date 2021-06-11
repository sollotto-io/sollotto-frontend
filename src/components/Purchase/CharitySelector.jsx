import React from 'react';
import CharitySelectorGrid from './CharitySelectorGrid';
export default function CharitySelector() {
  return (
    <div className="charitySelector">
      <span>Vote For Your Charity Of Choice:</span>
      <CharitySelectorGrid />
    </div>
  );
}
