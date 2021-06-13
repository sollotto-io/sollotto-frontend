import React, { useContext } from 'react';
import { CharityDataContext } from './CharitySelectorGrid';
export default function CharityName(props) {
  const data = useContext(CharityDataContext);

  return (
    <div className="charityName">{data.getActiveCharities[props.charityIndex].charityName}</div>
  );
}
