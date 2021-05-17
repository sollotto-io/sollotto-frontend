import React, { useState } from "react";

export default function NumberInput({ digit, numPos }) {
  const [inputToggle, setInputToggle] = useState(false);
  const handleInput = () => {
    setInputToggle(!inputToggle);
  };
  return (
    <div
      className={
        numPos === 6
          ? "gradientBg3 gradientBorder numberInputWrapper"
          : "gradientBg2 gradientBorder numberInputWrapper"
      }
    >
      {inputToggle === true ? (
        <input
          autoFocus={true}
          type="number"
          id={`ticketNum_${numPos}`}
          className="numberSelectorInput"
          name={`ticketNum_${numPos}`}
          max={numPos >= 1 && numPos <= 5 ? 69 : 26}
          min="1"
          placeholder="1"
          defaultValue="1"
          onClick={handleInput}
        />
      ) : (
        <p className="numberCount" onClick={handleInput}>
          {digit}
        </p>
      )}
    </div>
  );
}
