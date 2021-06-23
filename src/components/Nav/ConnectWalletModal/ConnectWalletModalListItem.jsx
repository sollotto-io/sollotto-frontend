import React, { useContext } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { GlobalContext } from '../../../context/GlobalContext';

export default function ConnectWalletModalListItem(props) {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const selectWallet = () => {
    let urlWallet = null;

    switch (props.name) {
      case 'Sollet':
        urlWallet = new Wallet('https://www.sollet.io', process.env.REACT_APP_SOLANA_NETWORK);
        break;
      case 'Phantom':
        if (window.solana && window.solana.isPhantom) {
          if (!window.solana.isConnected) {
            window.solana.connect();
          }
          urlWallet = window.solana;
        } else {
          urlWallet = new Wallet('https://phantom.app/', process.env.REACT_APP_SOLANA_NETWORK);
        }

        break;
      default:
        break;
    }

    setGlobalData({ ...globalData, selectedWallet: urlWallet });
  };

  return (
    <li onClick={selectWallet} className="modalListItem greenBtn">
      <span className="modalListItemTitle">{props.name}</span>
    </li>
  );
}
