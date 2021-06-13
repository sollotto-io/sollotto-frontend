import React, { useState } from 'react';
import Card from './purchase-components/Card';

import GreenGradientSvg from '../common/GreenGradientSvg';
import GreenGradientSvg2 from '../common/GreenGradientSvg2';
import PurpleGradientSvg from '../common/PurpleGradientSvg';
import { PurchaseContext } from '../../context/PurchaseContext';
import PurchaseForm from './PurchaseForm';


const PurchaseCard = () => {


  const [purchaseData, setPurchaseData] = useState({
    ticketNumberArr:Array(6),
    selectedCharity: null,
  });



  return (
    <div className="gradientBg gradientBorder">
      <GreenGradientSvg />
      <GreenGradientSvg2 />
      <PurpleGradientSvg />
      <div className="purchaseCard">
        <PurchaseContext.Provider value={{ purchaseData, setPurchaseData }}>
          <p
          className="ticketNumInst"
          style={{ marginTop: 0, maxWidth: 400 }}>
            Pick your numbers. Choose a number 1-69 for the first 5 numbers and a number 1-26 for
            the sixth number
          </p>
          <PurchaseForm />
        </PurchaseContext.Provider>
      </div>
    </div>
  );
};

export default Card(PurchaseCard);
