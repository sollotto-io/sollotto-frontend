import React from "react";
export default function NumberInput(props) {
	return (
		<div
			className={
				props.ticketPos === 5
					? "gradientBg3 gradientBorder numberInputWrapper"
					: "gradientBg2 gradientBorder numberInputWrapper"
			}
		>
			<input
				type='number'
				id={`ticketNumber${props.ticketPos}`}
				className='numberSelectorInput'
				name={`ticketNumber${props.ticketPos}`}
				max={props.ticketPos >= 0 && props.ticketPos <= 4 ? 69 : 26}
				min='1'
				placeholder='1'
        onChange={props.validateNum}
			/>
		</div>
	);
}
