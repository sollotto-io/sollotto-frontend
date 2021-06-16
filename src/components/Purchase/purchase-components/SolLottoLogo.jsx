import React from 'react';
import logo from '../../../images/logos/Sollotto-Icon-Transparent.png';
export default function SolLottoLogo(props) {
  return (
    <img
      className={props.charitySelectorIcon ? 'charitySelectorIcon iconLogo' : 'iconLogo'}
      src={logo}
      alt="logo"
    />
  );
}
