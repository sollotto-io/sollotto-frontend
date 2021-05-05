import React, { useState } from "react";
import "../../css/nav.css";
import Logo from "./Logo";
import NavList from "./NavList";
import WalletConnect from "./WalletConnect";
import HamBtn from "./HamBtn";
export default function Nav() {
	const [navActive, setNavActive] = useState(false);

	var menuClickHandler = function () {
		document.querySelector(".hamBtn").classList.toggle("change");
		setNavActive(!navActive);
	};

	return (
		<nav>
			<Logo />
			<NavList navActive={navActive} />
			<WalletConnect />
			<HamBtn onMenuClick={menuClickHandler} />
		</nav>
	);
}
