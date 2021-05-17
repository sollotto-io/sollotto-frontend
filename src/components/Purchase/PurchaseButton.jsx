import React, { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

export default function PurchaseButton({ Numbers }) {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  console.log(globalData);
  var tempArray = [];
  const getTicket = () => {
    Numbers.current.map((el, index) => {
      return (tempArray[index] = parseInt(el.value));
    });
    setGlobalData({
      ...globalData,
      ticketNumbers: tempArray,
    });
  };
  // const handleClickOpen = ()=>{
  // 	setOpen(true);

  // }
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
