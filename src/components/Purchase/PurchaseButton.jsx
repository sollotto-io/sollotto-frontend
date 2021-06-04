import React, { useContext,useMemo } from "react";
import WalletConnect from "../Nav/WalletConnect"
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";
// import {initLottery} from "./util/initLottery";
import {ticketPurchase} from "./util/ticketPurchase";
import {lotteryDraw} from "./util/lotteryDraw";
/**
 * Borsh schema definition for greeting accounts
 */


/**
 * The expected size of each greeting account.
 */
// const LOTTERY_DATA_SIZE = borsh.serialize(
//   LotteryDataSchema,
//   new LotteryDataAccount(),
// ).length;


export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData} = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
 
  const connectWalletBtn = () => {
    return (
      <WalletConnect />
    );
  };
  const getTicket = () =>{
    let purchaseDataArr = {charityId:purchaseData.selectedCharity,userWalletPK:globalData.selectedWallet.publicKey.toBytes(),ticketNumArr:purchaseData.ticketNumberArr};
    console.log(purchaseDataArr);
    ticketPurchase(globalData,purchaseDataArr);
  }
  const getTicketBtn = () => {
    return (
      <>
        <button
          type="button"
          onClick={getTicket}
          className="greenBtn globalBtn"
        >
          Get a Ticket
        </button>
        <button type="button" onClick={() => lotteryDraw()} className="greenBtn globalBtn">Draw Lottery</button>
        {/* <button type="button" onClick={() => initLottery(globalData)} className="greenBtn globalBtn">Init Lottery</button> */}
        {/* <ConnectWalletModal open={open} handleClose={handleClose} /> */}
      </>
    );
  };
  return (
    <>
      {globalData.walletConnectedFlag === true
        ? getTicketBtn()
        : connectWalletBtn()}
    </>
  );
}
