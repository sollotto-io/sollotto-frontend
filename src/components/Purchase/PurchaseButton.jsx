import React, { useContext } from 'react';
import WalletConnect from '../Nav/WalletConnect';
import { GlobalContext } from '../../context/GlobalContext';
import { PurchaseContext } from '../../context/PurchaseContext';

export default function PurchaseButton({ handleSubmit }) {
  const { globalData } = useContext(GlobalContext);
  const { purchaseData } = useContext(PurchaseContext);

  const connectWalletBtn = () => <WalletConnect />;

  const getTicketBtn = () => (
    <>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={purchaseData.selectedCharity == null}
        className="greenBtn globalBtn"
      >
        Get a Ticket
      </button>
    </>
  );
  return <>{globalData.walletConnectedFlag === true ? getTicketBtn() : connectWalletBtn()}</>;
}
