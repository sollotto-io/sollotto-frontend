import React, { useState, useContext } from 'react';
import '../../css/nav.css';
import Logo from './Logo';
import NavList from './NavList';
import WalletConnect from './WalletConnect';
import HamBtn from './HamBtn';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function Nav() {
  const [navActive, setNavActive] = useState(false);
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    if (globalData.selectedWallet !== null) {
      var bal = globalData.connection.getBalance(globalData.selectedWallet.publicKey);
      bal.then((t) => {
        setGlobalData({
          ...globalData,
          walletBalance: t,
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
          gridTemplateColumns: 'auto auto',
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
      </span>
      {globalData.walletConnectedFlag && <WalletDisconnect />}
      <HamBtn onMenuClick={menuClickHandler} />
    </nav>
  );
}
