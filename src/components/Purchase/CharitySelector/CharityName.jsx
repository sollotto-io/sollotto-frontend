import React, { useContext } from 'react';
import {  LotteryContext} from '../../../context/LotteryContext';
export default function CharityName(props) {
  const {lotteryData} = useContext(LotteryContext);

  return (
    <div className="charityName">{lotteryData.Charities[props.charityIndex].charityName}</div>
  );
}
