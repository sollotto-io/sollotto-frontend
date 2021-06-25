import { useState, useEffect, useCallback } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';

export default function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [walletName, setWalletName] = useState('');
  useEffect(() => {
    if (walletName !== '') {
      let urlWallet;
      switch (walletName) {
        case 'Sollet':
      urlWallet = new Wallet('https://www.sollet.io', process.env.REACT_APP_SOLANA_NETWORK);
          break;
        case 'Phantom':
          if (window.solana && window.solana.isPhantom) {
            if (!window.solana.isConnected) {
              window.solana.connect();
              console.log(window.solana);
            }
            urlWallet = window.solana;
          } else {
            urlWallet = new Wallet('https://phantom.app/', process.env.REACT_APP_SOLANA_NETWORK);
          }

          break;
        default:
          break;
      }

      setWallet(urlWallet);
    }
  }, [walletName]);

  const chooseWallet = useCallback((wname) => {
    setWalletName(wname);
  }, []);

  return [wallet, chooseWallet];
}
