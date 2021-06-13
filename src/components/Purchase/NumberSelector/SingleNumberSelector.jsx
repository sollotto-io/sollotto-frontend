import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import NumberInput from './NumberInput';
import { PurchaseContext } from '../../../context/PurchaseContext';



export default function SingleNumberSelector({ticketPos}) {
  const { purchaseData, setPurchaseData } = useContext(PurchaseContext);
  const ticketNumChangeHandler = (value) =>{
    const tempNumArr= purchaseData.ticketNumberArr;
    tempNumArr[ticketPos] = parseInt(value);
    setPurchaseData({...purchaseData, ticketNumberArr:tempNumArr});
  }
  const validateNum = () => {
    let ele = document.querySelector(`#ticketNumber${ticketPos}`);
    if(ticketPos === 5){
      if(ele.value < 1 || ele.value > 26){
        document.querySelector('.ticketNumInst').style.color = '#ff604f';
        ticketNumChangeHandler("");
      }
      else{
          document.querySelector('.ticketNumInst').style.color = '#FFF';
          ticketNumChangeHandler(ele.value);
      }
    }
    else{
      if(ele.value < 1 || ele.value > 69){
        document.querySelector('.ticketNumInst').style.color = '#ff604f';
        ticketNumChangeHandler("");
      }
      else{
          document.querySelector('.ticketNumInst').style.color = '#FFF';
          ticketNumChangeHandler(ele.value);
      }
    }
  }
  function stepUpClickHandler() {
    let ele = document.querySelector(`#ticketNumber${ticketPos}`);
    let event = new Event('input', { bubbles: true });
		try{

			if(ticketPos === 5){
				if(Number(ele.value) === 26 || ele.value.length === 0){
						ele.value = 1;
            ele.dispatchEvent(event);
				}
				else{
					ele.stepUp();
          ele.dispatchEvent(event);
				}
			}
			else{
				if(Number(ele.value) === 69 || ele.value.length === 0){
					ele.value = 1;
          ele.dispatchEvent(event);
				}
				else{
					ele.stepUp();
          ele.dispatchEvent(event);
				}
			}

			ticketNumChangeHandler(ele.value);
		}catch(ex){
			var step=Number(ele.step);

			if(ticketPos === 5){
				if(Number(ele.value) === 26 || ele.value.length === 0){
						ele.value = 1;
            ele.dispatchEvent(event);
				}
				else{
					ele.value = Number(ele.value) + step;
          ele.dispatchEvent(event);
				}
			}
			else{
				if(Number(ele.value) === 69 || ele.value.length === 0){
					ele.value = 1;
          ele.dispatchEvent(event);
				}
				else{
					ele.value = Number(ele.value) + step;
          ele.dispatchEvent(event);
				}
			}
			ticketNumChangeHandler(ele.value);
		}

	}
	function stepDownClickHandler() {
    let ele = document.querySelector(`#ticketNumber${ticketPos}`);
    let event = new Event('input', { bubbles: true });
		try{
				if(Number(ele.value) === 1 || ele.value.length === 0){
					if(ticketPos === 5){
						ele.value = 26;
            ele.dispatchEvent(event);
					}
					else{
						ele.value = 69;
            ele.dispatchEvent(event);
					}
				}
				else{
					ele.stepDown();
				}
				ticketNumChangeHandler(ele.value);

			}catch(ex){
				let step=Number(ele.step);
				if(Number(ele.value) === 1 || ele.value.length === 0){
					if(ticketPos === 5){
						ele.value = 26;
            ele.dispatchEvent(event);
					}
					else{
						ele.value = 69;
            ele.dispatchEvent(event);
					}
				}
				else{
					ele.value = Number(ele.value) - step;
          ele.dispatchEvent(event);
				}
				ticketNumChangeHandler(ele.value);
			}
	}
  return (
    <div className="singleNumberSelector" id={`singleNumberSelector_${ticketPos}`}>
      <KeyboardArrowUpOutlinedIcon
        id={`numStepUp_${ticketPos}`}
        onClick={() => stepUpClickHandler(ticketPos)}
        className="numberSelectorUp numberSelectorArrow greenGradientSVG"
      />
      <NumberInput
        ticketPos={ticketPos}
        validateNum={validateNum}
      />
      <KeyboardArrowDownOutlinedIcon
        id={`numStepUp_${ticketPos}`}
        onClick={() => stepDownClickHandler(ticketPos)}
        className={
          ticketPos === 5
            ? 'numberSelectorDown numberSelectorArrow greenGradientSVG2'
            : 'numberSelectorDown numberSelectorArrow purpleGradientSVG'
        }
      />
    </div>
  );
}


SingleNumberSelector.propTypes = {
  ticketPos: PropTypes.number.isRequired
}
