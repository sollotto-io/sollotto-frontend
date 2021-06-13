import React, { useContext } from 'react';
import TranspInfo from './purchase-components/TranspInfo';
import LotteryEndInfo from './purchase-components/LotteryEndInfo';
import { LotteryContext } from '../../context/LotteryContext';
import Counter from '../common/countdown';

export default function HeaderInfo(props) {
  const { lotteryData } = useContext(LotteryContext);
  return (
    <>
      <div className="headerIcons">
        <TranspInfo />
        <LotteryEndInfo />
      </div>
      <div className="lotteryCountdown">
        <Counter time={lotteryData.currentLottery.EndDate} />
      </div>
    </>
  );
}
