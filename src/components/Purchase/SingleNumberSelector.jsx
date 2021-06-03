import React,{useContext} from "react";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import NumberInput from "./NumberInput";
import {PurchaseContext} from "../../context/PurchaseContext";

export default function SingleNumberSelector(props) {
	const { purchaseData,setPurchaseData } = useContext(PurchaseContext);
	const ticketNumChangeHandler = (value) =>{
		const tempNumArr= purchaseData.ticketNumberArr;
		tempNumArr[props.numPos] = value;
		setPurchaseData({...purchaseData, ticketNumberArr:tempNumArr});
	}
	function stepUpClickHandler(numPos) {
		document.querySelector(`#ticketNum_${numPos}`).stepUp();
		ticketNumChangeHandler(document.querySelector(`#ticketNum_${numPos}`).value);

	}
	function stepDownClickHandler(numPos) {
		document.querySelector(`#ticketNum_${numPos}`).stepDown();
		ticketNumChangeHandler(document.querySelector(`#ticketNum_${numPos}`).value);
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
			<NumberInput ticketPos ={props.ticketPos} numPos={props.numPos} ticketNumChangeHandler={ticketNumChangeHandler} />
			<KeyboardArrowDownOutlinedIcon
				id={`numStepUp_${props.numPos}`}
				onClick={() => stepDownClickHandler(props.numPos)}
				className={
					props.numPos === 5
						? "numberSelectorDown numberSelectorArrow greenGradientSVG2"
						: "numberSelectorDown numberSelectorArrow purpleGradientSVG"
				}
			/>
		</div>
	);
}