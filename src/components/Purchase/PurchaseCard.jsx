import React, { useState, useContext } from 'react';
import Card from './purchase-components/Card';

import GreenGradientSvg from '../common/GreenGradientSvg';
import GreenGradientSvg2 from '../common/GreenGradientSvg2';
import PurpleGradientSvg from '../common/PurpleGradientSvg';
import { PurchaseContext } from '../../context/PurchaseContext';
import { toast } from 'react-toastify';
import PurchaseForm from './PurchaseForm';
import useDidUpdateEffect from '../hooks/useDidUpdateEffect';
import { LotteryContext } from '../../context/LotteryContext';

import { RandomTicketGenerator } from '../utils/helpers';

import RandomButton from '../common/PrimaryButton';

const PurchaseCard = () => {
  const [purchaseData, setPurchaseData] = useState({
    ticketNumberArr: Array(6),
    selectedCharity: null,
    valid: true,
  });

  const { loading, data } = useContext(LotteryContext);

  /*   const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (!userTickets.length) {
      const {
        loading,
        data: lottery,
        refetch,
      } = useQuery(FETCH_LOTTERY_BY_ID, {
        variables: { id: id },
      });
    }
  }, []); */

  useDidUpdateEffect(() => {
    console.log(purchaseData.ticketNumberArr);
    if (!purchaseData.ticketNumberArr.some((n) => n === undefined) && !loading) {
      toast.warn('OYOYOYOYOYOYOY', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(data);
    }
  }, [purchaseData]);

  return (
    <div className="gradientBg gradientBorder">
      <GreenGradientSvg />
      <GreenGradientSvg2 />
      <PurpleGradientSvg />
      <div className="purchaseCard">
        <PurchaseContext.Provider value={{ purchaseData, setPurchaseData }}>
          <p
            className="ticketNumInst"
            style={{ marginTop: 0, maxWidth: 400, color: purchaseData.valid ? '#FFF' : '#ff604f' }}
          >
            Please pick your numbers. Choose a number between 1-69 for the first 5 selections, and a
            number between 1-26 for the 6th selection
          </p>
          <RandomButton
            style={{ marginBottom: '20px' }}
            handleClick={() => {
              setPurchaseData({ ...purchaseData, ticketNumberArr: RandomTicketGenerator() });
            }}
          >
            Generate Random Ticket
          </RandomButton>
          <PurchaseForm />
        </PurchaseContext.Provider>
      </div>
    </div>
  );
};

export default Card(PurchaseCard);
