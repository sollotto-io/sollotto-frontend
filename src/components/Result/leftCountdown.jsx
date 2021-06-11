import moment from "moment";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const LeftCountdown = ({ lotteryData, ticketData }) => {
  var EndDate = moment(lotteryData.EndDate);
  var Today = moment();

  var dif = EndDate.diff(Today);

  const { globalData } = useContext(GlobalContext);

  if (lotteryData.isActive === true) {
    return (
      <div id="winTicket" className="wrap gradientBg">
        <div className="win">
          <h4>Lottery In Progress</h4>
        </div>
      </div>
    );
  } else if (lotteryData.isActive === false) {
    if (lotteryData.WinnerWallet.length === 0) {
      if (dif < 0) {
        return (
          <div id="winTicket" className="wrap gradientBg">
            <div className="win">
              <h4>Lottery is closed</h4>
            </div>
          </div>
        );
      } else {
        return (
          <div id="winTicket" className="wrap gradientBg">
            <div className="win">
              <h4>Upcoming Lottery</h4>
            </div>
          </div>
        );
      }
    } else {
      lotteryData.WinnerWallet.forEach((val) => {
        if (val !== globalData.selectedWallet.publicKey.toBytes()) {
          return (
            <div id="winTicket" className="wrap gradientBg">
              <div className="win">
                <h4>You have no Winning Ticket</h4>
                <p>Better Luck Next Time</p>
              </div>
            </div>
          );
        } else if (val === globalData.selectedWallet.publicKey.toBytes()) {
          lotteryData.WinnerWallet.forEach((l) => {
            if (
              l ===
              Buffer.from(
                globalData.selectedWallet.publicKey.toBytes()
              ).toJSON().data
            ) {
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
            }
          });
        }
      });
    }
  }
};

export default LeftCountdown;
