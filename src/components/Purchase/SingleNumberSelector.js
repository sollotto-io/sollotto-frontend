import React from "react";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import NumberInput from "./NumberInput";

export default function SingleNumberSelector(props) {
	function stepUpClickHandler(numPos) {
		document.querySelector(`#ticketNum_${numPos}`).stepUp();
	}
	function stepDownClickHandler(numPos) {
		document.querySelector(`#ticketNum_${numPos}`).stepDown();
	}
	return (
		<div
			className='singleNumberSelector'
			id={`singleNumberSelector_${props.numPos}`}
		>
			<KeyboardArrowUpOutlinedIcon
				id={`numStepUp_${props.numPos}`}
				onClick={() => stepUpClickHandler(props.numPos)}
				className='numberSelectorUp numberSelectorArrow greenGradientSVG'
			/>
			<NumberInput numPos={props.numPos} />
			<KeyboardArrowDownOutlinedIcon
				id={`numStepUp_${props.numPos}`}
				onClick={() => stepDownClickHandler(props.numPos)}
				className={
					props.numPos === 6
						? "numberSelectorDown numberSelectorArrow greenGradientSVG2"
						: "numberSelectorDown numberSelectorArrow purpleGradientSVG"
				}
			/>
		</div>
	);
}
