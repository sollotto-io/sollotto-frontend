import React, { useContext } from 'react';
import WalletConnect from '../Nav/WalletConnect';
import { GlobalContext } from '../../context/GlobalContext';



export default function PurchaseButton({ handleSubmit}) {
  const { globalData } = useContext(GlobalContext);



  const connectWalletBtn = () => <WalletConnect />;


  const getTicketBtn = () => (
      <>
        <button type="button" onClick={handleSubmit} className="greenBtn globalBtn">
          Get a Ticket
        </button>
      </>
    );
  return <>{globalData.walletConnectedFlag === true ? getTicketBtn() : connectWalletBtn()}</>;
}
