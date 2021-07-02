import React, { useRef } from 'react';

const CharitySelect = ({ charityName, onSelect, selected }) => {
  const btnRef = useRef(null);

  return (
    <div className="gradientBg charitySelectBtnWrapper gradientBorder">
      <button
        value={charityName}
        type="button"
        className={`charitySelectBtn globalBtn ${selected ? 'active' : ''}`}
        onClick={onSelect}
        ref={btnRef}
      >
        {selected ? 'SELECTED' : 'SELECT'}
      </button>
    </div>
  );
};

export default CharitySelect;
