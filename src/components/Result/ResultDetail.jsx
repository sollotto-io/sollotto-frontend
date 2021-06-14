import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RDetail from './RDetails';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_LOTTERY_BY_ID } from '../../graphql/queries';
import Loader from '../common/Loader';
import LeftCountdown from '../Result/leftCountdown';
import { GlobalContext } from '../../context/GlobalContext';
import moment from 'moment';

const ResultDetail = () => {
  const { id } = useParams();
  const { globalData } = useContext(GlobalContext);

  if (globalData.selectedWallet === null) {
    console.log('empty');
    window.location.href = '/results';
  }

  // const {
  //   loading: ticketLoading,
  //   data: usertickets,
  //   refetch,
  // } = useQuery(FETCH_USER_TICKET, {
  //   variables: {
  //     walletID: Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data,
  //     LotteryId: parseInt(id),
  //   },
  // });
  const { loading: lotteryLoading, data: lottery, refetch } = useQuery(FETCH_LOTTERY_BY_ID, {
    variables: { Id: id },
  });

  const [tickets, setTickets] = useState(null)

  useEffect(() => {
    var myTickets = []
    if(!lotteryLoading){
      myTickets = lottery.getDrawingById.Tickets.filter((d)=>(d.walletID === Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data))
      setTickets(myTickets)
    }
    refetch()
  }, [lotteryLoading]); // eslint-disable-line react-hooks/exhaustive-deps



  if (lotteryLoading) {
    return <Loader />;
  } else {
    return (
      <div className="detailSection">
        <div className="topSection">
          <RDetail globalData={globalData} lotteryData={lottery.getDrawingById} />
          <LeftCountdown
            lotteryData={lottery.getDrawingById}
    
          />
        </div>
        <div className="bottomSectionResult gradientBg2">
          <div id="ticket-details">
            <div className="leftColumn">
              <h4>SolLotto Pick 6</h4>
              <h4>{moment(lottery.getDrawingById.EndDate).format('LL')}</h4>
            </div>
            <div className="rightColumn">
              <h4 style={{ marginBottom: '2rem' }}>Your Numbers and Charities</h4>
              {tickets.length === 0 ? (
                <p>No Tickets Bought</p>
              ) : (
                tickets.map((t, i) => {
                  var cha = globalData.charities.find((c) => c.id === t.charityId);
                  return (
                    <div className="entryRow" key={i}>
                      <p className="numColumn" key={i}>
                        {t.ticketArray[0]}&nbsp;&nbsp;{t.ticketArray[1]}&nbsp;&nbsp;
                        {t.ticketArray[2]}&nbsp;&nbsp;{t.ticketArray[3]}&nbsp;&nbsp;
                        {t.ticketArray[4]}&nbsp;&nbsp;{t.ticketArray[5]}&nbsp;&nbsp;
                      </p>{' '}
                      <p className="chaColumn">{cha.charityName}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ResultDetail;
