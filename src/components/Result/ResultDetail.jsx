import React, { useContext } from "react";
import { useParams } from "react-router";
import RDetail from "./RDetails";
import {GlobalContext} from "../../context/GlobalContext"
import { useQuery } from "@apollo/client";
import { FETCH_LOTTERY_BY_ID, FETCH_USER_TICKET } from "../../graphql/queries";
import Loader from "../common/Loader";

const ResultDetail = () => {
  const {globalData} = useContext(GlobalContext)
  console.log(Buffer.from(
    globalData.selectedWallet.publicKey.toBytes()
  ).toJSON().data)
  const { id } = useParams();
  console.log(id)
  const {loading:lotteryLoading, data:lottery} = useQuery(FETCH_LOTTERY_BY_ID,{variables:{Id: parseInt(id) }})
  const {loading: ticketLoading, data:usertickets} = useQuery(FETCH_USER_TICKET,{variables:{walletID: [1,2,3],LotteryId: parseInt(id) }})
 
  
  if(lotteryLoading && ticketLoading ){
    return <Loader/>
  }
  else{
    console.log(lottery, usertickets)
  }
  return (
    <div className="detailSection">
      
      <div className="topSection">
        <RDetail data= {lottery.getLotteryById} />
        <div className="wrap gradientBg ">
          <div className="win">
            <h4>No Winning Ticket</h4>
            <p>Better Luck Next Time</p>
          </div>
        </div>
      </div>
      <div className="bottomSectionResult gradientBg2">
        <div id="ticket-details">
          <h4>Solana {id}</h4>
          <h4>Wednesday 26th 2021</h4>
          <br></br>
          <p>Your Number</p>
          <p>03  10  11  05  55  01</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
