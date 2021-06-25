import React, {  useState } from 'react';
import '../../css/nav.css';
import Logo from './Logo';
import NavList from './NavList';
import WalletConnect from './WalletConnect';
import HamBtn from './HamBtn';
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
      <span style={{display:"grid", gridTemplateColumns:"auto auto", columnGap:10}}>
      <WalletConnect />
      </span>
      <HamBtn onMenuClick={menuClickHandler} />
    </nav>
  );
}
