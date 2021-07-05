import React from 'react';
import { useSelector } from 'react-redux';
export default function NumberInput({ ticketPos, validateNum, setTicketNumber }) {
  const { ticketNumberArr } = useSelector((state) => state.purchaseData);

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
        value={ticketNumberArr[ticketPos] ?? ''}
        className="numberSelectorInput"
        name={`ticketNumber${ticketPos}`}
        max={ticketPos >= 0 && ticketPos <= 4 ? 49 : 26}
        min="1"
        onBlur={(event) => {
          if (ticketPos >= 0 && ticketPos <= 4) {
            setTicketNumber(Math.min(Math.max(event.target.value, 1), 49));
          } else {
            setTicketNumber(Math.min(Math.max(event.target.value, 1), 49));
          }
        }}
        onChange={(event) => validateNum(event.target.value)}
        placeholder="#"
      />
    </div>
  );
}
