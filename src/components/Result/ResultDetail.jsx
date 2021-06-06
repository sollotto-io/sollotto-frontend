import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import RDetail from "./RDetails";
import { useQuery } from "@apollo/client";
import { FETCH_LOTTERY_BY_ID, FETCH_USER_TICKET } from "../../graphql/queries";
import Loader from "../common/Loader";
import LeftCountdown from "../Result/leftCountdown";
import { GlobalContext } from "../../context/GlobalContext";
import moment from "moment";


const ResultDetail = () => {
  
  const { id } = useParams();
  const { globalData } = useContext(GlobalContext);
  const history = useHistory();

  if(globalData.selectedWallet === null){
    console.log("empty")
  history.push("/results")
  }
  

  const { loading: ticketLoading, data: usertickets } = useQuery(
    FETCH_USER_TICKET,
    {
      variables: {
        walletID: Buffer.from(
          globalData.selectedWallet.publicKey.toBytes()
        ).toJSON().data,
        LotteryId: parseInt(id),
      },
    }
  );

  const { loading: lotteryLoading, data: lottery } = useQuery(
    FETCH_LOTTERY_BY_ID,
    { variables: { Id: parseInt(id) } }
  );

  if (lotteryLoading || ticketLoading) {
    return <Loader />;
  } else {
    console.log(usertickets.getUserTickets)
    return (
      <div className="detailSection">
        <div className="topSection">
          <RDetail globalData = {globalData} data={lottery.getLotteryById} />
          <LeftCountdown
            lotteryData={lottery.getLotteryById}
            ticketData={usertickets.getUserTickets}
          />
        </div>
        <div className="bottomSectionResult gradientBg2">
          <div id="ticket-details">
            <h4>Solana Pick 6</h4>
            <h4>{moment(lottery.getLotteryById.EndDate).format('LL')}</h4>
            <br></br>
            <p>Your Number</p>
            {usertickets.getUserTickets.map((t,i)=>{
              // console.log(t.ticketArray[0])
              return <p key={i}>{t.ticketArray[0]}&nbsp;&nbsp;{t.ticketArray[1]}&nbsp;&nbsp;{t.ticketArray[2]}&nbsp;&nbsp;{t.ticketArray[3]}&nbsp;&nbsp;{t.ticketArray[4]}&nbsp;&nbsp;{t.ticketArray[5]}&nbsp;&nbsp;</p>
              
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default ResultDetail;
