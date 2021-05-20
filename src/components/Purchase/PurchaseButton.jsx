import React, { useContext } from "react";
import WalletConnect from "../Nav/WalletConnect"
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";

export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData, setpurchaseData} = useContext(PurchaseContext);
  const { globalData} = useContext(GlobalContext);
  var tempArray = [];
  const getTicket = () => {
    Numbers.current.map((el, index) => {
      return (tempArray[index] = parseInt(el.value));
    });
    setpurchaseData({
      ...purchaseData,
      ticketNumbers: tempArray,
      Charity: selectedCharity.value
    });
  };
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
          onClick={getTicket}
          className="greenBtn globalBtn"
        >
          Get a Ticket
        </button>
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
