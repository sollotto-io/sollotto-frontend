import React, { useState, useContext } from 'react';
import '../../css/nav.css';
import Logo from './Logo';
import NavList from './NavList';
import WalletConnect from './WalletConnect';
import HamBtn from './HamBtn';
import WalletDisconnect from './WalletDisconnect';
import { GlobalContext } from '../../context/GlobalContext';
export default function Nav() {
  const [navActive, setNavActive] = useState(false);
  const { globalData } = useContext(GlobalContext);

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
      <WalletConnect />
      {globalData.walletConnectedFlag && <WalletDisconnect />}
      <HamBtn onMenuClick={menuClickHandler} />
    </nav>
  );
}
