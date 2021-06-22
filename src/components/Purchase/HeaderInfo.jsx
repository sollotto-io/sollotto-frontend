import React, { useContext } from 'react';
import TranspInfo from './purchase-components/TranspInfo';
import LotteryEndInfo from './purchase-components/LotteryEndInfo';
import { LotteryContext } from '../../context/LotteryContext';
import Counter from '../common/countdown';
import Loader from '../common/Loader';
import { GlobalContext } from '../../context/GlobalContext';
import _ from 'lodash';

export default function HeaderInfo(props) {
  const { lotteryData,loading } = useContext(LotteryContext);
  const { globalData } = useContext(GlobalContext);
  var myTickets = []
  var flag = false
  
  if (globalData.selectedWallet !== null && globalData.selectedWallet!==undefined) {

      if(globalData.selectedWallet.publicKey !==null && globalData.selectedWallet.publicKey !== undefined){
        flag =true
        var wallet =  Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data
        myTickets = lotteryData.Tickets.filter((t)=>{
          return (_.isEqual(wallet, t.walletID))
        })
      }
  
   
  }
  if(loading === true){
return <Loader/>
  }
  else if(lotteryData === null){
    return (
      <>
        <div className="headerIcons">
          <TranspInfo />
        </div>
        <div className="lotteryCountdown">
          <p>please wait till another draw starts</p>
        </div>
      </>
    );

  }else{
     return (
    <>
      <div className="headerIcons">
        <TranspInfo />
        <LotteryEndInfo />
      </div>
      <div className="lotteryCountdown">
        <Counter time={lotteryData.EndDate} />
      </div>

      <p style={{margin:0, width:250}} > {flag ? `Total Tickets Purchased : # ${myTickets.length}` : "Please connect your wallet"}</p>
      <p style={{textAlign:'right',margin:0}}>Prize Pool: {lotteryData.TotalPoolValue.toFixed(2)}</p>
    </>
  );}
}
