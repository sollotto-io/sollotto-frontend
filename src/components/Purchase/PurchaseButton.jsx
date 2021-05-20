import React, { useContext } from "react";

import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";

export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData, setpurchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
  var tempArray = [];
  const getTicket = () => {
    Numbers.current.map((el, index) => {
      return (tempArray[index] = el.value);
    });
    if(tempArray === [] || selectedCharity === null ){
      console.log("empty");
    }else{
      setpurchaseData({
        ...purchaseData,
        ticketNumbers: tempArray,
        Charity: selectedCharity.value,
      });

    }

   
  };
  const connectWalletBtn = () => {
    return (
      <>
        <p style={{ textAlign: "center" }}>please connect your wallet</p>
      </>
      // <WalletConnect/>

      // <>
      // 	<button
      // 		type='button'
      // 		onClick={handleClickOpen}
      // 		className='greenBtn globalBtn'
      // 	>
      // 		Connect Wallet
      // 	</button>
      // 	<ConnectWalletModal open={open} handleClose={handleClose} />
      // </>
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
      {globalData.connectedWalletId !== null
        ? getTicketBtn()
        : connectWalletBtn()}
    </>
  );
}
