import React from 'react';
import useReduxState from '../../hooks/useReduxState';
export default function CharityName(props) {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData } = lotteryState;

  return <div className="charityName">{lotteryData.Charities[props.charityIndex].charityName}</div>;
}
