import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import NumberInput from './NumberInput';
import { PurchaseContext } from '../../../context/PurchaseContext';

export default function SingleNumberSelector({ ticketPos }) {
  const { purchaseData, setPurchaseData } = useContext(PurchaseContext);

  /*   const [timer, setTimer] = useState(false); */
  let timer = React.useRef(null);
  const validateNum = (value) => {
    const ticketNumberArr = Array.from(purchaseData.ticketNumberArr);
    ticketNumberArr[ticketPos] = parseInt(value);
    if (ticketPos === 5) {
      setPurchaseData({ ...purchaseData, ticketNumberArr, valid: !(value < 1 || value > 26) });
    } else {
      setPurchaseData({ ...purchaseData, ticketNumberArr, valid: !(value < 1 || value > 69) });
    }
  };

  /*   function stepUpClickHandler() {
    let ele = document.querySelector(`#ticketNumber${ticketPos}`);
    let event = new Event('input', { bubbles: true });
    try {
      if (ticketPos === 5) {
        if (Number(ele.value) === 26 || ele.value.length === 0) {
          ele.value = 1;
          ele.dispatchEvent(event);
        } else {
          ele.stepUp();
          ele.dispatchEvent(event);
        }
      } else {
        if (Number(ele.value) === 69 || ele.value.length === 0) {
          ele.value = 1;
          ele.dispatchEvent(event);
        } else {
          ele.stepUp();
          ele.dispatchEvent(event);
        }
      }

      validateNum(ele.value);
    } catch (ex) {
      var step = Number(ele.step);

      if (ticketPos === 5) {
        if (Number(ele.value) === 26 || ele.value.length === 0) {
          ele.value = 1;
          ele.dispatchEvent(event);
        } else {
          ele.value = Number(ele.value) + step;
          ele.dispatchEvent(event);
        }
      } else {
        if (Number(ele.value) === 69 || ele.value.length === 0) {
          ele.value = 1;
          ele.dispatchEvent(event);
        } else {
          ele.value = Number(ele.value) + step;
          ele.dispatchEvent(event);
        }
      }
      validateNum(ele.value);
    }
  } */

  /*  function stepDownClickHandler() {
    let ele = document.querySelector(`#ticketNumber${ticketPos}`);
    let event = new Event('input', { bubbles: true });
    try {
      if (Number(ele.value) === 1 || ele.value.length === 0) {
        if (ticketPos === 5) {
          ele.value = 26;
          ele.dispatchEvent(event);
        } else {
          ele.value = 69;
          ele.dispatchEvent(event);
        }
      } else {
        ele.stepDown();
      }
      validateNum(ele.value);
    } catch (ex) {
      let step = Number(ele.step);
      if (Number(ele.value) === 1 || ele.value.length === 0) {
        if (ticketPos === 5) {
          ele.value = 26;
          ele.dispatchEvent(event);
        } else {
          ele.value = 69;
          ele.dispatchEvent(event);
        }
      } else {
        ele.value = Number(ele.value) - step;
        ele.dispatchEvent(event);
      }
      validateNum(ele.value);
    }
  } */

  function stepUpClickHandler() {
    const ticketNumberArr = Array.from(purchaseData.ticketNumberArr);

    ticketNumberArr[ticketPos] = ticketNumberArr[ticketPos] ? ticketNumberArr[ticketPos] + 1 : 1;

    if (ticketPos === 5 && ticketNumberArr[ticketPos] <= 26) {
      validateNum(ticketNumberArr[ticketPos]);
    }
    if (ticketPos < 5 && ticketNumberArr[ticketPos] <= 69) {
      validateNum(ticketNumberArr[ticketPos]);
    }
  }

  function stepDownClickHandler() {
    const ticketNumberArr = Array.from(purchaseData.ticketNumberArr);
    ticketNumberArr[ticketPos] = ticketNumberArr[ticketPos] ? ticketNumberArr[ticketPos] - 1 : 1;
    if (ticketNumberArr[ticketPos] >= 1) {
      validateNum(ticketNumberArr[ticketPos]);
    }
  }

  function beginConstantIncrement() {
    const ticketNumberArr = Array.from(purchaseData.ticketNumberArr);
    ticketNumberArr[ticketPos] = ticketNumberArr[ticketPos] ?? 1;
    let value = ticketNumberArr[ticketPos];
    timer.current = setInterval(() => {
      value += 1;
      if (ticketPos < 5 && value <= 69) validateNum(value);
      if (ticketPos === 5 && value <= 26) validateNum(value);
    }, 200);
  }

  function endConstantIncrement() {
    clearInterval(timer.current);
  }

  function beginConstantDecrement() {
    const ticketNumberArr = Array.from(purchaseData.ticketNumberArr);
    ticketNumberArr[ticketPos] = ticketNumberArr[ticketPos] ?? 1;
    let value = ticketNumberArr[ticketPos];
    timer.current = setInterval(() => {
      value -= 1;
      if (value >= 1) validateNum(value);
    }, 200);
  }

  function endConstantDecrement() {
    clearInterval(timer.current);
  }
  /* 
  useEffect(() => {
    let interval;

    if (timer) {
      console.log('AAAAAH');
      const value = purchaseData.ticketNumberArr[ticketPos];
      interval = setInterval(() => validateNum(value ? value + 1 : 1), 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]); */

  return (
    <div className="singleNumberSelector" id={`singleNumberSelector_${ticketPos}`}>
      <KeyboardArrowUpOutlinedIcon
        id={`numStepUp_${ticketPos}`}
        onClick={stepUpClickHandler}
        onMouseDown={() => beginConstantIncrement()}
        onMouseUp={() => endConstantIncrement()}
        onMouseLeave={() => endConstantIncrement()}
        className="numberSelectorUp numberSelectorArrow greenGradientSVG"
      />
      <NumberInput ticketPos={ticketPos} validateNum={validateNum} setTicketNumber={validateNum} />
      <KeyboardArrowDownOutlinedIcon
        id={`numStepUp_${ticketPos}`}
        onClick={() => stepDownClickHandler()}
        onMouseDown={() => beginConstantDecrement()}
        onMouseUp={() => endConstantDecrement()}
        onMouseLeave={() => endConstantDecrement()}
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
