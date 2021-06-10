import React,{useContext} from "react";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import NumberInput from "./NumberInput";
import {PurchaseContext} from "../../context/PurchaseContext";

export default function SingleNumberSelector(props) {
	const { purchaseData,setPurchaseData } = useContext(PurchaseContext);
	const ticketNumChangeHandler = (value) =>{
		const tempNumArr= purchaseData.ticketNumberArr;
		tempNumArr[props.numPos] = parseInt(value);
		setPurchaseData({...purchaseData, ticketNumberArr:tempNumArr});
	}
	function stepUpClickHandler(numPos) {
		try{

			if(numPos === 5){
				if(Number(document.querySelector(`#ticketNum_${numPos}`).value) === 26 || document.querySelector(`#ticketNum_${numPos}`).value.length === 0){
						document.querySelector(`#ticketNum_${numPos}`).value = 1;
				}
				else{
					document.querySelector(`#ticketNum_${numPos}`).stepUp();
				}
			}
			else{
				if(Number(document.querySelector(`#ticketNum_${numPos}`).value) === 69 || document.querySelector(`#ticketNum_${numPos}`).value.length === 0){
					document.querySelector(`#ticketNum_${numPos}`).value = 1;
				}
				else{
					document.querySelector(`#ticketNum_${numPos}`).stepUp();
				}
			}
			
			ticketNumChangeHandler(document.querySelector(`#ticketNum_${numPos}`).value);
		}catch(ex){
			var step=Number(document.querySelector(`#ticketNum_${numPos}`).step);

			if(numPos === 5){
				if(Number(document.querySelector(`#ticketNum_${numPos}`).value) === 26 || document.querySelector(`#ticketNum_${numPos}`).value.length === 0){
						document.querySelector(`#ticketNum_${numPos}`).value = 1;
				}
				else{
					document.querySelector(`#ticketNum_${numPos}`).value = Number(document.querySelector(`#ticketNum_${numPos}`).value) + step;
				}
			}
			else{
				if(Number(document.querySelector(`#ticketNum_${numPos}`).value) === 69 || document.querySelector(`#ticketNum_${numPos}`).value.length === 0){
					document.querySelector(`#ticketNum_${numPos}`).value = 1;
				}
				else{
					document.querySelector(`#ticketNum_${numPos}`).value = Number(document.querySelector(`#ticketNum_${numPos}`).value) + step;
				}
			}
			ticketNumChangeHandler(document.querySelector(`#ticketNum_${numPos}`).value);
		}	
		
	}
	function stepDownClickHandler(numPos) {
		try{
				if(Number(document.querySelector(`#ticketNum_${numPos}`).value) === 1 || document.querySelector(`#ticketNum_${numPos}`).value.length === 0){
					if(numPos === 5){
						document.querySelector(`#ticketNum_${numPos}`).value = 26;
					}
					else{
						document.querySelector(`#ticketNum_${numPos}`).value = 69;
					}
				}
				else{
					document.querySelector(`#ticketNum_${numPos}`).stepDown();
				}
				ticketNumChangeHandler(document.querySelector(`#ticketNum_${numPos}`).value);

			}catch(ex){
				let step=Number(document.querySelector(`#ticketNum_${numPos}`).step);
				if(Number(document.querySelector(`#ticketNum_${numPos}`).value) === 1 || document.querySelector(`#ticketNum_${numPos}`).value.length === 0){
					if(numPos === 5){
						document.querySelector(`#ticketNum_${numPos}`).value = 26;
					}
					else{
						document.querySelector(`#ticketNum_${numPos}`).value = 69;
					}
				}
				else{
					document.querySelector(`#ticketNum_${numPos}`).value = Number(document.querySelector(`#ticketNum_${numPos}`).value) - step;
				}
				ticketNumChangeHandler(document.querySelector(`#ticketNum_${numPos}`).value);
			}	
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