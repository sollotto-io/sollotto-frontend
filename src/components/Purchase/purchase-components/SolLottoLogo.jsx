import React from 'react';
import logo from '../../../images/logos/Sollotto-Icon-Transparent.png';
export default function SolLottoLogo({ selected, charitySelectorIcon }) {
  return (
    <img
      className={`${
        charitySelectorIcon
          ? `charitySelectorIcon iconLogo ${selected ? 'blockDisplay' : ''}`
          : 'iconLogo'
      }`}
      src={logo}
      alt="logo"
    />
  );
}
