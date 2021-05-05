import React from "react";

export default function NumberInput(props) {
	return (
		<div
			className={
				props.numPos === 6
					? "gradientBg3 gradientBorder numberInputWrapper"
					: "gradientBg2 gradientBorder numberInputWrapper"
			}
		>
			<input
				type='number'
				id={`ticketNum_${props.numPos}`}
				className='numberSelectorInput'
				name={`ticketNum_${props.numPos}`}
				max={props.numPos >= 1 && props.numPos <= 5 ? 69 : 26}
				min='1'
				placeholder='1'
			/>
		</div>
	);
}
