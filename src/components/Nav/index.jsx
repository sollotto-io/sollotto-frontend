import React, { useState } from 'react';
import '../../css/nav.css';
import Logo from './Logo';
import NavList from './NavList';
import WalletConnect from './WalletConnect';
import HamBtn from './HamBtn';
/* import WalletDisconnect from './WalletDisconnect'; */
export default function Nav() {
  const [navActive, setNavActive] = useState(false);

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
      {/* <WalletDisconnect /> */}
      <HamBtn onMenuClick={menuClickHandler} />
    </nav>
  );
}
