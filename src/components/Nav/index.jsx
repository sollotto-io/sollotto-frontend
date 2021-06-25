import React, { useContext, useState } from 'react';
import '../../css/nav.css';
import Logo from './Logo';
import NavList from './NavList';
import WalletConnect from './WalletConnect';
import HamBtn from './HamBtn';
import {GlobalContext} from "../../context/GlobalContext"
export default function Nav() {
  const [navActive, setNavActive] = useState(false);
  const {globalData} = useContext(GlobalContext)
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
      <p>{globalData.walletConnectedFlag === false ? "":globalData.connection.getBalance(globalData.selectedWallet.publicKey)}</p>
      <WalletConnect />
      </span>
      <HamBtn onMenuClick={menuClickHandler} />
    </nav>
  );
}
