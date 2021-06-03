import React, { useContext,useMemo } from "react";
import WalletConnect from "../Nav/WalletConnect"
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";
// import {initLottery} from "./util/initLottery";
import {ticketPurchase} from "./util/ticketPurchase";
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
  const { purchaseData, setpurchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
  var tempArray = [];
  
  // Numbers.current.map((el, index) => {
	//   return (tempArray[index] = el.value);
	// });
	// if(tempArray === [] || selectedCharity === null ){
	//   console.log("empty");
	// }else{
	//   setpurchaseData({
	//     ...purchaseData,
	//     ticketNumbers: tempArray,
	//     Charity: selectedCharity.value,
	//   });

	// }
 
  const connectWalletBtn = () => {
    return (
      <WalletConnect />
    );
  };
  const getTicketBtn = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => ticketPurchase(globalData)}
          className="greenBtn globalBtn"
        >
          Get a Ticket
        </button>
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
