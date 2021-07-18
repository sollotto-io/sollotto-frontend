import "./index.scss";
import PropTypes from "prop-types";
import NumberInput from "./numberInput/NumberImput";
import useReduxState from "../../../../hooks/useReduxState";


export default function SingleNumberSelector({
  ticketPos,
}: {
  ticketPos: number;
}): JSX.Element {
  const [purchaseData, setPurchaseData] = useReduxState(
    (state) => state.purchaseData
  );
  const { ticketNumberArr } = purchaseData;
   const validateNum = (value: number) => {
    const ticketNumber = Array.from(ticketNumberArr);
    ticketNumber[ticketPos] = value;
    if (ticketPos === 5) {
      setPurchaseData({
        type: "SET_PURCHASE_DATA",
        arg: {
          ticketNumberArr: ticketNumber,
          valid: !(value < 1 || value > 26),
        },
      });
    } else {
      setPurchaseData({
        type: "SET_PURCHASE_DATA",
        arg: {
          ticketNumberArr: ticketNumber,
          valid: !(value < 1 || value > 49),
        },
      });
    }
  };

 
 
 

  return (
    <div
      className="singleNumberSelector"
      id={`singleNumberSelector_${ticketPos}`}
    >
      
      <NumberInput
        ticketPos={ticketPos}
        validateNum={validateNum}
        setTicketNumber={validateNum}
      />
     
      
    </div>
  );
}

SingleNumberSelector.propTypes = {
  ticketPos: PropTypes.number.isRequired,
};
