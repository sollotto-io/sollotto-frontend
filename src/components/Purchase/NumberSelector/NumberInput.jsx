import React, { useContext } from 'react';
import { PurchaseContext } from '../../../context/PurchaseContext';
export default function NumberInput({ ticketPos, validateNum, setTicketNumber }) {
  const { purchaseData } = useContext(PurchaseContext);
  return (
    <div
      className={
        ticketPos === 5
          ? 'gradientBg3 gradientBorder numberInputWrapper'
          : 'gradientBg2 gradientBorder numberInputWrapper'
      }
    >
      <input
        type="number"
        id={`ticketNumber${ticketPos}`}
        value={purchaseData.ticketNumberArr[ticketPos]}
        className="numberSelectorInput"
        name={`ticketNumber${ticketPos}`}
        max={ticketPos >= 0 && ticketPos <= 4 ? 69 : 26}
        min="1"
        onBlur={(event) => {
          if (ticketPos >= 0 && ticketPos <= 4) {
            setTicketNumber(Math.min(Math.max(event.target.value, 1), 69));
          } else {
            setTicketNumber(Math.min(Math.max(event.target.value, 1), 26));
          }
        }}
        onChange={(event) => validateNum(event.target.value)}
        placeholder="#"
      />
    </div>
  );
}
