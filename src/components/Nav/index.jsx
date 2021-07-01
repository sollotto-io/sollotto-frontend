import React, { useState, useEffect } from 'react';
import '../../css/nav.css';
import Logo from './Logo';
import NavList from './NavList';
import WalletConnect from './WalletConnect';
import HamBtn from './HamBtn';
import WalletDisconnect from './WalletDisconnect';
import useReduxState from '../hooks/useReduxState';

export default function Nav() {
  const [navActive, setNavActive] = useState(false);
  const [globalData, setGlobalData] = useReduxState((state) => state.globalData);

  useEffect(() => {
    if (globalData.selectedWallet !== null) {
      var bal = globalData.connection.getBalance(globalData.selectedWallet.publicKey);
      bal.then((t) => {
        setGlobalData({
          type: 'SET_GLOBAL_DATA',
          arg: {
            walletBalance: t,
          },
        });
      });
    }
  }, [globalData.walletConnectedFlag]); // eslint-disable-line react-hooks/exhaustive-deps
  let menuClickHandler = () => {
    document.querySelector('.hamBtn').classList.toggle('change');
    setNavActive(!navActive);
  };
  let navLinkClickHandler = () => {
    document.querySelector('.hamBtn').classList.toggle('change');
    setNavActive(!navActive);
  };
  return (
    <nav>
      <Logo />
      <NavList navActive={navActive} onNavLinkClick={navLinkClickHandler} />
      <span
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          columnGap: 10,
          alignItems: 'center',
        }}
      >
        <p>
          {globalData.walletConnectedFlag && globalData.walletBalance !== null
            ? `${(globalData.walletBalance / 1000000000).toFixed(2)} SOL`
            : ''}
        </p>
        <WalletConnect />
      {globalData.walletConnectedFlag && <WalletDisconnect />}
      <HamBtn onMenuClick={menuClickHandler} />
      </span>
    </nav>
  );
}
