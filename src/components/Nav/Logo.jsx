import React from "react";
import logoImg from "../../images/logos/Sollotto-Logo-Horizontal-Colored.png";

export default function Logo() {
	return (
		<div className='logoArea'>
			<img src={logoImg} alt='logo' className='logo' />
		</div>
	);
}
