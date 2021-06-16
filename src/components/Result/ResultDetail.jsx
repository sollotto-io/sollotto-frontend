import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import RDetail from './RDetails';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_LOTTERY_BY_ID } from '../../graphql/queries';
import Loader from '../common/Loader';
import LeftCountdown from '../Result/leftCountdown';
import { GlobalContext } from '../../context/GlobalContext';
import moment from 'moment';
import _ from "lodash"

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
  const { loading, data:lottery, refetch } = useQuery(FETCH_LOTTERY_BY_ID, {
    variables: { id: id },
  });


  useEffect(() =>   
    refetch()
  , []); // eslint-disable-line react-hooks/exhaustive-deps



  if (loading) {
    return <Loader />;
  } else {
    var userTickets = []
    lottery.getDrawingById.Tickets.map((t)=>{

      
     var flag =  _.isEqual(t.walletID,Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data)
    
     if(flag){
       userTickets.push({array: t.ticketArray, charity: t.charityId.charityName})
     }
     return null
    })
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
              {userTickets.length === 0 ? (
                <p>No Tickets Bought</p>
              ) : (
                userTickets.map((t, i) => {
                  return (
                    <div className="entryRow" key={i}>
                      <p className="numColumn" key={i}>
                        {t.array[0]}&nbsp;&nbsp;{t.array[1]}&nbsp;&nbsp;
                        {t.array[2]}&nbsp;&nbsp;{t.array[3]}&nbsp;&nbsp;
                        {t.array[4]}&nbsp;&nbsp;{t.array[5]}&nbsp;&nbsp;
                      </p>{' '}
                      <p className="chaColumn">{t.charity}</p>
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
