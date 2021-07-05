import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import RDetail from './RDetails';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_LOTTERY_BY_ID } from '../../graphql/queries';
import Loader from '../common/Loader';
import LeftCountdown from '../Result/leftCountdown';
import moment from 'moment';
import _ from 'lodash';
import useReduxState from '../hooks/useReduxState';

const ResultDetail = () => {
  const { id } = useParams();
  const [globalData] = useReduxState((state) => state.globalData);

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
  const {
    loading,
    data: lottery,
    refetch,
  } = useQuery(FETCH_LOTTERY_BY_ID, {
    variables: { id: id },
  });

  useEffect(() => refetch(), []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loader />;
  } else {
    var userTickets = [];
    lottery.getDrawingById.Tickets.forEach((t) => {
      var flag = _.isEqual(
        t.walletID,
        Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data,
      );

      if (flag) {
        userTickets.push({ array: t.ticketArray, charity: t.charityId.charityName, TransactionId:t.TransactionId });
      }
    });
    return (
      <div className="detailSection">
        <div className="topSection">
          <RDetail globalData={globalData} lotteryData={lottery.getDrawingById} />
          <LeftCountdown lotteryData={lottery.getDrawingById} />
        </div>
        <div className="bottomSectionResult gradientBg2">
          <div id="ticket-details">
            <div className="leftColumn">
              <h4>SolLotto Pick 6</h4>
              <h4>{moment(lottery.getDrawingById.EndDate).format('LL')}</h4>
            </div>
            <div className="rightColumn">
              <h4 style={{ marginBottom: '0px' }}>Your Numbers and Charities</h4>
              <p style={{ marginBottom: '20px' }}>
                (Your choices have been reordered from smallest to largest for the first five
                numbers)
              </p>
              {userTickets.length === 0 ? (
                <p>No Tickets Bought</p>
              ) : (
                userTickets.map((t, i) => {
                  console.log(t)
                  return (
                    <div className="entryRow" key={i}>
                      <p className="numColumn" key={i}>
                        {t.array[0]}&nbsp;&nbsp;{t.array[1]}&nbsp;&nbsp;
                        {t.array[2]}&nbsp;&nbsp;{t.array[3]}&nbsp;&nbsp;
                        {t.array[4]}&nbsp;&nbsp;{t.array[5]}&nbsp;&nbsp;
                      </p>{' '}
                      <p className="chaColumn">{t.charity}</p>
                      <a className="chaColumn"
                  style={{ textDecoration: 'underline' }}
                  href={`https://solscan.io/tx/${t.TransactionId}?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                >View Your Transacton</a>
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
