import React, { useState } from "react";
import "../../css/nav.css";
import logoImg from "../../images/logos/Sollotto-Logo-Horizontal-Colored.png";
import NavItem from "./NavItem";

export default function Nav() {
	const [navActive, setNavActive] = useState(false);

	var navOpen = function () {
		document.querySelector(".hamBtn").classList.toggle("change");
		setNavActive(!navActive);
	};

	return (
		<nav>
			<div className='logoArea'>
				<img src={logoImg} alt='logo' className='logo' />
			</div>
			<div
				className='navList'
				style={navActive === true ? { display: "grid" } : null}
			>
				<NavItem url_link='purchase' />
				<NavItem url_link='charities' />
				<NavItem url_link='suggest' />
				<NavItem url_link='results' />
			</div>
			<button className='walletConnect greenBtn'>Connect</button>
			<div onClick={navOpen} className='hamBtn'>
				<div className='bar1'></div>
				<div className='bar2'></div>
				<div className='bar3'></div>
			</div>
		</nav>
	);
}
