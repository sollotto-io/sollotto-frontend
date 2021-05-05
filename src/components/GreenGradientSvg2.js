import React from "react";

export default function GreenGradientSvg2() {
	return (
		<svg
			style={{ width: "0", height: "0", position: "absolute" }}
			aria-hidden='true'
			focusable='false'
		>
			<linearGradient id='greenGradient2' x1='0%' y1='10%' x2='100%' y2='90%'>
				<stop offset='30%' stopColor='#349e98' stopOpacity='1' />
				<stop offset='90%' stopColor='#3c918c' stopOpacity='1' />
			</linearGradient>
		</svg>
	);
}
