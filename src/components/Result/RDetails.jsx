import React, { useContext } from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import checkIfWinner from './utils/checkIfWinner';
import { GlobalContext } from "../../context/GlobalContext";
import moment from 'moment';

const RDetail = (props) => {
  const { globalData } = useContext(GlobalContext);

  const history = useHistory();
  const sendToResults = () => {
    history.push(`/results/`);
  };
  var EndDate = moment(props.lotteryData.EndDate);
  var Today = moment();

  var dif = EndDate.diff(Today);
  function userResult() {
    let result = null;

    if (props.lotteryData.WinnerWallet.length === 0) {
      if (props.lotteryData.isActive === true) {
        result = <p>TBD</p>;
      } else if (props.lotteryData.isActive === false) {
        if (dif > 0) {
          result = <p>TBD</p>;
        } else {
          result = <p>Lost</p>;
        }
      }
    } else {
      if (checkIfWinner(props.lotteryData, globalData.selectedWallet.publicKey.toBytes())) {
        result = <p>Won</p>;
      } else {
        result = <p>Lost</p>;
      }
    }
    return result;
  }
  if (props.lotteryData) {
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
            <h4>{moment(props.lotteryData.EndDate).format('LL')}</h4>
          </div>
        </div>
        <div id="other-details">
          <section>
            <p>Prize Pool</p>
            <p>{props.lotteryData.TotalPoolValue.toFixed(2)}</p>
          </section>
          <section>
            <p>Total Winners</p>
            <p>{props.lotteryData.WinnerWallet.length}</p>
          </section>
          <section>
            <p>Winning Numbers</p>
            <p>
              {props.lotteryData.WinningNumbers.length === 0
                ? 'TBD'
                : props.lotteryData.WinningNumbers[0]}
              &nbsp; {props.lotteryData.WinningNumbers[1]}&nbsp;{' '}
              {props.lotteryData.WinningNumbers[2]}
              &nbsp; {props.lotteryData.WinningNumbers[3]}&nbsp;{' '}
              {props.lotteryData.WinningNumbers[4]}
              &nbsp; {props.lotteryData.WinningNumbers[5]}{' '}
            </p>
          </section>
          <section>
            <p>Your Result</p>
            {userResult()}
          </section>
          <section>
            <p>
              {props.lotteryData.WinningCharity.length === 1
                ? 'Winning Charity'
                : 'Winning Charities'}
            </p>
            {props.lotteryData.WinningCharity.length === 0
              ? 'TBD'
              : props.lotteryData.WinningCharity.map((c, i) => {
                  var cha = globalData.charities.find((t) => t.ID === c);
                  return <p key={i}>{cha.charityName}</p>;
                })}
          </section>
        </div>
      </section>
    );
  }
};

export default RDetail;
