import React from 'react';
export default function NumberInput(props) {
  return (
    <div
      className={
        props.ticketPos === 5
          ? 'gradientBg3 gradientBorder numberInputWrapper'
          : 'gradientBg2 gradientBorder numberInputWrapper'
      }
    >
      <input
        type="number"
        id={`ticketNumber${props.ticketPos}`}
        className="numberSelectorInput"
        name={`ticketNumber${props.ticketPos}`}
        max={props.ticketPos >= 0 && props.ticketPos <= 4 ? 69 : 26}
        min="1"
        placeholder='#'
        onBlur={(event) => {
          if (props.ticketPos >= 0 && props.ticketPos <= 4) {
            event.target.value = Math.min(Math.max(event.target.value, 1), 69);
          } else {
            event.target.value = Math.min(Math.max(event.target.value, 1), 26);
          }
        }}
        onChange={props.validateNum}
      />
    </div>
  );
}
