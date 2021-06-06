import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const LeftCountdown = ({ lotteryData, ticketData }) => {
  const { globalData } = useContext(GlobalContext);


  if (lotteryData.WinnerWallet.length === 0) {
    return (
      <div className="wrap gradientBg ">
        <div className="win">
          <h4>No Winning Ticket</h4>
          <p>Better Luck Next Time</p>
        </div>
      </div>
    );
  } 
  else {
    lotteryData.WinnerWallet.map((l) => {
      if (
        l ===
        Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data
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
};

export default LeftCountdown