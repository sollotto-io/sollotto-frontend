import React, { useState } from "react";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import NumberInput from "./NumberInput";

export default function SingleNumberSelector(props) {
  const [digit, changeDigit] = useState(0)
  
  function stepUpClickHandler() {
    
   let vardigit = digit +1
   changeDigit(vardigit)
  }
  function stepDownClickHandler() {
    let vardigit = digit - 1
   vardigit < 0 ? changeDigit(0) : changeDigit(vardigit) }
  return (
    
    <div
      className="singleNumberSelector"
      id={`singleNumberSelector_${props.numPos}`}
    >
      <KeyboardArrowUpOutlinedIcon
        id={`numStepUp_${props.numPos}`}
        onClick={() => stepUpClickHandler()}
        className="numberSelectorUp numberSelectorArrow greenGradientSVG"
      />
      <NumberInput digit = {digit}  numPos={props.numPos} />
      <KeyboardArrowDownOutlinedIcon
        id={`numStepUp_${props.numPos}`}
        onClick={() => stepDownClickHandler()}
        className={
          props.numPos === 6
            ? "numberSelectorDown numberSelectorArrow greenGradientSVG2"
            : "numberSelectorDown numberSelectorArrow purpleGradientSVG"
        }
      />
    </div>
  );
}
