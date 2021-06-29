import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import NumberInput from './NumberInput';
import useReduxState from '../../hooks/useReduxState';

export default function SingleNumberSelector({ ticketPos }) {
  const [purchaseData, setPurchaseData] = useReduxState((state) => state.purchaseData);
  const { ticketNumberArr } = purchaseData;
  let timer = React.useRef(null);
  let countDownTimer = React.useRef(null);
  const validateNum = (value) => {
    const ticketNumber = Array.from(ticketNumberArr);
    ticketNumber[ticketPos] = parseInt(value);
    if (ticketPos === 5) {
      console.log(ticketNumber);
      setPurchaseData({
        type: 'SET_PURCHASE_DATA',
        arg: { ticketNumberArr: ticketNumber, valid: !(value < 1 || value > 26) },
      });
    } else {
      setPurchaseData({
        type: 'SET_PURCHASE_DATA',
        arg: { ticketNumberArr: ticketNumber, valid: !(value < 1 || value > 69) },
      });
    }
  };

  function stepUpClickHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    const ticketNumber = Array.from(ticketNumberArr);

    ticketNumber[ticketPos] = ticketNumber[ticketPos] ? ticketNumber[ticketPos] + 1 : 1;

    if (ticketPos === 5 && ticketNumber[ticketPos] <= 26) {
      validateNum(ticketNumber[ticketPos]);
    }
    if (ticketPos < 5 && ticketNumber[ticketPos] <= 69) {
      validateNum(ticketNumber[ticketPos]);
    }
  }

  function stepDownClickHandler() {
    const ticketNumber = Array.from(ticketNumberArr);
    ticketNumber[ticketPos] = ticketNumber[ticketPos] ? ticketNumber[ticketPos] - 1 : 1;
    if (ticketNumber[ticketPos] >= 1) {
      validateNum(ticketNumber[ticketPos]);
    }
  }

  function beginConstantIncrement() {
    countDownTimer.current = setTimeout(() => {
      const ticketNumber = Array.from(ticketNumberArr);
      ticketNumber[ticketPos] = ticketNumber[ticketPos] ?? 1;
      let value = ticketNumber[ticketPos];
      timer.current = setInterval(() => {
        value += 1;
        if (ticketPos < 5 && value <= 69) validateNum(value);
        if (ticketPos === 5 && value <= 26) validateNum(value);
      }, 200);
    }, 500);
  }

  function beginConstantDecrement() {
    countDownTimer.current = setTimeout(() => {
      const ticketNumber = Array.from(ticketNumberArr);
      ticketNumber[ticketPos] = ticketNumber[ticketPos] ?? 1;
      let value = ticketNumber[ticketPos];
      timer.current = setInterval(() => {
        value -= 1;
        if (value >= 1) validateNum(value);
      }, 200);
    }, 500);
  }

  function endConstantChanging() {
    clearTimeout(countDownTimer.current);
    clearInterval(timer.current);
  }

  return (
    <div className="singleNumberSelector" id={`singleNumberSelector_${ticketPos}`}>
      <KeyboardArrowUpOutlinedIcon
        id={`numStepUp_${ticketPos}`}
        onClick={stepUpClickHandler}
        onMouseDown={() => beginConstantIncrement()}
        onMouseUp={() => endConstantChanging()}
        onMouseLeave={() => endConstantChanging()}
        className="numberSelectorUp numberSelectorArrow greenGradientSVG"
      />
      <NumberInput ticketPos={ticketPos} validateNum={validateNum} setTicketNumber={validateNum} />
      <KeyboardArrowDownOutlinedIcon
        id={`numStepUp_${ticketPos}`}
        onClick={() => stepDownClickHandler()}
        onMouseDown={() => beginConstantDecrement()}
        onMouseUp={() => endConstantChanging()}
        onMouseLeave={() => endConstantChanging()}
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
  ticketPos: PropTypes.number.isRequired,
};
