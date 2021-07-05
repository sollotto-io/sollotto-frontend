import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import checkIfWinner from './utils/checkIfWinner';
import moment from 'moment';
import { sortTicketNumber } from '../utils/helpers';
import useReduxState from '../hooks/useReduxState';

const RDetail = ({ lotteryData }) => {
  const [globalData] = useReduxState((state) => state.globalData);

  const history = useHistory();
  const sendToResults = () => {
    history.push(`/results/`);
  };
  var EndDate = moment(lotteryData.EndDate);
  var Today = moment();

  var dif = EndDate.diff(Today);

  const WinningNumbers = sortTicketNumber(lotteryData.WinningNumbers);
  function userResult() {
    let result = null;

    if (lotteryData.WinnerWallet.length === 0) {
      if (lotteryData.isActive === true) {
        result = <p>TBD</p>;
      } else if (lotteryData.isActive === false) {
        if (dif > 0) {
          result = <p>TBD</p>;
        } else {
          result = <p>Lost</p>;
        }
      }
    } else {
      if (checkIfWinner(lotteryData, globalData.selectedWallet.publicKey.toBytes())) {
        result = <p>Won</p>;
      } else {
        result = <p>Lost</p>;
      }
    }
    return result;
  }
  if (lotteryData) {
    return (
      <section id="poolC">
        <div id="charityHeader">
          <div id="back-button">
            <IconButton onClick={sendToResults} style={{ color: 'white' }}>
              <ArrowBackIcon />
            </IconButton>
            <h4>Pick 6</h4>
          </div>
          <div>
            <h4>{moment(lotteryData.EndDate).format('LL')}</h4>
          </div>
        </div>
        <div id="other-details">
          <section>
            <p id="other-details-header-result">Prize Pool</p>
            <p>
              {lotteryData.TotalPoolValue === null ? 'TBD' : lotteryData.TotalPoolValue.toFixed(2)}
            </p>
          </section>
          <section>
            <p id="other-details-header-result">Total Winners</p>
            <p>{lotteryData.WinnerWallet.length}</p>
          </section>
          <section>
            <p id="other-details-header-result">Winning Numbers</p>
            <p>
              {WinningNumbers.length === 0 ? 'TBD' : WinningNumbers[0]}
              &nbsp; {WinningNumbers[1]}&nbsp; {WinningNumbers[2]}
              &nbsp; {WinningNumbers[3]}&nbsp; {WinningNumbers[4]}
              &nbsp; {WinningNumbers[5]}{' '}
            </p>
          </section>
          <section>
            <p id="other-details-header-result">Your Result</p>
            {userResult()}
          </section>
        </div>
        <section id="charity-list">
          {lotteryData.WinningCharity.length === 0 && new Date(lotteryData.EndDate) > Date.now() ? null : <WinningCharityResult lotteryData={lotteryData} />}
          
        </section>
      </section>
    );
  }
};

export default RDetail;

const WinningCharityResult = ({ lotteryData }) => {
  var arr = [];
  var totalVotes = 0;
  lotteryData.CharityVoteCount.forEach((c) => {
    totalVotes = totalVotes + c.votes;
    if (lotteryData.WinningCharity.find((t) => t.id === c.charityId.id)) {
      arr.push(c);
    }
  });

  return (
    <div>

{lotteryData.WinningCharity.length === 1 ? (
        <span
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '200px 200px 200px 200px',
            alignItems: 'center',
          }}
        >
          <p id="other-details-header-result">Winning Charity</p>
          <p id="other-details-header-result" style={{ textAlign: 'center' }}>Votes</p>
          <p id="other-details-header-result" style={{ textAlign: 'center' }}>%votes</p>
          <p id="other-details-header-result" style={{ textAlign: 'center' }}>SOL recieved</p>

        </span>
      ) : (
        <span style={{ display: 'grid', gridTemplateColumns: '200px 200px 200px 200px' }}>
          <p id="other-details-header-result">Winning Charities</p>
          <p id="other-details-header-result" style={{ textAlign: 'center' }}>Votes</p>
          <p id="other-details-header-result" style={{ textAlign: 'center' }}>%votes</p>
          <p id="other-details-header-result" style={{ textAlign: 'center' }}>SOL recieved</p>
        </span>
      )}

      <div id="winner-charity-list">
        {
          arr.map((c, i) => {
            return (
              <span
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '200px 200px 200px 200px',
                  alignItems: 'center',
                }}
              >
                {' '}
                <p key={i}>{c.charityId.charityName}</p>
                <p style={{ textAlign: 'center' }} key={i}>
                  {c.votes}
                </p>
                <p style={{ textAlign: 'center' }} key={i}>
                  {((c.votes / totalVotes) * 100).toFixed(2)}
                </p>
                <p style={{ textAlign: 'center' }} key={i}>
                  {((lotteryData.TotalPoolValue * 0.3)/arr.length).toFixed(2)}
                </p>
                
              </span>
            );
              })}
        
      </div>
    </div>
  );
};
