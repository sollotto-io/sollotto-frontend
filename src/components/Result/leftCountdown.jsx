import moment from 'moment';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import checkIfWinner from './utils/checkIfWinner';
const LeftCountdown = ({ lotteryData }) => {
  var EndDate = moment(lotteryData.EndDate);
  var Today = moment();

  var dif = EndDate.diff(Today);

  const { globalData } = useContext(GlobalContext);
  if (lotteryData.WinnerWallet.length === 0) {
    if (lotteryData.isActive === true) {
      return (
        <div id="winTicket" className="wrap gradientBg">
          <div className="win">
            <h4>Lottery In Progress</h4>
          </div>
        </div>
      );
    } else if (lotteryData.isActive === false) {
      if (dif > 0) {
        return (
          <div id="winTicket" className="wrap gradientBg">
            <div className="win">
              <h4>Upcoming Lottery</h4>
            </div>
          </div>
        );
      } else {
        return (
          <div id="winTicket" className="wrap gradientBg">
            <div className="win">
              <h4>You have no Winning Ticket</h4>
              <p>Better Luck Next Time</p>
            </div>
          </div>
        );
      }
    }
  } else {
    if (checkIfWinner(lotteryData, globalData.selectedWallet.publicKey.toBytes())) {
      return (
        <div className="wrap gradientBg ">
          <div className="win">
            <h4>You Have Won</h4>
            <p>
              {lotteryData.WinningNumbers[0]}&nbsp;
              {lotteryData.WinningNumbers[1]}&nbsp;
              {lotteryData.WinningNumbers[2]}&nbsp;
              {lotteryData.WinningNumbers[3]}&nbsp;
              {lotteryData.WinningNumbers[4]}&nbsp;
              {lotteryData.WinningNumbers[5]}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div id="winTicket" className="wrap gradientBg">
          <div className="win">
            <h4>You have no Winning Ticket</h4>
            <p>Better Luck Next Time</p>
          </div>
        </div>
      );
    }
  }
};

export default LeftCountdown;
