import React, { useContext } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import checkIfWinner from './utils/checkIfWinner';
import { GlobalContext } from '../../context/GlobalContext';
import moment from 'moment';
import { sortTicketNumber } from '../utils/helpers';

const RDetail = ({ lotteryData }) => {
  const { globalData } = useContext(GlobalContext);

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
            <p>Prize Pool</p>
            <p>
              {lotteryData.TotalPoolValue === null ? 'TBD' : lotteryData.TotalPoolValue.toFixed(2)}
            </p>
          </section>
          <section>
            <p>Total Winners</p>
            <p>{lotteryData.WinnerWallet.length}</p>
          </section>
          <section>
            <p>Winning Numbers</p>
            <p>
              {WinningNumbers.length === 0 ? 'TBD' : WinningNumbers[0]}
              &nbsp; {WinningNumbers[1]}&nbsp; {WinningNumbers[2]}
              &nbsp; {WinningNumbers[3]}&nbsp; {WinningNumbers[4]}
              &nbsp; {WinningNumbers[5]}{' '}
            </p>
          </section>
          <section>
            <p>Your Result</p>
            {userResult()}
          </section>
          <section id="charity-list">
            <p>
              {lotteryData.WinningCharity.length === 1 ? 'Winning Charity' : 'Winning Charities'}
            </p>
            {lotteryData.WinningCharity.length === 0
              ? 'TBD'
              : lotteryData.WinningCharity.map((c, i) => {
                  return <p key={i}>{c.charityName}</p>;
                })}
          </section>
        </div>
      </section>
    );
  }
};

export default RDetail;
