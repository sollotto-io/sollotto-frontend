import { useState, useCallback } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import useDidUpdateEffect from './useDidUpdateEffect';

export default function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [walletName, setWalletName] = useState('');

  const getPhantomProvider = () => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    return new Wallet('https://phantom.app/', process.env.REACT_APP_SOLANA_NETWORK);
  };
  useDidUpdateEffect(() => {
    console.log(walletName);
    if (walletName !== '') {
      console.log('alkfdfbdfhkdsb');
      let urlWallet;
      switch (walletName) {
        case 'Sollet':
          urlWallet = new Wallet('https://www.sollet.io', process.env.REACT_APP_SOLANA_NETWORK);
          console.log(urlWallet);
          break;
        case 'Phantom':
          if (window.solana && window.solana.isPhantom) {
            const phantomWallet = getPhantomProvider();
            if (!window.solana.isConnected) {
              phantomWallet.connect({ onlyIfTrusted: true });
              phantomWallet.on('connect', () => {
                urlWallet = phantomWallet;
              });
            }
            urlWallet = phantomWallet;
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
