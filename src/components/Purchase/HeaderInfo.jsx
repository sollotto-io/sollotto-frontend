import React, { useContext } from 'react';
import TranspInfo from './purchase-components/TranspInfo';
import LotteryEndInfo from './purchase-components/LotteryEndInfo';
import { LotteryContext } from '../../context/LotteryContext';
import Counter from '../common/countdown';
import Loader from '../common/Loader';

export default function HeaderInfo(props) {
  const { lotteryData } = useContext(LotteryContext);
  if(lotteryData === null){
return <Loader/>
  }
  else{

  
  return (
    <>
      <div className="headerIcons">
        <TranspInfo />
        <LotteryEndInfo />
      </div>
      <div className="lotteryCountdown">
        <Counter time={lotteryData.EndDate} />
      </div>
    </>
  );}
}
