import React,{useRef} from "react";

export default function NumberInput(props) {
	const ticketNumRef = useRef(null);
	
	

	return (
		<div
			className={
				props.numPos === 5
					? "gradientBg3 gradientBorder numberInputWrapper"
					: "gradientBg2 gradientBorder numberInputWrapper"
			}
		>
			<input
				ref={ticketNumRef}
				type='number'
				id={`ticketNum_${props.numPos}`}
				className='numberSelectorInput'
				name={`ticketNum_${props.numPos}`}
				max={props.numPos >= 1 && props.numPos <= 4 ? 69 : 26}
				min='1'
				placeholder='1'
				onChange={() => props.ticketNumChangeHandler(ticketNumRef.current.value)}
			/>
		</div>
	);
}
