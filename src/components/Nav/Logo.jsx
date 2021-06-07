import React from "react";
import logoImg from "../../images/logos/SolLotto-logo-horizontal.png";

export default function Logo() {
	return (
		<div className='logoArea'>
			<a href='/'><img src={logoImg} alt='logo' className='logo' /></a>
		</div>
	);
}
