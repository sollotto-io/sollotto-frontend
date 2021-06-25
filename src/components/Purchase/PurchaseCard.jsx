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
import { GlobalContext } from '../../context/GlobalContext';

import { RandomTicketGenerator } from '../utils/helpers';

import RandomButton from '../common/PrimaryButton';

const PurchaseCard = () => {
  const [purchaseData, setPurchaseData] = useState({
    ticketNumberArr: Array(6),
    selectedCharity: null,
    valid: true,
  });

  const { loading, lotteryData } = useContext(LotteryContext);
  const { globalData } = useContext(GlobalContext);

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

  const verifyRepeatedTicket = () => {
    if (globalData.selectedWallet) {
      const currentTicket = [...purchaseData.ticketNumberArr];
      const currentWalletId = Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON()
        .data;

      const validate = lotteryData.Tickets.some(
        (t) =>
          t.ticketArray.filter((ti) => currentTicket.includes(ti)).length === 6 &&
          t.walletID.filter((wi) => currentWalletId.includes(wi)).length === 32,
      );

      return validate;
    } else {
      return false;
    }
  };

  useDidUpdateEffect(() => {
    if (
      !purchaseData.ticketNumberArr.some((n) => n === undefined) &&
      !loading &&
      verifyRepeatedTicket()
    ) {
      toast.warn('Warning: You alredy bought that ticket', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
