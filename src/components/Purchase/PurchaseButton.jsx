import React from 'react';
import WalletConnect from '../Nav/WalletConnect';
import { useSelector } from 'react-redux';
import useReduxState from '../hooks/useReduxState';

export default function PurchaseButton({ handleSubmit }) {
  const [globalData] = useReduxState((state) => state.globalData);

  const { selectedCharity } = useSelector((state) => state.purchaseData);

  const connectWalletBtn = () => <WalletConnect />;

  const getTicketBtn = () => (
    <>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={selectedCharity == null}
        className="greenBtn globalBtn"
      >
        Get a Ticket
      </button>
    </>
  );
  return <>{globalData.walletConnectedFlag === true ? getTicketBtn() : connectWalletBtn()}</>;
}
