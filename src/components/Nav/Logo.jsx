import React from 'react';
import { useHistory } from 'react-router';
import logoImg from '../../images/logos/SolLotto-logo-horizontal.png';

export default function Logo() {
  const history = useHistory()
  const redirectToPurchase = () =>{
    history.push('/purchase')
  }
  return (
    <div className="logoArea">
      <button style={{background:"none", border:0, cursor:"pointer"}} onClick={redirectToPurchase}>
        <img src={logoImg} alt="logo" className="logo" />
      </button>
    </div>
  );
}
